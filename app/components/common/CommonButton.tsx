"use client";
import { CommonButtonProps } from "@/app/types/CommonType";
import { Button } from "@/shadcn/components/ui/button";
import Link from "next/link";
import * as React from "react";

import { Loader2 } from "lucide-react";

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
  loading = false,
}) => {
  const content = (
    <div className="flex items-center justify-center gap-2">
      {loading && <Loader2 className="animate-spin h-4 w-4" />}
      {!loading && iconPosition === "left" && icon && <span>{icon}</span>}
      {label && <span>{label}</span>}
      {!loading && iconPosition === "right" && icon && <span>{icon}</span>}
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
      disabled={disabled || loading}
      className={`rounded-sm cursor-pointer bg-orange-500 hover:bg-orange-600 shadow-none ${className}`}
    >
      {content}
    </Button>
  );
};
export default CommonButton;
