"use client";

import React from "react";
import CustomSelect from "./shared/CustomSelect";
import { useTranslations } from "next-intl";

interface SortByProps {
  onSort: (sortBy: string) => void;
  sortOption: string;
}

const Sort: React.FC<SortByProps> = ({ onSort, sortOption }) => {
  const t = useTranslations("AuctionPage");
  const handleSortChange = (value: string | number) => {
    onSort(value as string);
  };

  const options = [
    { label: `${t("lotOrder")}`, value: "lotOrder" },
    { label: `${t("priceAsc")}`, value: "asc" },
    { label: `${t("priceDesc")}`, value: "desc" },
  ];

  return (
    <div className="w-full flex items-center gap-4">
      <CustomSelect
        label={t("sortBy")}
        options={options}
        value={sortOption}
        onChange={handleSortChange}
        placeholder="Select Sort Option"
      />
    </div>
  );
};

export default Sort;
