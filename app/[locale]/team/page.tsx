import { useLocale, useTranslations } from "next-intl";
import teamData from "@data/team.json";
import Image from "next/image";

const TeamPage = () => {
  const t = useTranslations("TeamPage");
  const locale = useLocale();
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="container mx-auto p-10 flex flex-col gap-10 items-center">
        <div className="mb-8 flex flex-col gap-4 items-center text-center font-montserrat">
          <h3 className="font-semibold text-lg lg:text-xl text-teal">
            {t("teamSubtitle")}
          </h3>
          <h1 className="text-3xl lg:text-4xl font-bold text-navy">
            {t("teamTitle")}
          </h1>
          <p className="lg:text-lg"> {t("teamDescription")}</p>
        </div>

        <div className="w-full flex flex-wrap gap-10 justify-center">
          {teamData.map(async (member, index) => {
            const imgSrc = await import(
              `@public/assets/images/team/${member.photo}`
            );

            return (
              <div
                key={member.id}
                className="w-[300px] h-full relative shadow-lg  flex flex-col justify-center items-center transition-transform transform hover:scale-105"
              >
                <div className="w-[300px] h-[300px] relative overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={member.name}
                    quality={100}
                    className="w-[300px] h-auto"
                  />
                </div>

                <div className="w-full h-44 flex flex-col gap-4 justify-between p-4 font-lato text-sm">
                  <h2 className="h-1/3 font-montserrat font-semibold text-xl text-navy">
                    {member.name}
                  </h2>

                  <p className="h-1/3 ">
                    {locale === "en" ? member.position.en : member.position.de}
                  </p>
                  <p className="h-1/3 text-teal font-montserrat">
                    {locale === "en"
                      ? member.expertise.en
                      : member.expertise.de}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
