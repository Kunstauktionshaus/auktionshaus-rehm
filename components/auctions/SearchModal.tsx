import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Search from "@components/Search";
import { useTranslations } from "next-intl";

type SearchModalProps = {
  categoryFilteredItemsLength: number;
  setIsSearchModalOpen: (state: boolean) => void;
  setSearchKeyword: (keyword: string) => void;
};

const SearchModal = ({
  categoryFilteredItemsLength,
  setIsSearchModalOpen,
  setSearchKeyword,
}: SearchModalProps) => {
  const t = useTranslations("AuctionPage");

  return (
    <div className="w-full sticky top-0 right-0 z-20 bg-white flex flex-col gap-4 p-4 shadow">
      <div className="w-full flex gap-2 items-center justify-between">
        <span className="text-teal">
          {categoryFilteredItemsLength} {t("items")}
        </span>
        <button
          onClick={() => setIsSearchModalOpen(false)}
          className="text-3xl p-2"
        >
          <FontAwesomeIcon icon={faXmark} className="text-gray-500" />
        </button>
      </div>
      <Search onSearch={setSearchKeyword} />
    </div>
  );
};

export default SearchModal;
