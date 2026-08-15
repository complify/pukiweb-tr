import { cookies } from "next/headers";
import { LANG_COOKIE, DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

export function getLang(): Lang {
  const v = cookies().get(LANG_COOKIE)?.value;
  return isLang(v) ? v : DEFAULT_LANG;
}
