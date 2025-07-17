"use client";
import { footerData } from "@/lib/constant";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Container from "../Container";
import Logo from "../Header/Logo";
import {
  useControllerGetFindAllCars,
  useControllerGetFindAllHotels,
  useControllerGetFindAllPackages,
  useControllerGetFindAllSites,
} from "@/app/hooks/api";

const Footer = () => {
  const { data: packagesData } = useControllerGetFindAllPackages();
  const { data: hotelsData } = useControllerGetFindAllHotels();
  const { data: carsData } = useControllerGetFindAllCars();
  const { data: sitesData } = useControllerGetFindAllSites();

  const dynamicFooterColumns = [
    {
      title: "Tour Packages",
      links: (packagesData?.data || []).map((pkg: any) => ({
        label: pkg?.name || "Untitled",
        href: `/packages/${pkg?.slug || pkg?.id}`,
      })),
    },
    {
      title: "Hotels",
      links: (hotelsData?.data || []).map((hotel: any) => ({
        label: hotel?.hotel_name || "Untitled",
        href: `/hotels/${hotel?.slug || hotel?.id}`,
      })),
    },
    {
      title: "Cars",
      links: (carsData?.data || []).map((car: any) => ({
        label: `${car?.brand?.name} - ${car?.model}` || "Untitled",
        href: `/cars/${car?.slug || car?.id}`,
      })),
    },
    {
      title: "Sites",
      links: (sitesData?.data || []).map((site: any) => ({
        label: site?.name || "Untitled",
        href: `/sites/${site?.slug || site?.id}`,
      })),
    },
  ];

  const allFooterColumns = [...footerData.columns, ...dynamicFooterColumns];

  return (
    <footer className="bg-gray-950 text-white py-12 pb-6 mt-auto">
      <Container>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* 4 Columns from Constants */}
          {allFooterColumns.map((column, idx) => (
            <div key={idx}>
              <h3 className="text-white font-semibold mb-3">{column.title}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {column.links.map((link: any, i: number) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition line-clamp-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            <Logo />
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {footerData.social.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {item.icon === "facebook" && <Facebook size={20} />}
                {item.icon === "instagram" && <Instagram size={20} />}
                {item.icon === "youtube" && <Youtube size={20} />}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs">
          {footerData.year}{" "}
          <span className="text-primary">{footerData.by}</span> All Rights
          Reserved
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
