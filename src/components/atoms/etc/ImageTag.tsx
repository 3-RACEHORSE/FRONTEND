"use client";

import React from "react";
import Image from "next/image";

interface ImageComponentProps {
  src?: string;
}

export default function ImageTag({ src }: ImageComponentProps) {
  return src ? (
    <img
      src={src}
      style={{
        height: "24px",
        width: "24px",
        marginLeft: "3px",
      }}
      alt="Image"
    />
  ) : null;
}
