// Demo/teklif talepleri (lead) deposu — Upstash Redis (yoksa bellek içi fallback).
import { Redis } from "@upstash/redis";

export type LeadStatus = "new" | "contacted" | "closed";

export interface Lead {
  ref: string;
  createdAt: number;
  updatedAt?: number;
  name: string;
  company: string;
  email: string;
  phone?: string;
  modules: string[];     // ilgilenilen modül kodları
  message?: string;
  status: LeadStatus;
  source?: string;
}

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;
export const leadsKvEnabled = !!redis;

const KEY = (ref: string) => `puki:lead:${ref}`;
const INDEX = "puki:leads";

declare global {
  // eslint-disable-next-line no-var
  var __PUKI_LEADS__: Map<string, Lead> | undefined;
}
const mem: Map<string, Lead> = globalThis.__PUKI_LEADS__ ?? new Map();
globalThis.__PUKI_LEADS__ = mem;

export async function saveLead(l: Lead): Promise<void> {
  l.updatedAt = l.updatedAt ?? l.createdAt;
  if (redis) {
    await redis.set(KEY(l.ref), l);
    await redis.zadd(INDEX, { score: l.createdAt, member: l.ref });
  } else {
    mem.set(l.ref, l);
  }
}

export async function listLeads(limit = 200): Promise<Lead[]> {
  if (redis) {
    const refs = (await redis.zrange<string[]>(INDEX, 0, limit - 1, { rev: true })) || [];
    if (!refs.length) return [];
    const rows = (await redis.mget<Lead[]>(...refs.map(KEY))) || [];
    return rows.filter(Boolean) as Lead[];
  }
  return [...mem.values()].sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
}

export async function setLeadStatus(ref: string, status: LeadStatus): Promise<Lead | null> {
  const cur = redis ? await redis.get<Lead>(KEY(ref)) : (mem.get(ref) ?? null);
  if (!cur) return null;
  const next: Lead = { ...cur, status, updatedAt: Date.now() };
  if (redis) await redis.set(KEY(ref), next); else mem.set(ref, next);
  return next;
}
