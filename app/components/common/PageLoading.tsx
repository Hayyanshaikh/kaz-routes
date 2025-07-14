"use client";
import React from "react";
import { Loader } from "lucide-react"; // Lucide spinner icon (can change)

const PageLoading = () => {
  return (
    <div className="fixed top-0 left-0 h-screen bg-white w-full flex items-center justify-center z-[999999999999]">
      <Loader className="animate-spin text-primary w-8 h-8" />
      <span className="ml-3 text-gray-600 text-sm font-medium">Loading...</span>
    </div>
  );
};

export default PageLoading;
