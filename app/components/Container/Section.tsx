import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Section = ({ children, className = "", style, ...props }: Props) => {
  return (
    <section
      className={`py-10 ${className && className}`}
      style={style}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
