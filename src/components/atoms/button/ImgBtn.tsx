"use client";

import React from "react";
import Image from "next/image";
import ImageComponentProps from "@/lib/interface/imageBtn";

export default function ImgBtn({
  src,
  width,
  height,
  marginLeft,
  marginRight,
}: ImageComponentProps) {
  const imageStyle: React.CSSProperties = {
    marginLeft: marginLeft,
    marginRight: marginRight,
  };

  return (
    <Image
      src={src}
      width={width}
      height={height}
      style={imageStyle}
      alt="이미지"
    />
  );
}
