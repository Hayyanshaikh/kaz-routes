"use client";

import { FC } from "react";
import { Pagination } from "antd";

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
  return (
    <div className="flex items-center justify-end mt-4">
      <Pagination
        current={currentPage}
        total={totalPages * 10} // AntD ke liye total items dene hote hain
        pageSize={10} // yahan aap apni page size set kar sakte ho
        onChange={onPageChange}
        showSizeChanger={false} // agar sirf next/prev aur page numbers dikhane hain
      />
    </div>
  );
};

export default CommonPagination;
