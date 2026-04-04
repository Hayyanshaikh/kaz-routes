"use client";
import React from "react";
import {
  EnvironmentOutlined,
  CarOutlined,
  HomeOutlined,
  ShopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Empty, Timeline } from "antd";
import CommonBadge from "../../common/CommonBadge";
import CommonCard from "./PlanCommonCarad";
import dayjs from "dayjs";
import usePlanStore from "@/app/store/planStore";
import { useFormatCurrency } from "@/app/hooks/useFormatCurrency";

interface Props {
  days: any[];
}

import { useTranslations } from "next-intl";

const PlanDestinationDetail: React.FC<Props> = ({ days }) => {
  const t = useTranslations("planning");
  const { plan } = usePlanStore();
  const { format } = useFormatCurrency();

  const adults = plan?.adults || 0;
  const childrens = plan?.childrens || 0;

  const timelineItems = days.map((day, index) => {
    // Calculate Day Total
    const hotelTotal = day?.hotelBookings?.reduce(
      (sum: number, h: any) => sum + Number(h.price || 0),
      0,
    );
    const carTotal = day?.carBookings?.reduce(
      (sum: number, c: any) => sum + Number(c.price || 0),
      0,
    );
    const siteTotal = day?.siteBookings?.reduce(
      (sum: number, s: any) =>
        sum +
        (Number(s.price_adult || 0) * adults +
          Number(s.price_child || 0) * childrens),
      0,
    );
    const restaurantTotal = day?.restaurantBookings?.reduce(
      (sum: number, r: any) =>
        sum + Number(r.price || 0) * Number(r.quantity || 0),
      0,
    );

    const dayTotal = hotelTotal + carTotal + siteTotal + restaurantTotal;

    return {
      key: index,
      dot: <CheckCircleOutlined className="text-green-500! text-lg" />,
      children: (
        <div className="pb-6">
          {/* Header */}
          <div className="flex flex-wrap gap-3 items-center mb-3">
            <h3 className="text-sm md:text-base font-bold text-gray-800">
              {day.destination} - {t("day", { count: index + 1 })}
            </h3>
            <CommonBadge
              color="success"
              label={dayjs(day.date).format("ddd, MMM D, YYYY")}
            />
            {dayTotal > 0 && (
              <span className="ml-auto text-sm font-bold text-primary">
                {t("subTotal") || "Sub total"}: {format(dayTotal)}
              </span>
            )}
          </div>

          {/* Full Details Inline (jo pehle modal me the) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {day?.hotelBookings?.length === 0 &&
              day?.siteBookings?.length === 0 &&
              day?.carBookings?.length === 0 &&
              day?.restaurantBookings?.length === 0 && (
                <div className="md:col-span-2 text-center text-gray-500 py-6">
                  <Empty description={t("noPlanDay")} />
                </div>
              )}

            {/* Hotels */}
            {day?.hotelBookings?.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-semibold mb-2">
                  <HomeOutlined className="text-primary!" /> {t("hotels")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                  {day?.hotelBookings?.map((h: any, idx: number) => (
                    <CommonCard
                      key={idx}
                      id={h?.hotel_id}
                      label={t("hotelSingular")}
                      name={h?.hotel_name}
                      image={h?.thumbnail || null}
                      description={h?.room_name}
                      price={h?.price}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sites */}
            {day?.siteBookings?.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-semibold mb-2">
                  <EnvironmentOutlined className="text-primary!" /> {t("sites")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                  {day?.siteBookings?.map((s: any, idx: number) => (
                    <CommonCard
                      key={idx}
                      id={s?.id}
                      label={t("siteSingular")}
                      name={s?.name}
                      image={s?.thumbnail || null}
                      description={s?.name}
                      price={
                        s.price_adult * adults +
                        (s.price_child || 0) * childrens
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cars */}
            {day?.carBookings?.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-semibold mb-2">
                  <CarOutlined className="text-primary!" /> {t("cars")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                  {day?.carBookings?.map((c: any, idx: number) => (
                    <CommonCard
                      key={idx}
                      id={c?.id}
                      label={t("carSingular")}
                      name={`${c?.brand} ${c?.model}`}
                      image={c?.thumbnail || null}
                      price={c?.price}
                      description={
                        <div>
                          <span className="block">
                            {t("dropoff")} {c?.dropoff_location}
                          </span>
                          <span className="block">
                            {t("pickup")} {c?.pickup_location}
                          </span>
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Restaurants */}
            {day?.restaurantBookings?.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-semibold mb-2">
                  <ShopOutlined className="text-primary!" /> {t("restaurants")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                  {day?.restaurantBookings?.map((r: any, idx: number) => (
                    <CommonCard
                      key={idx}
                      id={r?.restaurantId}
                      label={t("restaurantSingular")}
                      name={r?.dishName}
                      image={r?.thumbnail || null}
                      price={r?.price * r?.quantity}
                      description={`${t("quantity")} ${r?.quantity}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="px-4 py-6 border-t pt-10 border-gray-300 bg-gray-50">
      <Timeline className="p-0!" items={timelineItems} />
      <div className="text-center mt-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          {t("endAdventure")}
        </h2>
        <p className="text-xs md:text-sm text-gray-500">
          {t("thanksExploring")}
        </p>
      </div>
    </div>
  );
};

export default PlanDestinationDetail;
