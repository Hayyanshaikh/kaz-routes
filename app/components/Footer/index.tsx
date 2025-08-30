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

const Footer = () => {
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
    { label: "Home", href: "/" },
    { label: "Packages", href: "search?category=packages" },
    { label: "Sites", href: "search?category=sites" },
    { label: "Cars", href: "search?category=cars" },
    { label: "Hotels", href: "search?category=hotels" },
    { label: "Restaurants", href: "search?category=restaurants" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
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
                {link.label}
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
          Copyright ©2025 All rights reserved | Powered by{" "}
          <span className="font-semibold text-primary">KazRoutes</span> - Your
          Travel Companion
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
