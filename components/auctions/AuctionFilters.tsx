import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import Search from "@components/Search";
import { useTranslations } from "next-intl";

type AuctionFiltersProps = {
  categoryFilteredItemsLength: number;
  setSearchKeyword: (keyword: string) => void;
  setIsSearchModalOpen: (state: boolean) => void;
  setIsSortModalOpen: (state: boolean) => void;
};

const AuctionFilters = ({
  categoryFilteredItemsLength,
  setSearchKeyword,
  setIsSearchModalOpen,
  setIsSortModalOpen,
}: AuctionFiltersProps) => {
  const t = useTranslations("AuctionPage");
  return (
    <div className="w-full flex gap-4 items-center justify-between p-4 border-y">
      <div className="h-full flex items-center gap-1 text-lg font-semibold">
        <span>{categoryFilteredItemsLength}</span>
        <span>{t("items")}</span>
      </div>

      <div className="w-[300px] hidden lg:flex gap-2 items-center justify-between">
        <Search onSearch={setSearchKeyword} />
      </div>

      <div className="lg:hidden text-teal flex items-center gap-6">
        <button onClick={() => setIsSearchModalOpen(true)}>
          <FontAwesomeIcon
            icon={faSearch}
            className="w-6 h-full text-gray-500 mr-2 text-2xl"
          />
        </button>

        <button onClick={() => setIsSortModalOpen(true)}>
          <FontAwesomeIcon
            icon={faBars}
            className="w-6 h-full text-gray-500 mr-2 text-2xl"
          />
        </button>
      </div>
    </div>
  );
};

export default AuctionFilters;
