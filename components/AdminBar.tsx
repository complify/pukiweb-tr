import Link from "next/link";
import type { Session } from "@/lib/auth";

export default function AdminBar({ session, active }: { session: Session; active: "orders" | "users" }) {
  const tab = (href: string, label: string, on: boolean) => (
    <Link href={href} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${on ? "bg-puki-light text-puki-dark" : "text-[#5e6278] hover:text-ink"}`}>
      {label}
    </Link>
  );
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#eef1f6]">
      <div className="flex items-center gap-1">
        {tab("/admin", "Siparişler", active === "orders")}
        {session.role === "owner" && tab("/admin/kullanicilar", "Kullanıcılar", active === "users")}
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted">{session.name} · <span className="text-ink font-semibold">{session.role === "owner" ? "Sahip" : "Üye"}</span></span>
        <a href="/api/admin/logout" className="font-semibold text-[#5e6278] hover:text-red-600">Çıkış</a>
      </div>
    </div>
  );
}
