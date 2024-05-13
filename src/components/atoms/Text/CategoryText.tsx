import React, { ReactNode } from "react";

interface TextProps {
  title: string;
}

export default function CategoryText({ title }: TextProps) {
  return (
    <li
      style={{ fontWeight: "bold", color: "#2f2f2f" }}
      className="px-4 py-2 whitespace-nowrap"
    >
      {title}
    </li>
  );
}
