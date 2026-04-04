"use client";
import React from "react";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  DownOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import CommonButton from "../../common/CommonButton";
import CommonBadge from "../../common/CommonBadge";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useFormatCurrency } from "@/app/hooks/useFormatCurrency";

interface PlanDetailProps {
  plan: any;
  destinationsCount?: number;
  handleCreateTravelPlan: () => void;
  isPending?: boolean;
  isRedirecting?: boolean;
  totalPrice?: number;
}

const PlanDetail: React.FC<PlanDetailProps> = ({
  plan,
  destinationsCount,
  handleCreateTravelPlan,
  isPending,
  isRedirecting,
  totalPrice = 0,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const { format } = useFormatCurrency();
  const { planName, countries, planDateRange } = plan;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const startDate = formatDate((planDateRange as any)?.[0]);
  const endDate = formatDate((planDateRange as any)?.[1]);
  const nights = calculateNights(
    (planDateRange as any)?.[0],
    (planDateRange as any)?.[1],
  );
  const numberOfCountries = countries.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-3xl font-bold capitalize mb-4">{planName}</h1>

        {/* Trip Stats */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-medium mb-6">
          <CommonBadge
            icon={<ClockCircleOutlined className="w-4 h-4 text-gray-500" />}
            label={t("cards.nights", { count: nights ?? 0 })}
          />

          <CommonBadge
            icon={<EnvironmentOutlined className="w-4 h-4 text-gray-500" />}
            label={t("cards.destinations", { count: destinationsCount ?? 0 })}
          />

          <CommonBadge
            icon={<GlobalOutlined className="w-4 h-4 text-gray-500" />}
            label={t("cards.countries", { count: numberOfCountries ?? 0 })}
          />
        </div>

        {/* Total Price */}
        {totalPrice > 0 && (
          <div className="mb-6">
            <CommonBadge
              color="success"
              label={`${t("planning.totalPackage") || "Total Package"}: ${format(totalPrice)}`}
              className="text-lg! py-2! px-4! text-center! justify-center!"
            />
          </div>
        )}

        {/* Trip Dates */}
        <p className="text-sm sm:text-base font-medium mb-8 text-gray-800">
          {startDate} – {endDate}
        </p>

        {/* Back Button */}
        <CommonButton
          label={t("planning.back") || "Back"}
          onClick={() => router.back()}
        />
        {/* Animated Down Arrow (scroll indicator) */}
        <div className="mt-6 flex justify-center">
          <DownOutlined className="text-gray-600! animate-bounce text-xl" />
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;
