"use client";
import { CommonButtonProps } from "@/app/types/CommonType";
import { Button } from "@/shadcn/components/ui/button";
import Link from "next/link";
import * as React from "react";

const CommonButton: React.FC<CommonButtonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  link,
  icon,
  iconPosition = "left",
  ref,
}) => {
  const content = (
    <div className="flex items-center gap-2">
      {iconPosition === "left" && icon && <span>{icon}</span>}
      <span>{label}</span>
      {iconPosition === "right" && icon && <span>{icon}</span>}
    </div>
  );

  if (link) {
    return (
      <Link href={link} className={className}>
        <Button
          ref={ref}
          className="rounded-sm bg-primary cursor-pointer w-full"
          asChild
        >
          <span>{content}</span>
        </Button>
      </Link>
    );
  }

  return (
    <Button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-sm cursor-pointer bg-orange-500 hover:bg-orange-600 ${className}`}
    >
      {content}
    </Button>
  );
};

export default CommonButton;
