import React from "react";
import Image from "next/image";
import ImageComponentProps from "@/lib/interface/atoms";

export default function ImgBtn({
  src,
  width,
  height,
  margin,
}: ImageComponentProps) {
  const imageStyle: React.CSSProperties = {
    width: width,
    height: height,
    margin: margin,
  };

  return <img src={src} style={imageStyle} alt="이미지" />;
}
