import Image from "next/image";
import LOGO from "@public/assets/images/logo.png";
import Link from "next/link";
import { useLocale } from "next-intl";

const Logo = () => {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/`} className="w-full">
      <div className="flex items-center space-x-4 font-montserrat">
        <Image
          src={LOGO}
          alt="Auktionhaus GR Logo"
          className="w-16 h-auto md:w-28 md:h-auto"
          priority
        />

        <div className="hidden md:flex flex-col">
          <span>
            <span className="text-xs md:text-sm font-bold text-black uppercase">
              Kunst
            </span>
            <span className="text-xs md:text-sm  text-black uppercase">
              auktionshaus
            </span>
          </span>

          <span className="text-xs md:text-sm font-bold text-black uppercase">
            Georg Rehm
          </span>
          <span className="text-xs md:text-sm font-semibold text-honey uppercase">
            Im Martinipark
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
