"use client";
import { useEffect } from "react";

type MetadataProps = {
  title: string;
  description?: string; // optional
};

const Metadata = ({ title, description }: MetadataProps) => {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);

  return null;
};

export default Metadata;
