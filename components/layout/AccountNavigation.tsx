"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { ACCOUNT_NAV_LINKS } from "@/utils/navigation/navigationLinks";

interface AccountNavComponentProps {
  closeMenu?: () => void;
}

const AccountNavComponent: React.FC<AccountNavComponentProps> = ({
  closeMenu,
}) => {
  const locale = useLocale();
  const currentPath = usePathname();

  return (
    <div className="w-[300px]">
      <nav className="flex flex-col gap-4 text-black uppercase max-w-screen-xl m-auto text-lg lg:text-xl">
        {ACCOUNT_NAV_LINKS.map((link) => {
          const href = `/${locale}/my-account${
            link.path === "/" ? "" : `/${link.path}`
          }`;
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
                  ? "p-2 bg-teal text-white"
                  : "p-2 hover:text-teal transition-colors"
              }
            >
              {link.labelKey}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AccountNavComponent;
