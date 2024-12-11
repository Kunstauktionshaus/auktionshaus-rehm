"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { MAIN_NAV_LINKS } from "@/utils/navigation/navigationLinks";

interface NavComponentProps {
  closeMenu?: () => void;
}

const NavComponent: React.FC<NavComponentProps> = ({ closeMenu }) => {
  const locale = useLocale();
  const currentPath = usePathname();
  const t = useTranslations("Header");

  return (
    <div className="w-full mb-4 p-4 bg-navy">
      <nav className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 text-white uppercase max-w-screen-xl m-auto text-lg lg:text-xl">
        {MAIN_NAV_LINKS.map((link) => {
          const href = `/${locale}${link.path === "/" ? "" : `/${link.path}`}`;
          const isActive =
            currentPath === href ||
            (link.path === "/" && currentPath === `/${locale}`);

          return (
            <Link
              key={link.path}
              href={href}
              onClick={closeMenu}
              className={
                isActive
                  ? "p-2 bg-teal text-white md:bg-transparent md:text-honey md:border-b-2 md:border-honey"
                  : "p-2 hover:text-sky-blue transition-colors"
              }
            >
              {t(link.labelKey)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default NavComponent;
