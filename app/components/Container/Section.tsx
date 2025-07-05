import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Section = ({ children, className = "" }: Props) => {
  return <section className={`py-10 ${className}`}>{children}</section>;
};

export default Section;
