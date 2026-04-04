"use client";
import React, { useState } from "react";
import usePlanStore from "@/app/store/planStore";
import useDestinationStore from "@/app/store/destinationStore";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import CommonButton from "../../common/CommonButton";
import CommonModal from "../../common/CommonModal";
import { useTranslations } from "next-intl";
import { message } from "antd";

const PlanSummary = () => {
  const t = useTranslations("planning");
  const router = useRouter();
  const { plan, dayCount, usedDays, resetPlan } = usePlanStore();
  const { resetDestinations } = useDestinationStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  if (!plan) return null;

  const percentage = Math.round((usedDays / dayCount) * 100);

  const handleDelete = () => {
    resetPlan();
    resetDestinations();
    messageApi.success(t("deleteSuccess"));
    router.push("/plan/create");
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-white border-b pb-4 mb-4 border-gray-200">
      {contextHolder}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Back + Plan Info */}
        <div className="flex items-center gap-3">
          {/* Back button (desktop only) */}
          <button
            onClick={() => router.push("/plan/create")}
            className="hidden sm:flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 text-gray-700 transition hover:bg-primary hover:text-white hover:border-primary"
          >
            <ArrowLeftOutlined />
          </button>

          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {plan?.planName}
            </h2>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <CalendarOutlined className="text-primary" />
              {plan?.planDateRange?.[0]?.format("DD MMM")} –{" "}
              {plan?.planDateRange?.[1]?.format("DD MMM")}
            </p>
          </div>
        </div>

        {/* Right: Details + Progress + Actions */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Circular progress (always visible) */}
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90">
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
              {t("nightsPlanned")}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <CommonButton
              onClick={() => {
                window.open(`/plan/overview/${plan?.id}`, "_blank");
              }}
              label={t("overview")}
              className="flex-1 sm:flex-initial"
            />
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center justify-center h-10 w-10 rounded-lg border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white hover:border-red-500"
              title={t("deletePlan")}
            >
              <DeleteOutlined />
            </button>
          </div>
        </div>
      </div>

      <CommonModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        title={t("deletePlan")}
        description={t("deletePlanConfirm")}
        onConfirm={handleDelete}
        confirmText={t("yes") || "Yes"}
        cancelText={t("no") || "No"}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default PlanSummary;
