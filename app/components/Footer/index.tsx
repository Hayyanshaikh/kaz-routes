"use client";

import Container from "../Container";
import Link from "next/link";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import usePageContentStore from "@/app/store/usePageContent";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const { pageContent } = usePageContentStore();

  const safeParse = (jsonString: string | undefined) => {
    try {
      return jsonString ? JSON.parse(jsonString) : {};
    } catch (e) {
      console.error("Invalid JSON:", e);
      return {};
    }
  };

  const socials = safeParse(pageContent?.contact?.socials);

  const navigationLinks = [
    { label: "home", href: "/" },
    { label: "packages", href: "/search?category=packages" },
    { label: "sites", href: "/search?category=sites" },
    { label: "cars", href: "/search?category=cars" },
    { label: "hotels", href: "/search?category=hotels" },
    { label: "restaurants", href: "/search?category=restaurants" },
    { label: "privacy", href: "/privacy-policy" },
    { label: "terms", href: "/terms-conditions" },
    { label: "about", href: "/about" },
    { label: "contact", href: "/contact" },
  ];

  return (
    <footer className="bg-gray-950 text-white py-10 mt-auto min-h-[300px]">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-2xl font-bold">kazroutes.com</h3>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-2 max-w-[700px] text-sm">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t(`links.${link.label}`)}
              </Link>
            ))}
          </div>

          {/* Social media icons dynamically */}
          <div className="flex gap-4 mt-3">
            {socials.facebook && (
              <Link
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-[#ff8929]"
              >
                <FacebookOutlined className="text-xl" />
              </Link>
            )}
            {socials.instagram && (
              <Link
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-[#ff8929]"
              >
                <InstagramOutlined className="text-xl" />
              </Link>
            )}
            {socials.twitter && (
              <Link
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-[#ff8929]"
              >
                <TwitterOutlined className="text-xl" />
              </Link>
            )}
            {socials.linkedin && (
              <Link
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-[#ff8929]"
              >
                <LinkedinOutlined className="text-xl" />
              </Link>
            )}
          </div>
        </div>

        <div className="text-center text-gray-500 text-xs mt-5">
          {t("copyright")}{" "}
          <span className="font-semibold text-primary">{t("brand")}</span> -{" "}
          {t("tagline")}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
