"use client";

import Image from "next/image";
import Container from "../Container";
import Link from "next/link"; // Import Link for Next.js navigation
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  // Combine existing links with new pages
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
    { label: "Create Plan", href: "/create-plan" },
  ];

  return (
    <footer className="bg-gray-950 text-white py-6 pb-6 mt-auto relative flex justify-center items-center min-h-[300px]">
      <Container>
        <div className="relative w-full flex flex-col items-center justify-center gap-4 text-center">
          <h3 className="text-2xl font-bold">kazroutes.com</h3>
          {/* Overlay for navigation links */}
          <div className="flex flex-wrap justify-center space-y-2 space-x-4 max-w-3xl text-sm">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-primary transition text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Social media icons overlay with Link */}
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition-colors group"
            >
              <Facebook
                size={20}
                className="text-primary group-hover:text-white transition-colors"
              />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition-colors group"
            >
              <Instagram
                size={20}
                className="text-primary group-hover:text-white transition-colors"
              />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary transition-colors group"
            >
              <Twitter
                size={20}
                className="text-primary group-hover:text-white transition-colors"
              />
            </Link>
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
