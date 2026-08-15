import AdminDemoLeads from "@/components/AdminDemoLeads";
import AdminBar from "@/components/AdminBar";
import { listLeads, leadsKvEnabled } from "@/lib/leads";
import { getSession } from "@/lib/session-server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Demo Talepleri — Puki Admin", robots: { index: false } };

export default async function AdminLeadsPage() {
  const session = await getSession();
  const leads = await listLeads();
  return (
    <div className="container-p py-10">
      {session && <AdminBar session={session} active="leads" />}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">Demo talepleri</h1>
        <p className="text-muted mt-1 text-sm">Web sitesinden gelen demo &amp; teklif taleplerini takip edin; iletişime geçin ve durumunu güncelleyin.</p>
      </div>
      <AdminDemoLeads initial={leads} kvEnabled={leadsKvEnabled} />
    </div>
  );
}
