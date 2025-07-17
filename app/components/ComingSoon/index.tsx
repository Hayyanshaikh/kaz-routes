"use client";
import React from "react";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-[70vh] flex-col text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">🚧 Coming Soon</h1>
      <p className="text-md text-gray-500 mb-6">
        This feature is under development. Please check back later.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary text-white px-6 py-2 rounded-md text-sm font-medium shadow-md hover:bg-primary/90 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ComingSoon;
