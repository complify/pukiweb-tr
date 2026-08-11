// BASİT sipariş kaydı — SADECE test/geliştirme için (bellek içi).
// NOT: Vercel serverless'te bellek örnekler arası paylaşılmaz ve kalıcı değildir.
// Onay paneli aşamasında kalıcı bir depo (Vercel KV / Postgres) ile değiştirilecek.
// Ödeme doğrulaması yine de iyzico'dan token ile yapıldığı için test akışı buna bağlı değildir.

export type OrderStatus = "pending_payment" | "paid_awaiting_approval" | "failed";

export interface Order {
  ref: string;                 // basketId / sipariş referansı
  status: OrderStatus;
  createdAt: number;
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
}

declare global {
  // eslint-disable-next-line no-var
  var __PUKI_ORDERS__: Map<string, Order> | undefined;
}

const store: Map<string, Order> = globalThis.__PUKI_ORDERS__ ?? new Map();
globalThis.__PUKI_ORDERS__ = store;

export const saveOrder = (o: Order) => store.set(o.ref, o);
export const getOrder = (ref: string) => store.get(ref);
export const setOrderStatus = (ref: string, status: OrderStatus, patch: Partial<Order> = {}) => {
  const o = store.get(ref);
  if (o) store.set(ref, { ...o, ...patch, status });
  return store.get(ref);
};
export const listOrders = () => [...store.values()].sort((a, b) => b.createdAt - a.createdAt);
