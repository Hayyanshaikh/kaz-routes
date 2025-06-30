"use client";

import React, { useState } from "react";
import CommonButton from "../components/common/CommonButton";
import CommonInput from "../components/common/CommonInput";
import CommonTextarea from "../components/common/CommonTextarea";
import CommonSelect from "../components/common/CommonSelect";
import CommonCheckbox from "../components/common/CommonCheckbox";
import CommonSwitch from "../components/common/CommonSwitch";
import CommonBadge from "../components/common/CommonBadge";
import CommonAlert from "../components/common/CommonAlert";
import CommonModal from "../components/common/CommonModal";

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
];

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-3 flex flex-col ">
      <h1 className="text-2xl font-semibold">Reusable ShadCN Components</h1>
      <CommonInput
        label="Input Field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
      />

      <CommonTextarea
        label="Description"
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
        placeholder="Enter description..."
      />

      <CommonSelect
        label="Choose an option"
        value={selectedValue}
        onValueChange={(val) => setSelectedValue(val)}
        options={options}
      />

      <CommonCheckbox
        checked={isChecked}
        onCheckedChange={setIsChecked}
        label="Accept Terms"
      />

      <CommonSwitch
        label="Toggle Switch"
        checked={isSwitched}
        onCheckedChange={setIsSwitched}
      />

      <CommonBadge label="Success Badge" color="success" />
      <CommonBadge label="Warning Badge" color="warning" />
      <CommonBadge label="Error Badge" color="error" />

      <CommonAlert title="Success" color="success" />

      <CommonAlert title="Warning" color="warning" />

      <CommonAlert title="Error" color="error" />

      <CommonButton
        label="Submit"
        onClick={() => setOpen(true)}
        className="w-full"
      />
      <CommonModal
        open={open}
        onOpenChange={setOpen}
        title="Delete Item"
        confirmText="Yes, Delete"
        onConfirm={() => {
          alert("Item deleted successfully!");
        }}
      >
        <p>Yahan modal ka content body show ho raha hai.</p>
      </CommonModal>
    </div>
  );
}
