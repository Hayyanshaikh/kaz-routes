// components/Footer.tsx
import { footerData } from "@/lib/constant";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Container from "../Container";
import Logo from "../Header/Logo";

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-white py-12 pb-6">
      <Container>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* 4 Columns from Constants */}
          {footerData.columns.map((column, idx) => (
            <div key={idx}>
              <h3 className="text-white font-semibold mb-3">{column.title}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition"
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
