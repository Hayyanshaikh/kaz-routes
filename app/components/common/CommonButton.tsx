"use client";

import { CommonButtonProps } from "@/app/types/CommonType";
import Link from "next/link";
import * as React from "react";
import { Button, Spin } from "antd"; // ✅ AntD Button & Loader
import { LoadingOutlined } from "@ant-design/icons"; // ✅ AntD Loader Icon

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
  const loaderIcon = <LoadingOutlined spin />;

  const content = (
    <span className="flex items-center justify-center gap-2">
      {!loading && iconPosition === "left" && icon && <span>{icon}</span>}
      {label && <span>{label}</span>}
      {!loading && iconPosition === "right" && icon && <span>{icon}</span>}
      {loading && <Spin indicator={loaderIcon} size="small" />}
    </span>
  );

  if (link) {
    return (
      <Link href={link} className={className}>
        <Button
          ref={ref as any}
          type="primary"
          className="w-full"
          disabled={disabled || loading}
        >
          {content}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      ref={ref as any}
      type="primary"
      htmlType={type as "button" | "submit" | "reset"}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
    >
      {content}
    </Button>
  );
};

export default CommonButton;
