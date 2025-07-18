"use client";
import React, { useEffect, useState } from "react";
import CommonCheckbox from "../common/CommonCheckbox";
import { useSearchParams, useRouter } from "next/navigation";

type FilterItem = {
  id: string;
  label: string;
  type: "checkbox";
  options: string[];
};

type SidebarFilterProps = {
  filters: FilterItem[];
};

const SidebarFilter: React.FC<SidebarFilterProps> = ({ filters }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [checkboxState, setCheckboxState] = useState<
    Record<string, Set<string>>
  >({});

  // ✅ Load from URL
  useEffect(() => {
    const initState: Record<string, Set<string>> = {};

    for (const [key, value] of searchParams.entries()) {
      const matchedFilter = filters.find((f) => f.id === key);
      if (matchedFilter?.type === "checkbox") {
        initState[key] = new Set(value.split(","));
      }
    }

    setCheckboxState(initState);
  }, [searchParams.toString(), filters]);

  // ✅ Toggle and update URL instantly
  const handleCheckboxChange = (filterId: string, option: string) => {
    const current = new Set(checkboxState[filterId] || []);
    current.has(option) ? current.delete(option) : current.add(option);

    const newCheckboxState = { ...checkboxState, [filterId]: current };
    setCheckboxState(newCheckboxState);

    const newParams = new URLSearchParams(searchParams.toString());

    // update URL
    if (current.size === 0) {
      newParams.delete(filterId);
    } else {
      newParams.set(filterId, Array.from(current).join(","));
    }

    router.push(`?${String(newParams).replace(" ", "+")}`);
  };

  return (
    <div className="p-4 border rounded-xl space-y-4">
      {filters.map((filter) => (
        <div key={filter.id}>
          <h3 className="font-semibold text-sm text-gray-700 mb-2">
            {filter.label}
          </h3>
          <div className="flex flex-col gap-2">
            {filter.options.map((option) => (
              <CommonCheckbox
                key={`${filter.id}-${option}`} // ✅ unique key
                label={option}
                checked={checkboxState[filter.id]?.has(option) || false}
                onChange={() => handleCheckboxChange(filter.id, option)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarFilter;
