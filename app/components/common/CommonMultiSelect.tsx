// CommonMultiSelect.tsx
"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shadcn/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { Button } from "@/shadcn/components/ui/button";
import { CommonMultiSelectProps } from "@/app/types/CommonType";

const CommonMultiSelect: React.FC<CommonMultiSelectProps> = ({
  label = "",
  placeholder = "Select...",
  className = "",
  disabled = false,
  error = "",
  options,
  value = [],
  onValueChange,
}) => {
  const [open, setOpen] = useState(false);

  const selectedValues = Array.isArray(value) ? value : [];

  const handleSelect = (selectedValue: string) => {
    if (!selectedValue) return;
    if (selectedValues.includes(selectedValue)) {
      onValueChange(selectedValues.filter((v) => v !== selectedValue));
    } else {
      onValueChange([...selectedValues, selectedValue]);
    }
  };

  const handleRemove = (val: string) => {
    onValueChange(selectedValues.filter((v) => v !== val));
  };

  return (
    <div className="text-left w-full">
      {label && (
        <label className="mb-2 block text-xs text-gray-600">{label}</label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            className={cn(
              "w-full justify-between h-auto min-h-[38px]",
              error && "border-red-500",
              className
            )}
          >
            <div className="flex flex-wrap gap-1 text-left w-full">
              {selectedValues.length > 0 ? (
                options
                  .filter((opt) => selectedValues.includes(opt.value))
                  .map((opt) => (
                    <span
                      key={opt.value}
                      className="flex items-center gap-1 line-clamp-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 border border-gray-300"
                    >
                      {opt.label}
                      <span
                        className="flex items-center justify-center h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(opt.value);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </span>
                    </span>
                  ))
              ) : (
                <span className="truncate text-gray-400">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="p-0 w-[var(--radix-popover-trigger-width)]"
        >
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  title={option.label}
                  onSelect={() => handleSelect(option.value)}
                >
                  <span className="line-clamp-1 max-w-[300px]">
                    {option.label}
                  </span>
                  {selectedValues.includes(option.value) && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default CommonMultiSelect;
