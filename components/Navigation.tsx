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
    <div className="bg-beige p-4 shadow-md font-lato">
      <nav className="flex justify-center space-x-6 text-grafit max-w-screen-xl m-auto">
        <Link
          href={"#"}
          // href={`/${locale}/house`}
          className={
            currentPath === `/${locale}/house`
              ? "text-rose uppercase"
              : "hover:text-rose hover:font-semibold transition-colors uppercase"
          }
        >
          {t("home")}
        </Link>
        <Link
          href={"#"}
          // href={`/${locale}/auctions`}
          className={
            currentPath === `/${locale}/auctions`
              ? "text-rose font-semibold uppercase"
              : "hover:text-rose hover:font-semibold transition-colors uppercase"
          }
        >
          {t("auctions")}
        </Link>
        <Link
          href={"#"}
          // href={`/${locale}/contacts`}
          className={
            currentPath === `/${locale}/contacts`
              ? "text-rose font-semibold uppercase"
              : "hover:text-rose hover:font-semibold transition-colors uppercase"
          }
        >
          {t("contacts")}
        </Link>
      </nav>
    </div>
  );
};

export default NavComponent;
