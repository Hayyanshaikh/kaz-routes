import { ContainerProps } from "@/app/types/CommonType";
import React from "react";

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`px-4 mx-auto max-w-screen-xl w-full ${className}`}>
    {children}
  </div>
);

export default Container;
