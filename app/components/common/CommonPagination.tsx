"use client";

import { FC } from "react";
import CommonButton from "./CommonButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CommonPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CommonPagination: FC<CommonPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-end space-x-2 mt-4">
      <CommonButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        icon={<ChevronLeft size={16} />}
        className={`px-3 py-1 border border-gray-300 bg-transparent text-black hover:bg-gray-100 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />

      {pages.map((page) => (
        <CommonButton
          key={page}
          label={page.toString()}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 w-9 ${
            page === currentPage
              ? "bg-primary text-white hover:text-white"
              : "bg-transparent border border-gray-300 text-black hover:bg-gray-100"
          }`}
        />
      ))}

      <CommonButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        icon={<ChevronRight size={16} />}
        className={`px-3 py-1 border border-gray-300 bg-transparent text-black hover:bg-gray-100 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default CommonPagination;
