"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CommonSelect from "../common/CommonSelect";
import CommonButton from "../common/CommonButton";
import { CATEGORIES } from "@/lib/constant";
import { Form } from "antd";

const SearchBar = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [category, setCategory] = useState("");

  const handleCategoryChange = (val: string) => {
    setCategory(val);
  };

  const handleSearch = () => {
    if (category) {
      router.push(`/search?category=${encodeURIComponent(category)}`);
    } else {
      alert("Category select karo pehle");
    }
  };

  return (
    <Form form={form} onFinish={handleSearch} className="w-full!">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 sm:p-5 rounded-xl shadow-xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 flex-1">
          <CommonSelect
            name="category"
            label="Category"
            options={CATEGORIES}
            onValueChange={handleCategoryChange}
            placeholder="Select Category"
          />
        </div>

        <CommonButton
          label="Search"
          htmlType="submit"
          className="flex items-center gap-1 h-fit mt-auto"
        />
      </div>
    </Form>
  );
};

export default SearchBar;
