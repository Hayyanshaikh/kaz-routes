"use client";
import React from "react";
import { Form, Button } from "antd";
import CommonInput from "../../common/CommonInput";
import CommonDatePicker from "../../common/CommonDatePicker";
import CommonMultiSelect from "../../common/CommonMultiSelect";
import { useControllerGetFindAllCountries } from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";
import usePlanStore from "@/app/store/planStore";
import { generateUUID } from "@/lib/utils";
import { useRouter } from "next/navigation";

const StartPlanForm: React.FC = () => {
  const router = useRouter();
  const { data: countriesData } = useControllerGetFindAllCountries();
  const countriesOptions = dropdownManipulator(countriesData?.data || []);
  const [form] = Form.useForm();

  const setPlan = usePlanStore((state) => state.setPlan);

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    const payload = {
      id: generateUUID(),
      ...values,
    };
    setPlan(payload);
    router.push(`${payload.id}/`);
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto ">
      <h2 className="text-2xl font-semibold mb-1 text-center">
        Create You'r Plan
      </h2>
      <div className="p-6 border border-gray-300 flex flex-col gap-4 rounded-md">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col gap-4"
        >
          <CommonInput
            name="planName"
            label="Plan name"
            placeholder="Give your plan a name.."
            rules={[{ required: true, message: "Please enter a plan name!" }]}
          />

          <CommonMultiSelect
            name="countries"
            label="Which countries are you going?"
            placeholder="Select countries.."
            options={countriesOptions}
            rules={[
              {
                required: true,
                message: "Please select at least one country!",
              },
            ]}
          />

          <CommonDatePicker
            label="Duration"
            name="planDateRange"
            mode="range"
            className="w-full"
            rules={[{ required: true, message: "Please select a duration!" }]}
          />

          {/* Travelers Section */}
          <div className="grid grid-cols-3 gap-4">
            <CommonInput
              type="number"
              name="adults"
              label="Adults"
              placeholder="0"
              rules={[{ required: true, message: "Enter adults count" }]}
            />
            <CommonInput
              type="number"
              name="children"
              label="Children"
              placeholder="0"
            />
            <CommonInput
              type="number"
              name="infants"
              label="Infants"
              placeholder="0"
            />
          </div>

          <div className="flex justify-center w-full items-center mt-4">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary-300 border-none w-full font-bold"
            >
              Start planning
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StartPlanForm;
