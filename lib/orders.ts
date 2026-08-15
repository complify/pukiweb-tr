// Sipariş deposu — Upstash Redis (Vercel KV) varsa kalıcı, yoksa bellek içi (yerel/dev).
// Vercel'de Redis (Upstash) entegrasyonunu bağlayınca KV_REST_API_URL/TOKEN
// (ya da UPSTASH_REDIS_REST_URL/TOKEN) env değerleri otomatik gelir.
import { Redis } from "@upstash/redis";

export type OrderStatus = "pending_payment" | "paid_awaiting_approval" | "provisioned" | "failed" | "rejected";

export interface Order {
  ref: string;
  status: OrderStatus;
  createdAt: number;
  updatedAt?: number;
  modules: string[];
  seats: number;
  region: "tr" | "eu";
  billing: "monthly" | "annual";
  promo?: string | null;
  total: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company: string;
    taxId?: string;
    address?: string;
    city?: string;
  };
  iyzicoPaymentId?: string;
  provision?: { organizationId?: string | number; loginUrl?: string; at?: number };
  note?: string;
  // --- Admin tarafından oluşturulan teklifler (Faz B) ---
  origin?: "self" | "admin";        // "admin" = panelden oluşturulan teklif/ödeme linki
  lineItems?: { code: string; name: string; price: number }[]; // teklif kalemleri (AYLIK birim fiyat)
  // Müşteriye sunulan ödeme seçenekleri (aylık/yıllık) — fiyatlar aylık baz üzerinden
  pricing?: { monthlyTotal: number; offerAnnual: boolean; annualMonths: number };
  // Ödeme anında müşteriden alınan fatura bilgileri
  invoice?: {
    type: "individual" | "corporate";
    title: string;       // ünvan (kurumsal) / ad soyad (bireysel)
    taxId: string;       // VKN / TCKN
    taxOffice?: string;  // vergi dairesi (kurumsal)
    address: string;
    city: string;
  };
  paidAt?: number;       // ödemenin alındığı an (callback / ilk tahsilat)
  // --- Abonelik (iyzico tekrarlayan tahsilat) ---
  subscription?: {
    planRef?: string;
    subscriptionRef?: string;
    customerRef?: string;
    parentRef?: string;
    interval?: "monthly" | "annual";
    status?: string;         // ACTIVE / PENDING / CANCELED / UNPAID / EXPIRED
    checkoutToken?: string;  // subscription checkout form token
  };
  payments?: OrderPayment[]; // her dönem tahsilatı (webhook ile birikir)
}

export interface OrderPayment {
  at: number;
  amount: number;
  period: "monthly" | "annual";
  status: "success" | "failure";
  iyziRef?: string;
  orderRef?: string;        // iyzico orderReferenceCode — tekilleştirme anahtarı
}

// --- Upstash bağlantısı (env varsa) ---
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export const kvEnabled = !!redis;

const KEY = (ref: string) => `puki:order:${ref}`;
const INDEX = "puki:orders";

// --- Bellek içi fallback (dev / KV yoksa) ---
declare global {
  // eslint-disable-next-line no-var
  var __PUKI_ORDERS__: Map<string, Order> | undefined;
}
const mem: Map<string, Order> = globalThis.__PUKI_ORDERS__ ?? new Map();
globalThis.__PUKI_ORDERS__ = mem;

const SUB_KEY = (subRef: string) => `puki:sub:${subRef}`;
const CFT_KEY = (token: string) => `puki:cft:${token}`;
const PRODUCT_KEY = "puki:iyzico:product";

declare global {
  // eslint-disable-next-line no-var
  var __PUKI_SUBIDX__: Map<string, string> | undefined;
  // eslint-disable-next-line no-var
  var __PUKI_CFTIDX__: Map<string, string> | undefined;
  // eslint-disable-next-line no-var
  var __PUKI_KV__: Map<string, string> | undefined;
}
const subIdx: Map<string, string> = globalThis.__PUKI_SUBIDX__ ?? new Map();
globalThis.__PUKI_SUBIDX__ = subIdx;
const cftIdx: Map<string, string> = globalThis.__PUKI_CFTIDX__ ?? new Map();
globalThis.__PUKI_CFTIDX__ = cftIdx;
const kvMem: Map<string, string> = globalThis.__PUKI_KV__ ?? new Map();
globalThis.__PUKI_KV__ = kvMem;

export async function mapSubToOrder(subRef: string, ref: string): Promise<void> {
  if (redis) await redis.set(SUB_KEY(subRef), ref); else subIdx.set(subRef, ref);
}
export async function mapCftToOrder(token: string, ref: string): Promise<void> {
  if (redis) await redis.set(CFT_KEY(token), ref, { ex: 60 * 60 * 6 }); else cftIdx.set(token, ref);
}
export async function getOrderBySubRef(subRef: string): Promise<Order | null> {
  const ref = redis ? await redis.get<string>(SUB_KEY(subRef)) : subIdx.get(subRef);
  return ref ? getOrder(ref) : null;
}
export async function getOrderByCfToken(token: string): Promise<Order | null> {
  const ref = redis ? await redis.get<string>(CFT_KEY(token)) : cftIdx.get(token);
  return ref ? getOrder(ref) : null;
}
export async function getProductRef(): Promise<string | null> {
  return redis ? (await redis.get<string>(PRODUCT_KEY)) ?? null : kvMem.get(PRODUCT_KEY) ?? null;
}
export async function setProductRef(code: string): Promise<void> {
  if (redis) await redis.set(PRODUCT_KEY, code); else kvMem.set(PRODUCT_KEY, code);
}

// Tahsilat ekle — orderRef ile tekilleştirir (webhook + callback çakışmasını önler)
export async function appendPayment(ref: string, pmt: OrderPayment): Promise<Order | null> {
  const o = await getOrder(ref);
  if (!o) return null;
  const list = o.payments ?? [];
  if (pmt.orderRef && list.some((x) => x.orderRef === pmt.orderRef)) return o; // zaten var
  const next: Order = { ...o, payments: [...list, pmt], updatedAt: Date.now() };
  await saveOrder(next);
  return next;
}

export async function saveOrder(o: Order): Promise<void> {
  o.updatedAt = o.updatedAt ?? o.createdAt;
  if (redis) {
    await redis.set(KEY(o.ref), o);
    await redis.zadd(INDEX, { score: o.createdAt, member: o.ref });
  } else {
    mem.set(o.ref, o);
  }
}

export async function getOrder(ref: string): Promise<Order | null> {
  if (redis) return (await redis.get<Order>(KEY(ref))) ?? null;
  return mem.get(ref) ?? null;
}

export async function setOrderStatus(ref: string, status: OrderStatus, patch: Partial<Order> = {}): Promise<Order | null> {
  const cur = await getOrder(ref);
  if (!cur) return null;
  const next: Order = { ...cur, ...patch, status, updatedAt: Date.now() };
  if (redis) await redis.set(KEY(ref), next);
  else mem.set(ref, next);
  return next;
}

export async function listOrders(limit = 100): Promise<Order[]> {
  if (redis) {
    const refs = (await redis.zrange<string[]>(INDEX, 0, limit - 1, { rev: true })) || [];
    if (!refs.length) return [];
    const keys = refs.map(KEY);
    const rows = (await redis.mget<Order[]>(...keys)) || [];
    return rows.filter(Boolean) as Order[];
  }
  return [...mem.values()].sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
}
