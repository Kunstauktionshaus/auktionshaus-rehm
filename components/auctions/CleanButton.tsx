import { useTranslations } from "next-intl";

type SortModalProps = {
  handleItemsPerPageChange: (value: number) => void;
  handleSortChange: (value: string) => void;
  handleCategoryChange: (categories: number[]) => void;
};

const CleanButton = ({
  handleItemsPerPageChange,
  handleSortChange,
  handleCategoryChange,
}: SortModalProps) => {
  const t = useTranslations("AuctionPage");

  return (
    <button
      className="border px-4 py-2 text-teal border-teal"
      onClick={() => {
        handleSortChange("lotOrder");
        handleCategoryChange([]);
        handleItemsPerPageChange(24);
      }}
    >
      {t("clear")}
    </button>
  );
};

export default CleanButton;
