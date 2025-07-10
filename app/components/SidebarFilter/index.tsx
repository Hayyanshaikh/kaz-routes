// components/SidebarFilter.tsx
"use client";

import { useEffect, useState } from "react";
import CommonCheckbox from "../Common/CommonCheckbox";
import CommonSelect from "../Common/CommonSelect";

type FilterOption = {
  label: string;
  value: string;
};

type FilterConfig = {
  id: string;
  label: string;
  type: "checkbox" | "select" | "custom";
  options?: FilterOption[];
  customRender?: () => React.ReactNode;
};

type SidebarFilterProps = {
  filters: FilterConfig[];
  onChange?: (data: Record<string, string | string[]>) => void;
  initialValues?: Record<string, string | string[]>;
};

const SidebarFilter = ({
  filters,
  onChange,
  initialValues = {},
}: SidebarFilterProps) => {
  const [checkboxState, setCheckboxState] = useState<
    Record<string, Set<string>>
  >({});
  const [selectState, setSelectState] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkboxInit: Record<string, Set<string>> = {};
    const selectInit: Record<string, string> = {};

    Object.entries(initialValues).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        checkboxInit[key] = new Set(value);
      } else {
        selectInit[key] = value;
      }
    });

    setCheckboxState(checkboxInit);
    setSelectState(selectInit);
  }, [initialValues]);

  const handleCheckboxChange = (filterId: string, value: string) => {
    setCheckboxState((prev) => {
      const currentSet = new Set(prev[filterId] || []);
      if (currentSet.has(value)) {
        currentSet.delete(value);
      } else {
        currentSet.add(value);
      }
      return { ...prev, [filterId]: currentSet };
    });
  };

  const handleSelectChange = (filterId: string, value: string) => {
    setSelectState((prev) => ({ ...prev, [filterId]: value }));
  };

  const handleClearFilters = () => {
    setCheckboxState({});
    setSelectState({});
  };

  const handleClearSection = (filterId: string, type: string) => {
    if (type === "checkbox") {
      setCheckboxState((prev) => {
        const updated = { ...prev };
        delete updated[filterId];
        return updated;
      });
    }
    if (type === "select") {
      setSelectState((prev) => {
        const updated = { ...prev };
        delete updated[filterId];
        return updated;
      });
    }
  };

  useEffect(() => {
    if (!onChange) return;
    const combined: Record<string, string | string[]> = {};

    Object.entries(checkboxState).forEach(([key, set]) => {
      combined[key] = Array.from(set);
    });

    Object.entries(selectState).forEach(([key, val]) => {
      combined[key] = val;
    });

    onChange(combined);
  }, [checkboxState, selectState, onChange]);

  return (
    <aside className="w-full bg-white p-5 rounded-xl border border-gray-300 space-y-4">
      {/* <div className="flex justify-end">
        <button
          onClick={handleClearFilters}
          className="text-sm text-red-600 underline hover:text-red-800"
        >
          Clear All Filters
        </button>
      </div> */}
      {filters.map((filter) => (
        <div key={filter.id} className="border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{filter.label}</span>
            <button
              onClick={() => handleClearSection(filter.id, filter.type)}
              className="text-xs text-gray-500 underline hover:text-gray-700"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2">
            {filter.type === "checkbox" &&
              filter.options?.map((opt) => (
                <CommonCheckbox
                  key={opt.value}
                  checked={checkboxState[filter.id]?.has(opt.value) || false}
                  onCheckedChange={() =>
                    handleCheckboxChange(filter.id, opt.value)
                  }
                  label={opt.label}
                />
              ))}

            {filter.type === "select" && (
              <CommonSelect
                onValueChange={(value) => handleSelectChange(filter.id, value)}
                value={selectState[filter.id] || ""}
                options={filter.options || []}
              />
            )}

            {filter.type === "custom" &&
              filter.customRender &&
              filter.customRender()}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default SidebarFilter;
