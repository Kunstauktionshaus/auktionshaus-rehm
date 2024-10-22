import Link from "next/link";
import PasswordLoginPage from "./PasswordLoginForm";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations("Auth");
  return (
    <div className="w-full max-w-md mx-auto mt-16 p-4 font-montserrat flex flex-col gap-6">
      <PasswordLoginPage />
      <div className="text-center">
        <p className="text-sm mt-4">{t("noAccount")}</p>
        <Link
          href="/register"
          className="text-teal text-sm border-b border-transparent hover:border-teal transition-border duration-300 ease-in-out"
        >
          {t("clickHere")}
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
