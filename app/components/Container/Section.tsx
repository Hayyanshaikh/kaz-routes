import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Section = ({ children, className = "", ...props }: Props) => {
  return (
    <section className={`py-20 ${className}`} {...props}>
      {children}
    </section>
  );
};

export default Section;
