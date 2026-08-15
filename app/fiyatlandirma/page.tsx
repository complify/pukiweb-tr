import { redirect } from "next/navigation";

// Fiyatlar herkese açık gösterilmiyor — teklife özel. Eski bağlantılar demo talebine yönlenir.
export default function FiyatlandirmaPage() {
  redirect("/demo");
}
