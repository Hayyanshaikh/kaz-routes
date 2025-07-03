"use client";
import { CommonButtonProps } from "@/app/types/CommonType";
import { Button } from "@/shadcn/components/ui/button";
import Link from "next/link";
import * as React from "react";

interface ExtendedButtonProps extends CommonButtonProps {
  link?: string; // optional link prop
}

const CommonButton: React.FC<ExtendedButtonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  link,
}) => {
  // If `link` is provided, render as a Link
  if (link) {
    return (
      <Link href={link} className={className}>
        <Button
          className={`rounded-xs bg-primary cursor-pointer w-full`}
          asChild
        >
          <span>{label}</span>
        </Button>
      </Link>
    );
  }

  // Otherwise render as regular button
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-sm cursor-pointer bg-orange-500 hover:bg-orange-600 ${className}`}
    >
      {label}
    </Button>
  );
};

export default CommonButton;
