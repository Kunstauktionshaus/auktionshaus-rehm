"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface FilterByCategoryProps {
  onCategoryChange: (categories: number[]) => void;
  selectedCategories: number[];
}

const FilterByCategory: React.FC<FilterByCategoryProps> = ({
  onCategoryChange,
  selectedCategories,
}) => {
  const t = useTranslations("AuctionNav");

  const handleCategoryChange = (category: number) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    onCategoryChange(updatedCategories);
  };

  const categories = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <span className="text-lg font-semibold">{t("categories")}:</span>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <label key={category.id} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={category.id}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="hidden"
            />
            <span
              className={`w-6 h-6 mr-4 border ${
                selectedCategories.includes(category.id)
                  ? "bg-teal border-teal"
                  : "bg-white border-gray-400"
              } flex justify-center items-center transition duration-200`}
            >
              {selectedCategories.includes(category.id) && (
                <FontAwesomeIcon icon={faCheck} className="text-white" />
              )}
            </span>
            <span className="text-gray-700">{t(category.id.toString())}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByCategory;
