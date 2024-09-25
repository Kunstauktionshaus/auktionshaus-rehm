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
    <div className="relative">
      <div className="flex items-center space-x-4 py-2 px-4">
        <button
          onClick={() => changeLocale("en")}
          className={`text-base ${
            currentLocale === "en"
              ? "text-dark-blue font-bold border-b-2 border-dark-blue"
              : "text-gray-500"
          } hover:text-dark-blue`}
        >
          EN
        </button>
        <button
          onClick={() => changeLocale("de")}
          className={`text-base  ${
            currentLocale === "de"
              ? "text-dark-blue font-bold border-b-2 border-dark-blue"
              : "text-gray-500"
          } hover:text-dark-blue`}
        >
          DE
        </button>
      </div>
    </div>
  );
};

export default LocalSwitcher;
