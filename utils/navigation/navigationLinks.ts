import { useTranslations } from "next-intl";

interface NavLink {
  path: string;
  labelKey: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { path: "/", labelKey: "home" },
  { path: "auctions", labelKey: "auctions" },
  { path: "team", labelKey: "team" },
  { path: "partners", labelKey: "partners" },
  { path: "info", labelKey: "info" },
  { path: "terms", labelKey: "terms" },
];

export const ACCOUNT_NAV_LINKS: NavLink[] = [
  { path: "home", labelKey: "home" },
  { path: "auctions", labelKey: "auctions" },
  { path: "profile", labelKey: "edit profile" },
];
