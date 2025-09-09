"use client";
import React from "react";
import usePlanStore from "@/app/store/planStore";
import { ArrowLeftOutlined, CalendarOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PlanSummary = () => {
  const router = useRouter();
  const { plan, dayCount, usedDays } = usePlanStore();

  if (!plan) return null;

  const percentage = Math.round((usedDays / dayCount) * 100);

  return (
    <div className="bg-white border-b pb-4 mb-4 border-gray-200">
      {/* Plan Summary Content */}
      <div className="flex items-center justify-between">
        {/* Left: Plan Name + Dates */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/plan/create")}
            className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 text-gray-700 transition hover:!bg-primary hover:!text-white hover:!border-primary"
          >
            <ArrowLeftOutlined />
          </button>

          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {plan.planName}
            </h2>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <CalendarOutlined className="!text-primary" />
              {plan.planDateRange[0].format("DD MMM")} –{" "}
              {plan.planDateRange[1].format("DD MMM")}
            </p>
          </div>
        </div>

        {/* Right: Circular progress */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6">
            {/* Adults */}
            {plan?.adults > 0 && (
              <div className="flex flex-col items-center gap-1">
                <div className="text-sm font-medium py-1 px-3 rounded-md bg-gray-100 border border-gray-200">
                  {plan?.adults}
                </div>
                <span className="text-xs capitalize text-black/80">adults</span>
              </div>
            )}

            {/* Children */}
            {plan?.childrens > 0 && (
              <div className="flex flex-col items-center gap-1">
                <div className="text-sm font-medium py-1 px-3 rounded-md bg-gray-100 border border-gray-200">
                  {plan?.childrens}
                </div>
                <span className="text-xs capitalize text-black/80">childs</span>
              </div>
            )}

            {/* Infants */}
            {plan?.infants > 0 && (
              <div className="flex flex-col items-center gap-1">
                <div className="text-sm font-medium py-1 px-3 rounded-md bg-gray-100 border border-gray-200">
                  {plan?.infants}
                </div>
                <span className="text-xs capitalize text-black/80">
                  infants
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#ff8929"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 20}
                  strokeDashoffset={
                    2 * Math.PI * 20 - (percentage / 100) * (2 * Math.PI * 20)
                  }
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
                {usedDays}/{dayCount}
              </div>
            </div>
            <div className="text-xs text-gray-500 leading-tight">
              Nights <br /> planned
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;
