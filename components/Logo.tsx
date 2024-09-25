import Image from "next/image";
import LOGO from "@public/assets/images/logo.png";
import Link from "next/link";
import { useLocale } from "next-intl";

const Logo = () => {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/`}>
      <div className="flex items-center space-x-4">
        <Image
          src={LOGO}
          alt="Auktionhaus GR Logo"
          className="w-20 h-auto md:w-28 md:h-auto"
          priority
        />

        <div className="hidden md:flex flex-col">
          <span>
            {" "}
            <span className="text-xs md:text-sm font-bold text-dark-blue uppercase">
              Kunst
            </span>
            <span className="text-xs md:text-sm  text-dark-beige uppercase">
              auktionshaus
            </span>
          </span>

          <span className="text-xs md:text-sm font-bold text-dark-blue uppercase">
            Georg Rehm
          </span>
          <span className="text-xs md:text-sm font-semibold text-rose uppercase">
            Im Martinipark
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
