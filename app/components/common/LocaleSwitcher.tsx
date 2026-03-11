"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Select, ConfigProvider } from "antd";

const LocaleSwitcher: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    if (!pathname) return;
    
    // Split the pathname: /en/about -> ["", "en", "about"]
    const segments = pathname.split("/");
    
    // Replace the locale segment
    segments[1] = newLocale;
    
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <ConfigProvider
        theme={{
          token: {
            colorText: "white",
            colorIcon: "white",
          },
          components: {
            Select: {
              selectorBg: "transparent",
              optionSelectedBg: "#ff6900",
              optionActiveBg: "rgba(255, 105, 0, 0.1)",
              colorText: "white",
              colorIcon: "white",
            },
          },
        }}
      >
        <Select
          value={locale}
          onChange={handleLocaleChange}
          options={[
            { value: "en", label: "🇺🇸" },
            { value: "ru", label: "🇷🇺" },
          ]}
          className="w-[65px]"
          variant="borderless"
          styles={{
            popup: {
              root: { backgroundColor: "#111827" },
            },
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default LocaleSwitcher;
