import { cookies } from "next/headers";
import { CUSTOMER_COOKIE, verifyCustomerSession, type CustomerSession } from "@/lib/customer-auth";

export async function getCustomerSession(): Promise<CustomerSession | null> {
  const t = cookies().get(CUSTOMER_COOKIE)?.value;
  return verifyCustomerSession(t);
}
