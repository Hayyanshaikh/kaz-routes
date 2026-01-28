"use client";
import React, { useTransition } from "react";
import { Form, Button } from "antd";
import CommonInput from "../../common/CommonInput";
import CommonDatePicker from "../../common/CommonDatePicker";
import CommonMultiSelect from "../../common/CommonMultiSelect";
import { useControllerGetFindAllCountries } from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";
import usePlanStore from "@/app/store/planStore";
import { generateUUID } from "@/lib/utils";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const StartPlanForm: React.FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { data: countriesData } = useControllerGetFindAllCountries();
  const countriesOptions = dropdownManipulator(countriesData?.data || []);
  const [form] = Form.useForm();
  const { plan, setPlan } = usePlanStore();

  const onFinish = (values: any) => {
    const payload = {
      id: generateUUID(),
      ...values,
    };

    setPlan(payload);

    startTransition(() => {
      router.push(`${payload.id}/`);
    });
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-1 text-center">
        Create You'r Plan
      </h2>

      <div className="p-6 border border-gray-300 flex flex-col gap-4 rounded-md">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            planName: plan?.planName,
            countries: plan?.countries,
            planDateRange: plan?.planDateRange,
            adults: plan?.adults || 1,
            childrens: plan?.childrens || 0,
            infants: plan?.infants || 0,
          }}
          className="flex flex-col gap-4"
        >
          <CommonInput
            name="planName"
            label="Plan name"
            rules={[{ required: true }]}
          />

          <CommonMultiSelect
            name="countries"
            label="Which countries are you going?"
            options={countriesOptions}
            rules={[{ required: true }]}
          />

          <CommonDatePicker
            label="Duration"
            name="planDateRange"
            mode="range"
            className="w-full"
            rules={[{ required: true }]}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />

          <div className="grid grid-cols-3 gap-4">
            <CommonInput type="number" name="adults" label="Adults" />
            <CommonInput type="number" name="childrens" label="Childrens" />
            <CommonInput type="number" name="infants" label="Infants" />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            // disabled={isPending}
            className="bg-primary-300 border-none w-full font-bold mt-4"
          >
            Start planning
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default StartPlanForm;
