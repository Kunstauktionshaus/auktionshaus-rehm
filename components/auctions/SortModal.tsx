import FilterPanel from "@components/FilterPanel";
import Modal from "@components/shared/Modal";
import { useTranslations } from "next-intl";
import CleanButton from "./CleanButton";

type SortModalProps = {
  categoryFilteredItemsLength: number;
  setIsSortModalOpen: (state: boolean) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
  onSortChange: (newSortOption: string) => void;
  onCategoryChange: (categories: number[]) => void;
  sortOption: string;
  selectedCategories: number[];
  handleItemsPerPageChange: (value: number) => void;
  handleSortChange: (value: string) => void;
  handleCategoryChange: (categories: number[]) => void;
};

const SortModal = ({
  categoryFilteredItemsLength,
  setIsSortModalOpen,
  itemsPerPage,
  onItemsPerPageChange,
  onSortChange,
  onCategoryChange,
  sortOption,
  selectedCategories,
  handleItemsPerPageChange,
  handleSortChange,
  handleCategoryChange,
}: SortModalProps) => {
  const t = useTranslations("AuctionPage");

  return (
    <Modal onClose={() => setIsSortModalOpen(false)}>
      <div className="flex flex-col gap-1 mb-6">
        <span className="font-bold  text-xl uppercase">{t("filtersSort")}</span>
        <span className="text-teal">
          {categoryFilteredItemsLength} {t("items")}
        </span>
      </div>
      <FilterPanel
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        onSortChange={onSortChange}
        onCategoryChange={onCategoryChange}
        sortOption={sortOption}
        selectedCategories={selectedCategories}
      />
      <div className="flex gap-2 items-center justify-between mt-8 pt-8 border-t">
        <button
          className="border px-4 py-2 border-teal bg-teal text-white"
          onClick={() => setIsSortModalOpen(false)}
        >
          {t("apply")}
        </button>
        <CleanButton
          handleItemsPerPageChange={handleItemsPerPageChange}
          handleSortChange={handleSortChange}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
    </Modal>
  );
};

export default SortModal;
