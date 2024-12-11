"use client";
import { ObjectSchemaValues, ObjectsArrayValues } from "@schemas/item";
import ItemPreview from "../ItemPreview";
import { Suspense, useEffect, useState } from "react";
import Pagination from "../Pagination";
import { useLocale, useTranslations } from "next-intl";
import FilterPanel from "../FilterPanel";
import AuctionFilters from "./AuctionFilters";
import SearchModal from "./SearchModal";
import SortModal from "./SortModal";
import CleanButton from "./CleanButton";

const AuctionItems = ({ items }: { items: ObjectsArrayValues }) => {
  const t = useTranslations("AuctionPage");
  const [itemsPerPage, setItemsPerPage] = useState<number>(24);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("lotOrder");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const locale = useLocale();

  const filteredItems = items.filter((item) => {
    if (locale === "en") {
      return (
        item.headerEN.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.descriptionEN.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    } else {
      return (
        item.headerDE.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.descriptionDE.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
  });

  const categoryFilteredItems =
    selectedCategories.length > 0
      ? filteredItems.filter((item) =>
          selectedCategories.includes(item.category || 0),
        )
      : filteredItems;

  const orderedItems = [...categoryFilteredItems].sort((a, b) => {
    if (sortOption === "lotOrder") {
      return a.catalogNumber - b.catalogNumber;
    }
    if (sortOption === "asc") {
      return a.catalogPrice - b.catalogPrice;
    }
    if (sortOption === "desc") {
      return b.catalogPrice - a.catalogPrice;
    }

    return 0;
  });

  const totalItems = categoryFilteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = orderedItems.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categories: number[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const enableScroll = () => {
      document.body.style.overflow = "";
    };

    if (isSortModalOpen) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => enableScroll();
  }, [isSortModalOpen]);

  return (
    <div className="p-4">
      <AuctionFilters
        categoryFilteredItemsLength={categoryFilteredItems.length}
        setSearchKeyword={setSearchKeyword}
        setIsSearchModalOpen={setIsSearchModalOpen}
        setIsSortModalOpen={setIsSortModalOpen}
      />

      {isSearchModalOpen && (
        <SearchModal
          categoryFilteredItemsLength={categoryFilteredItems.length}
          setSearchKeyword={setSearchKeyword}
          setIsSearchModalOpen={setIsSearchModalOpen}
        />
      )}

      <div className="w-full flex gap-4">
        <div className="min-w-[320px] border-r p-4 hidden lg:flex flex-col gap-8">
          <FilterPanel
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            onSortChange={handleSortChange}
            onCategoryChange={handleCategoryChange}
            sortOption={sortOption}
            selectedCategories={selectedCategories}
          />
          <CleanButton
            handleItemsPerPageChange={setItemsPerPage}
            handleSortChange={setSortOption}
            handleCategoryChange={setSelectedCategories}
          />
        </div>

        <div className="w-full p-2 xl:p-8 flex flex-col items-center">
          {categoryFilteredItems.length > 0 ? (
            <>
              <Suspense fallback={<p>{t("loading")}</p>}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center">
                  {paginatedItems.map((item: ObjectSchemaValues) => (
                    <div key={item.id}>
                      <ItemPreview item={item} searchKeyword={searchKeyword} />
                    </div>
                  ))}
                </div>
              </Suspense>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <p>{t("itemsNotFound")}</p>
          )}
        </div>
      </div>

      {isSortModalOpen && (
        <SortModal
          categoryFilteredItemsLength={categoryFilteredItems.length}
          setIsSortModalOpen={setIsSortModalOpen}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          onSortChange={handleSortChange}
          onCategoryChange={handleCategoryChange}
          sortOption={sortOption}
          selectedCategories={selectedCategories}
          handleItemsPerPageChange={setItemsPerPage}
          handleSortChange={setSortOption}
          handleCategoryChange={setSelectedCategories}
        />
      )}
    </div>
  );
};

export default AuctionItems;
