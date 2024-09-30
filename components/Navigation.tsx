"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const NavComponent = () => {
  const locale = useLocale();
  const currentPath = usePathname();
  const t = useTranslations("Header");

  return (
    <div className="w-full">
      <nav className="flex justify-center space-x-6 text-black font-semibold uppercase max-w-screen-xl m-auto">
        <Link
          href={"#"}
          // href={`/${locale}/house`}
          className={
            currentPath === `/${locale}/house`
              ? "text-teal"
              : "hover:text-teal transition-colors"
          }
        >
          {t("home")}
        </Link>
        <Link
          href={"#"}
          // href={`/${locale}/auctions`}
          className={
            currentPath === `/${locale}/auctions`
              ? "text-teal"
              : "hover:text-teal transition-colors "
          }
        >
          {t("auctions")}
        </Link>
        <Link
          href={"#"}
          // href={`/${locale}/contacts`}
          className={
            currentPath === `/${locale}/contacts`
              ? "text-teal"
              : "hover:text-teal transition-colors "
          }
        >
          {t("contacts")}
        </Link>
      </nav>
    </div>
  );
};

export default NavComponent;
