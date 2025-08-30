"use client";
import React from "react";
import { Spin } from "antd";

const PageLoading = () => {
  return (
    <div className="fixed top-0 left-0 h-screen bg-white w-full flex items-center justify-center z-[999999999999]">
      <Spin />
      <span className="ml-3 text-gray-600 text-sm font-medium">Loading...</span>
    </div>
  );
};

export default PageLoading;
