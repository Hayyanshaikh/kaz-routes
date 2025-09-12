"use client";
import React, { ReactNode } from "react";
import { Image } from "antd";
import {
  EnvironmentOutlined,
  CarOutlined,
  HomeOutlined,
  ShopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { FILE_BASE_URL } from "@/lib/constant";
import CommonBadge from "../../common/CommonBadge";
import CommonCard from "./PlanCommonCarad";

interface Props {
  destinations: any[];
}

const Heading = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-3 border-y border-gray-300">
    {icon}
    <span className="text-base font-semibold capitalize">{text}</span>
  </div>
);

const DestinationSummary: React.FC<Props> = ({ destinations }) => {
  return (
    <div className="flex flex-col gap-10">
      {destinations?.map((dest, index) => (
        <div key={index}>
          {/* Banner with overlay */}
          <div className="relative h-60 md:h-80 w-full overflow-hidden">
            <Image
              src={`${FILE_BASE_URL}/${dest?.image}`}
              alt={dest?.name}
              wrapperClassName="absolute inset-0 w-full h-full"
              className="w-full h-full object-cover"
              fallback="https://placehold.co/800x410/CCCCCC/000000?text=Image+Not+Found"
              preview={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                <h3 className="text-lg md:text-2xl font-bold">
                  {dest?.name}{" "}
                  <small className="text-xs font-normal opacity-80">
                    ({index + 1} Destination)
                  </small>
                </h3>
                <CommonBadge
                  label={`${dest?.nights} Night`}
                  color="warning"
                  className="text-xs md:text-sm font-semibold"
                />
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 text-xs md:text-sm text-gray-200">
                <div className="flex items-center gap-1">
                  <HomeOutlined className="!text-blue-300" />
                  <span>{dest?.hotels?.length} Hotels</span>
                </div>
                <div className="flex items-center gap-1">
                  <CarOutlined className="!text-green-300" />
                  <span>{dest?.cars?.length} Cars</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShopOutlined className="!text-orange-300" />
                  <span>{dest?.restaurants?.length} Dishes</span>
                </div>
                <div className="flex items-center gap-1">
                  <EnvironmentOutlined className="!text-purple-300" />
                  <span>{dest?.sites?.length} Sites</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="">
            {/* Hotels */}
            {dest?.hotels?.length > 0 && (
              <div>
                <Heading
                  icon={<HomeOutlined className="!text-primary" />}
                  text={`Sleeping in ${dest?.name}`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-5">
                  {dest?.hotels?.map((h: any, hidx: number) => (
                    <CommonCard
                      key={hidx}
                      id={h?.id}
                      label="Hotel"
                      name={h?.hotel?.name}
                      image={h?.images?.[0]}
                      description={h?.room_name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sites */}
            {dest?.sites?.length > 0 && (
              <div>
                <Heading
                  icon={<EnvironmentOutlined className="!text-primary" />}
                  text={`Exploring ${dest?.name}`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-5">
                  {dest?.sites?.map((s: any, sidx: number) => (
                    <CommonCard
                      key={sidx}
                      id={s?.id}
                      label="Site"
                      name={s?.name}
                      image={s?.images?.[0]}
                      description={s?.description}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cars */}
            {dest?.cars?.length > 0 && (
              <div>
                <Heading
                  icon={<CarOutlined className="!text-primary" />}
                  text={`Getting around in ${dest?.name}`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-5">
                  {dest?.cars?.map((c: any, cidx: number) => (
                    <CommonCard
                      key={cidx}
                      id={c?.id}
                      label="Car"
                      name={c?.brand?.name}
                      image={c?.images?.[0]?.image_path}
                      description={c?.model}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Restaurants */}
            {dest?.restaurants?.length > 0 && (
              <div>
                <Heading
                  icon={<ShopOutlined className="!text-primary" />}
                  text={`Eating in ${dest?.name}`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-5">
                  {dest?.restaurants?.map((r: any, ridx: number) => (
                    <CommonCard
                      key={ridx}
                      id={r?.id}
                      label="Restaurant"
                      name={`${r?.dish?.name} (${r.quantity})`}
                      image={r?.images?.[0]}
                      description={
                        r?.restaurant?.restaurant_name || "Famous Restaurant"
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* End of destination */}
          <div className="flex items-center justify-center gap-2 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300">
              <CheckCircleOutlined className="!text-green-500 text-base md:text-lg" />
              <span className="text-xs md:text-sm !text-gray-600 font-medium">
                End of {dest?.name}
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
        </div>
      ))}

      {/* End of All Destinations */}
      <div className="mb-12 flex justify-center">
        <div className=" flex flex-col items-center gap-3 text-center px-4">
          <CheckCircleOutlined className="text-2xl md:text-3xl !text-green-500" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-wide">
            End of Adventure!
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            Thanks for exploring with us ✨
          </p>

          <div className="flex gap-3 mt-2 text-lg text-gray-400">
            <ShopOutlined className="!text-orange-400" />
            <EnvironmentOutlined className="!text-purple-400" />
            <CarOutlined className="!text-green-400" />
            <HomeOutlined className="!text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationSummary;
