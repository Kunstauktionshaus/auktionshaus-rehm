import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

const Foreword = () => {
  const t = useTranslations("MainPage");
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;
  return (
    <div className="w-full aspect-[21/9] lg:aspect-video relative transition-transform transform hover:scale-105">
      <Link href={`${BASE_URL}/docs/vorwort.pdf`} target="blank">
        <Image
          src={`${BASE_URL}/homepage/christophN.jpg`}
          fill
          alt={`Christoph Neureuther`}
          className="object-cover object-center z-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          quality={100}
          priority
        />
      </Link>
      <div className="absolute bottom-4 left-4 z-50 flex flex-col gap-2 text-white text-5xl font-montserrat font-semibold">
        <p>{t("foreword")}</p>
        <p>Christoph</p>
        <p>Neureuther</p>
      </div>
    </div>
  );
};

export default Foreword;
