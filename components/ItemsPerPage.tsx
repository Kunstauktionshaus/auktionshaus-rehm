"use client";

import React from "react";
import CustomSelect from "./shared/CustomSelect";
import { useTranslations } from "next-intl";

interface ItemsPerPageProps {
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const ItemsPerPage: React.FC<ItemsPerPageProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const t = useTranslations("AuctionPage");
  const options = [
    { label: `24 ${t("items")}`, value: 24 },
    { label: `48 ${t("items")}`, value: 48 },
    { label: `96 ${t("items")}`, value: 96 },
    { label: `144 ${t("items")}`, value: 144 },
  ];

  const handleItemsPerPageChange = (value: string | number) => {
    onItemsPerPageChange(Number(value));
  };

  return (
    <div>
      <CustomSelect
        label={t("perPage")}
        options={options}
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        placeholder="Select number of items"
      />
    </div>
  );
};

export default ItemsPerPage;
