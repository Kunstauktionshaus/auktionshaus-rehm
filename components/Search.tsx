"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

interface SearchProps {
  onSearch: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const t = useTranslations("AuctionPage");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="w-full flex gap-2 items-center border border-gray-300  px-4 py-2">
      <div className="w-6 h-6 flex items-center">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
      </div>

      <input
        type="text"
        placeholder={t("searchByKey")}
        value={searchTerm}
        onChange={handleSearchChange}
        className="outline-none flex-grow"
      />
    </div>
  );
};

export default Search;
