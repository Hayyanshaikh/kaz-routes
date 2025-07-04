import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link href="/">
      <span className={`font-bold text-2xl text-white ${className}`}>
        Kaz Routes
      </span>
    </Link>
  );
};

export default Logo;
