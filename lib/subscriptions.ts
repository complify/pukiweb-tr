// iyzico Abonelik — ürün & ödeme planı yönetimi.
import { subProductCreate, subPlanCreate, iyzField } from "@/lib/iyzico";
import { getProductRef, setProductRef } from "@/lib/orders";

// Tek bir "Puki GRC" abonelik ürünü — referans KV'de saklanır, yoksa oluşturulur.
export async function ensureProduct(client: any): Promise<string> {
  const cached = await getProductRef();
  if (cached) return cached;
  const res = await subProductCreate(client, {
    locale: "tr",
    name: "Puki GRC",
    description: "Puki GRC bulut yönetim sistemleri aboneliği",
  });
  const code = iyzField(res, "referenceCode");
  if (res?.status !== "success" || !code)
    throw new Error("Abonelik ürünü oluşturulamadı: " + (res?.errorMessage || JSON.stringify(res)));
  await setProductRef(code);
  return code;
}

// Teklife özel ödeme planı (aylık/yıllık, RECURRING) oluşturur, referans döner.
export async function createPlan(
  client: any,
  opts: { productRef: string; name: string; price: number; interval: "monthly" | "annual" }
): Promise<string> {
  const res = await subPlanCreate(client, {
    locale: "tr",
    productReferenceCode: opts.productRef,
    name: opts.name,
    price: opts.price,
    currencyCode: "TRY",
    paymentInterval: opts.interval === "annual" ? "YEARLY" : "MONTHLY",
    paymentIntervalCount: 1,
    planPaymentType: "RECURRING",
  });
  const code = iyzField(res, "referenceCode");
  if (res?.status !== "success" || !code)
    throw new Error("Ödeme planı oluşturulamadı: " + (res?.errorMessage || JSON.stringify(res)));
  return code;
}
