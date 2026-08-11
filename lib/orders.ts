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
