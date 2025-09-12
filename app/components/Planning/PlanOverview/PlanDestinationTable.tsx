"use client";

import React from "react";
import { Table } from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  MoonOutlined,
} from "@ant-design/icons";

interface PlanDestination {
  id: string;
  name: string;
  image: string;
  nights: number;
  hotels: { room_name: string }[];
  cars: { model: string; brand: { name: string } }[];
  sites: { name: string }[];
  restaurants: { name: string }[];
}

interface TripDetailsProps {
  destinations: PlanDestination[];
}

const TripDetails: React.FC<TripDetailsProps> = ({ destinations }) => {
  let startDay = 1;

  // Pre-process destinations
  const tableData = destinations.map((destination) => {
    const nights = destination.nights;
    const endDay = startDay + nights - 1;
    const dayRange = `Day ${startDay} - Day ${endDay}`;
    const name = destination?.name;
    startDay = endDay + 1;
    return { days: dayRange, key: destination.id, nights, name };
  });

  // Define columns with icons
  const columns = [
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      className: "text-sm font-medium", // header ke liye
      render: (text: string) => (
        <span className="flex items-center gap-2 text-gray-700 font-medium">
          <ClockCircleOutlined className="text-gray-500" />
          {text}
        </span>
      ),
    },
    {
      title: "Destination",
      dataIndex: "name",
      key: "name",
      className: "text-sm font-medium",
      render: (text: string) => (
        <span className="flex items-center gap-2 text-gray-700 font-medium">
          <EnvironmentOutlined className="text-green-600" />
          {text}
        </span>
      ),
    },
    {
      title: "Nights",
      dataIndex: "nights",
      key: "nights",
      className: "text-sm font-medium",
      render: (text: number) => (
        <span className="flex items-center gap-2 text-gray-700 font-medium">
          <MoonOutlined className="text-blue-500" />
          {`${text} ${Number(text) > 1 ? "Nights" : "Night"}`}
        </span>
      ),
    },
  ];

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-center my-5">
        About this trip
      </h2>

      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        className="border-y border-gray-300"
        rowClassName={() =>
          "hover:bg-gray-50 transition-colors text-gray-700 text-sm sm:text-base"
        }
      />
    </div>
  );
};

export default TripDetails;
