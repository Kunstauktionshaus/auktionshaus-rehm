import Sort from "./Sort";
import ItemsPerPage from "./ItemsPerPage";
import FilterByCategory from "./FilterByCategory";

interface FilterPanelProps {
  itemsPerPage: number;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
  onSortChange: (newSortOption: string) => void;
  onCategoryChange: (categories: number[]) => void;
  sortOption: string;
  selectedCategories: number[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
  onSortChange,
  onCategoryChange,
  sortOption,
  selectedCategories,
}) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <Sort sortOption={sortOption} onSort={onSortChange} />
      <ItemsPerPage
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
      <FilterByCategory
        onCategoryChange={onCategoryChange}
        selectedCategories={selectedCategories}
      />
    </div>
  );
};

export default FilterPanel;
