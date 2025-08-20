"use client";

import Container from "../Container";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import usePageContentStore from "@/app/store/usePageContent";

const Footer = () => {
  const { pageContent } = usePageContentStore();

  // ✅ Safe JSON parse function
  const safeParse = (jsonString: string | undefined) => {
    try {
      return jsonString ? JSON.parse(jsonString) : {};
    } catch (e) {
      console.error("Invalid JSON:", e);
      return {};
    }
  };

  // Parse social links from store
  const socials = safeParse(pageContent?.contact?.socials);

  // Parse navigation links from store (optional, else fallback)
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
  ];

  return (
    <footer className="bg-gray-950 text-white py-6 pb-6 mt-auto relative flex justify-center items-center min-h-[300px]">
      <Container>
        <div className="relative w-full flex flex-col items-center justify-center gap-4 text-center">
          <h3 className="text-2xl font-bold">kazroutes.com</h3>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center space-y-2 space-x-4 max-w-3xl text-sm mt-2">
            {navigationLinks.map((link: any, index: number) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-primary transition text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social media icons dynamically */}
          <div className="flex space-x-4 mt-2">
            {socials.facebook && (
              <Link
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition-colors group"
              >
                <Facebook className="text-primary group-hover:text-white transition-colors" />
              </Link>
            )}
            {socials.instagram && (
              <Link
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition-colors group"
              >
                <Instagram className="text-primary group-hover:text-white transition-colors" />
              </Link>
            )}
            {socials.twitter && (
              <Link
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition-colors group"
              >
                <Twitter className="text-primary group-hover:text-white transition-colors" />
              </Link>
            )}
            {socials.linkedin && (
              <Link
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition-colors group"
              >
                <Linkedin className="text-primary group-hover:text-white transition-colors" />
              </Link>
            )}
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-4">
          Copyright ©2025 All rights reserved | Powered by{" "}
          <span className="font-semibold text-primary">KazRoutes</span> - Your
          Travel Companion
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
