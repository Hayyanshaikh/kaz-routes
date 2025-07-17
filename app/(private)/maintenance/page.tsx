"use client";
import Link from "next/link";

export default function Maintenance() {
  return (
    <div className="flex items-center justify-center h-[70vh] flex-col text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        🛠️ Site Under Maintenance
      </h1>
      <p className="text-md text-gray-500 mb-6">
        We're currently working on updates. Please check back later.
      </p>
      <Link
        href="mailto:support@example.com"
        className="inline-block bg-primary text-white px-6 py-2 rounded-md text-sm font-medium shadow-md hover:bg-primary/90 transition duration-300"
      >
        Contact Support
      </Link>
    </div>
  );
}
