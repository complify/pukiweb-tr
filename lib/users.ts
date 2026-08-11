import { Redis } from "@upstash/redis";
import bcrypt from "bcryptjs";
import type { Role } from "@/lib/auth";

// KV bağlantısı (orders ile aynı env)
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;
export const usersKvEnabled = !!redis;

const KEY = (email: string) => `puki:user:${email.toLowerCase()}`;
const INDEX = "puki:users";

export interface StoredUser {
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
  createdAt: number;
}
export interface PublicUser {
  email: string;
  name: string;
  role: Role;
  source: "env" | "kv";
}

// --- Bellek içi fallback (KV yoksa) ---
declare global {
  // eslint-disable-next-line no-var
  var __PUKI_USERS__: Map<string, StoredUser> | undefined;
}
const mem: Map<string, StoredUser> = globalThis.__PUKI_USERS__ ?? new Map();
globalThis.__PUKI_USERS__ = mem;

const norm = (e: string) => e.trim().toLowerCase();

// Ortam değişkeninden gelen kurucu (sahip) hesap
function envOwner(): { email: string; password: string; name: string } | null {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return null;
  return { email: norm(email), password, name: process.env.ADMIN_NAME || "Yönetici" };
}

export function hasOwnerConfigured() {
  return !!envOwner();
}

async function getStored(email: string): Promise<StoredUser | null> {
  const e = norm(email);
  if (redis) return (await redis.get<StoredUser>(KEY(e))) ?? null;
  return mem.get(e) ?? null;
}

export async function listUsers(): Promise<PublicUser[]> {
  const out: PublicUser[] = [];
  const owner = envOwner();
  if (owner) out.push({ email: owner.email, name: owner.name, role: "owner", source: "env" });

  let stored: StoredUser[] = [];
  if (redis) {
    const emails = (await redis.smembers(INDEX)) || [];
    if (emails.length) {
      const rows = (await redis.mget<StoredUser[]>(...emails.map((e: string) => KEY(e)))) || [];
      stored = rows.filter(Boolean) as StoredUser[];
    }
  } else {
    stored = [...mem.values()];
  }
  for (const u of stored) {
    if (owner && norm(u.email) === owner.email) continue; // env sahip zaten listede
    out.push({ email: u.email, name: u.name, role: u.role, source: "kv" });
  }
  return out.sort((a, b) => (a.role === b.role ? a.email.localeCompare(b.email) : a.role === "owner" ? -1 : 1));
}

export async function createUser(input: { email: string; name: string; password: string; role: Role }) {
  const email = norm(input.email);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Geçerli bir e-posta girin.");
  if ((input.password || "").length < 8) throw new Error("Parola en az 8 karakter olmalı.");
  const owner = envOwner();
  if (owner && email === owner.email) throw new Error("Bu e-posta kurucu (env) hesabına ait.");
  if (await getStored(email)) throw new Error("Bu e-posta zaten kayıtlı.");

  const user: StoredUser = {
    email, name: input.name.trim() || email, role: input.role,
    passwordHash: await bcrypt.hash(input.password, 10),
    createdAt: Date.now(),
  };
  if (redis) {
    await redis.set(KEY(email), user);
    await redis.sadd(INDEX, email);
  } else {
    mem.set(email, user);
  }
  return { email: user.email, name: user.name, role: user.role, source: "kv" as const };
}

export async function deleteUser(email: string) {
  const e = norm(email);
  const owner = envOwner();
  if (owner && e === owner.email) throw new Error("Kurucu hesap silinemez.");
  if (redis) {
    await redis.del(KEY(e));
    await redis.srem(INDEX, e);
  } else {
    mem.delete(e);
  }
}

// Giriş doğrulaması: önce env sahip, sonra KV kullanıcıları.
export async function verifyCredentials(email: string, password: string): Promise<{ email: string; name: string; role: Role } | null> {
  const e = norm(email);
  const owner = envOwner();
  if (owner && e === owner.email) {
    return password === owner.password ? { email: owner.email, name: owner.name, role: "owner" } : null;
  }
  const u = await getStored(e);
  if (!u) return null;
  const ok = await bcrypt.compare(password, u.passwordHash);
  return ok ? { email: u.email, name: u.name, role: u.role } : null;
}
