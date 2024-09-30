"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

const LocalSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeLocale = (nextLocale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
    const newUrl = `${newPathname}?${searchParams.toString()}`;
    startTransition(() => {
      router.replace(newUrl);
    });
  };

  return (
    <div className="relative font-montserrat">
      <div className="flex items-center space-x-4 py-2 px-4">
        <button
          onClick={() => changeLocale("en")}
          className={`text-base ${
            currentLocale === "en"
              ? "text-grafit font-bold border-b-2 border-dark-blue"
              : "text-grafit"
          } hover:text-dark-blue`}
        >
          EN
        </button>
        <button
          onClick={() => changeLocale("de")}
          className={`text-base  ${
            currentLocale === "de"
              ? "text-grafit font-bold border-b-2 border-dark-blue"
              : "text-grafit"
          } hover:text-dark-blue`}
        >
          DE
        </button>
      </div>
    </div>
  );
};

export default LocalSwitcher;
