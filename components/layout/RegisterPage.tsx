"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import RegisterForm from "@components/auth/RegisterForm";
import { useSearchParams } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const t = useTranslations("Auth");

  return (
    <div className="w-full max-w-xl mx-auto mt-10 p-4 font-montserrat flex flex-col gap-6">
      <Link
        href={redirect}
        className="flex items-center text-teal text-sm hover:text-navy "
      >
        <FiChevronLeft />
        <p className="px-2">Back</p>
      </Link>
      <div className="w-full flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-teal uppercase">
            {t("createAccount")}
          </h1>
          <h2 className="text-center text-sm md:text-base text-gray-600">
            {t("register")}
          </h2>
        </div>

        <RegisterForm redirect={redirect} />
      </div>
      <div className="text-center">
        <p className="text-sm mt-10">{t("haveAccount")}</p>
        <Link
          href={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="text-teal text-sm border-b border-transparent hover:border-teal transition-border duration-300 ease-in-out"
        >
          {t("clickHere")}
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
