"use client";

import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageLinks = [];

    pageLinks.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`w-[30px] h-[30px] ${
          currentPage === 1
            ? "bg-teal text-white"
            : "bg-white hover:bg-gray-300"
        }`}
      >
        1
      </button>,
    );

    if (currentPage > 3) {
      pageLinks.push(<span key="start-dots">...</span>);
    }

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      startPage = 2;
      endPage = Math.min(4, totalPages - 1);
    }

    if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
      endPage = totalPages - 1;
    }

    for (let page = startPage; page <= endPage; page++) {
      pageLinks.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-[30px] h-[30px]  ${
            currentPage === page
              ? "bg-teal text-white"
              : "bg-white hover:bg-gray-300"
          }`}
        >
          {page}
        </button>,
      );
    }

    if (currentPage < totalPages - 2) {
      pageLinks.push(<span key="end-dots">...</span>);
    }

    if (totalPages > 1) {
      pageLinks.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-[30px] h-[30px]  ${
            currentPage === totalPages
              ? "bg-teal text-white shadow"
              : "bg-white hover:bg-gray-300"
          }`}
        >
          {totalPages}
        </button>,
      );
    }

    return pageLinks;
  };

  return (
    <div className="w-full flex items-center justify-center gap-2 mt-10 py-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-[30px] h-[30px] hover:bg-gray-300 disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed"
      >
        &larr;
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-[30px] h-[30px]  hover:bg-gray-300 disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed"
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
