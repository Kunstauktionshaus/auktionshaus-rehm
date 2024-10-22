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
    <div className="w-full bg-back-beige p-4">
      <nav className="flex justify-center space-x-6 text-black font-semibold uppercase max-w-screen-xl m-auto">
        <Link
          href={`/${locale}/team`}
          className={
            currentPath === `/${locale}/team`
              ? "text-teal border-b-2 border-teal"
              : "hover:text-teal transition-colors"
          }
        >
          {t("team")}
        </Link>
        <Link
          href={`/${locale}/partners`}
          className={
            currentPath === `/${locale}/partners`
              ? "text-teal border-b-2 border-teal"
              : "hover:text-teal transition-colors "
          }
        >
          {t("partners")}
        </Link>
        <Link
          href={`/${locale}/info`}
          className={
            currentPath === `/${locale}/info`
              ? "text-teal border-b-2 border-teal"
              : "hover:text-teal transition-colors "
          }
        >
          {t("info")}
        </Link>
        <Link
          href={`/${locale}/terms`}
          className={
            currentPath === `/${locale}/terms`
              ? "text-teal border-b-2 border-teal"
              : "hover:text-teal transition-colors "
          }
        >
          {t("terms")}
        </Link>
      </nav>
    </div>
  );
};

export default NavComponent;
