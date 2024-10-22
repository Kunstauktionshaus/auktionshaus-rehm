import { useLocale, useTranslations } from "next-intl";
import termsConsigner from "@data/terms-consigner.json";
import termsBidder from "@data/terms-bidder.json";

const TermsPage = () => {
  const t = useTranslations("TermsPage");
  const c = useTranslations("TermsConsigners");
  const b = useTranslations("TermsBidders");
  const locale = useLocale();
  return (
    <div className="w-full max-w-screen-xl mx-auto font-lato">
      <div className="container mx-auto p-10 flex flex-col gap-10 items-center">
        <div className="mb-8 flex flex-col gap-4 items-center text-center font-montserrat">
          <h3 className="font-semibold text-lg lg:text-xl text-teal">
            {t("subTitle")}
          </h3>
          <h1 className="text-3xl lg:text-4xl font-bold text-navy">
            {t("title")}
          </h1>
          <p className="lg:text-lg"> {t("description")}</p>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-10">
          <div className="w-full flex flex-col gap-8 p-6 shadow-lg bg-white">
            <h3 className="p-4 text-center text-lg font-montserrat font-semibold">
              {c("title")}
            </h3>
            <div className="flex flex-col gap-6">
              {termsConsigner.map((term, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <span>{term.id}</span>{" "}
                    <span className="text-justify">
                      {locale === "en" ? term.en : term.de}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full  flex flex-col gap-8 p-6 shadow-lg bg-white">
            <h3 className="p-4 text-center text-lg font-montserrat font-semibold">
              {b("title")}
            </h3>
            <div className="flex flex-col gap-6">
              {termsBidder.map((term, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <span>{term.id}</span>{" "}
                    <span className="text-justify">
                      {locale === "en" ? term.en : term.de}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
