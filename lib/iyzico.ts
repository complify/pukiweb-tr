// iyzico istemcisi — Checkout Form (CF) yöntemi.
// Sandbox: IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
// Prod:    IYZICO_BASE_URL=https://api.iyzipay.com
import Iyzipay from "iyzipay";

export function iyzicoClient() {
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const uri = process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";
  if (!apiKey || !secretKey) {
    throw new Error("IYZICO_API_KEY / IYZICO_SECRET_KEY tanımlı değil (.env).");
  }
  return new Iyzipay({ apiKey, secretKey, uri });
}

// iyzico para birimini string ister: "10800.00"
export const iyziPrice = (n: number) => (Math.round(n * 100) / 100).toFixed(2);

// Promise sarmalayıcılar (SDK callback tabanlı)
export function cfInitialize(client: any, request: any): Promise<any> {
  return new Promise((resolve, reject) => {
    client.checkoutFormInitialize.create(request, (err: any, result: any) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export function cfRetrieve(client: any, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    client.checkoutForm.retrieve({ locale: "tr", token }, (err: any, result: any) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// ---------------- Abonelik (Subscription) sarmalayıcıları ----------------
// iyzico v2 abonelik uçları — yanıtlar { status, data:{...} } veya düz olabilir; okurken defensive olun.

export function subProductCreate(client: any, req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    client.subscriptionProduct.create(req, (err: any, r: any) => (err ? reject(err) : resolve(r)));
  });
}

export function subPlanCreate(client: any, req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    client.subscriptionPricingPlan.create(req, (err: any, r: any) => (err ? reject(err) : resolve(r)));
  });
}

export function subCheckoutInitialize(client: any, req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    client.subscriptionCheckoutForm.initialize(req, (err: any, r: any) => (err ? reject(err) : resolve(r)));
  });
}

export function subCheckoutRetrieve(client: any, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    client.subscriptionCheckoutForm.retrieve({ locale: "tr", checkoutFormToken: token }, (err: any, r: any) => (err ? reject(err) : resolve(r)));
  });
}

export function subscriptionRetrieve(client: any, subscriptionReferenceCode: string): Promise<any> {
  return new Promise((resolve, reject) => {
    client.subscription.retrieve({ locale: "tr", subscriptionReferenceCode }, (err: any, r: any) => (err ? reject(err) : resolve(r)));
  });
}

export function subscriptionCancel(client: any, subscriptionReferenceCode: string): Promise<any> {
  return new Promise((resolve, reject) => {
    client.subscription.cancel({ locale: "tr", subscriptionReferenceCode }, (err: any, r: any) => (err ? reject(err) : resolve(r)));
  });
}

// Abonelik yanıtından alan okuma (düz ya da data içinde)
export function iyzField(res: any, key: string): any {
  if (!res) return undefined;
  return res[key] ?? res?.data?.[key];
}
