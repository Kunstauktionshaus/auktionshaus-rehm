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
    <div className="flex justify-end items-center space-x-4 py-2 px-4  text-lg">
      <button
        onClick={() => changeLocale("en")}
        className={`${
          currentLocale === "en" ? "text-honey border-b-2 border-honey" : ""
        } hover:text-honey`}
      >
        EN
      </button>
      <button
        onClick={() => changeLocale("de")}
        className={`${
          currentLocale === "de" ? "text-honey border-b-2 border-honey" : ""
        } hover:text-honey`}
      >
        DE
      </button>
    </div>
  );
};

export default LocalSwitcher;
