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
}) => {
  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </>
  );

  if (link) {
    return (
      <Link href={link} className={className}>
        <Button className="rounded-sm bg-primary cursor-pointer w-full" asChild>
          <span>{content}</span>
        </Button>
      </Link>
    );
  }

  return (
    <Button
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
