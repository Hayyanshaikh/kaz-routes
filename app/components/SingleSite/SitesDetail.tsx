"use client";
import { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import Services from "./Services";
import dayjs from "dayjs";
import { DISPLAY_DATE } from "@/lib/constant";

type SiteType = {
  name: string;
  description: string;
  categories: string[];
  timings?: {
    start: string;
    end: string;
    duration_hours: string;
    closed_days: string[];
  };
  pricing: {
    adult: string;
    child: string | null;
    boy: string;
    vehicle_extra_costs: any[];
  };
  media: {
    images: string[];
    videos: string[];
    youtube: string | null;
  };
  activities?: any[];
};

type Props = {
  site: SiteType;
};

const SitesDetail = ({ site }: Props) => {
  const [showFull, setShowFull] = useState(false);

  const hasActivities = site.activities && site.activities.length > 0;

  return (
    <section className="flex flex-col items-start flex-1 lg:w-1/2">
      <CommonHeading
        className="text-left !mb-0"
        title={site.name}
        subtitle={
          showFull ? site.description : `${site.description.slice(0, 300)}...`
        }
      />
      <div className="mb-6 text-gray-700">
        <CommonButton
          className="p-0 bg-transparent hover:bg-transparent text-gray-900 underline"
          onClick={() => setShowFull(!showFull)}
          label={showFull ? "Show less" : "Show more"}
        />
      </div>

      {/* Categories as services */}
      <Services services={site.categories} />

      <div className="flex items-center justify-between w-full gap-6 flex-wrap mb-8">
        {site.timings && (
          <div className="mt-6">
            <p className="font-semibold text-gray-900 mb-3">Timings:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>
                <strong>Start:</strong>{" "}
                {dayjs(site.timings.start).format(DISPLAY_DATE)}
              </li>
              <li>
                <strong>End:</strong>{" "}
                {dayjs(site.timings.end).format(DISPLAY_DATE)}
              </li>
              <li>
                <strong>Duration:</strong> {site.timings.duration_hours} hrs
              </li>
            </ul>
          </div>
        )}

        {site.pricing && (
          <div className="mt-6">
            <p className="font-semibold text-gray-900 mb-3">Pricing:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>
                <strong>Adult:</strong> PKR {site.pricing.adult}
              </li>
              <li>
                <strong>Boy:</strong> PKR {site.pricing.boy}
              </li>
              {site.pricing.child && (
                <li>
                  <strong>Child:</strong> PKR {site.pricing.child}
                </li>
              )}
            </ul>
          </div>
        )}

        {site?.activities && site?.activities?.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold text-gray-900 mb-3">Facilities:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {site?.activities?.map((facility: string, i: number) => (
                <li key={i}>{facility}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <CommonButton label="Book Now" className="h-10 rounded-full w-full" />
    </section>
  );
};

export default SitesDetail;
