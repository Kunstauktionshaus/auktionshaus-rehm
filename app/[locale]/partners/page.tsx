import partnersData from "@data/partners.json";
import { useTranslations } from "next-intl";
import Link from "next/link";
import PartnerIcon from "@public/assets/icons/partner.png";
import Image from "next/image";

const PartnersPage = () => {
  const t = useTranslations("PartnersPage");
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="container mx-auto p-10 flex flex-col gap-10 items-center">
        <div className="mb-8 flex flex-col gap-4 items-center text-center font-montserrat">
          <h3 className="font-semibold text-lg lg:text-xl text-teal">
            {t("partnersSubtitle")}
          </h3>
          <h1 className="text-3xl lg:text-4xl font-bold text-navy">
            {t("partnersTitle")}
          </h1>
          <p className="lg:text-lg"> {t("partnersDescription")}</p>
        </div>
        <div className="w-full flex flex-wrap gap-10 justify-center ">
          {partnersData.map((partner, index) => {
            return (
              <div key={index}>
                <Link
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-[340px] h-[280px] bg-white shadow-lg p-4 flex flex-col gap-4 font-lato text-sm transition-transform transform hover:scale-105 cursor-pointer">
                    <Image
                      src={PartnerIcon}
                      alt="partner icon"
                      width={50}
                      height={50}
                      className="absolute right-4 bottom-4 rounded-full p-2 bg-sky-blue"
                    />
                    <h2 className="h-1/2 font-montserrat font-semibold text-lg text-center flex items-center text-navy border-b-2 border-sky-blue">
                      {partner.name}
                    </h2>
                    <div className="h-1/2 flex flex-col gap-2">
                      {partner.contact.name && <p>{partner.contact.name}</p>}
                      <div>
                        <p>{partner.contact.address1}</p>
                        <p>{partner.contact.address2}</p>
                      </div>

                      <div>
                        {partner.contact.email && (
                          <p>{partner.contact.email}</p>
                        )}
                        {partner.contact.phone && (
                          <p>Tel: {partner.contact.phone}</p>
                        )}

                        {partner.contact.fax && (
                          <p>Fax: {partner.contact.fax}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
