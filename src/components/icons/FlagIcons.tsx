import MK from "country-flag-icons/react/3x2/MK";
import RS from "country-flag-icons/react/3x2/RS";
import BG from "country-flag-icons/react/3x2/BG";
import HR from "country-flag-icons/react/3x2/HR";
import GB from "country-flag-icons/react/3x2/GB";
import DE from "country-flag-icons/react/3x2/DE";
import type { Locale } from "@/i18n/routing";

type FlagComponent = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

export const flagIcons: Record<Locale, FlagComponent> = {
  mk: MK,
  sr: RS,
  bg: BG,
  hr: HR,
  en: GB,
  de: DE,
};
