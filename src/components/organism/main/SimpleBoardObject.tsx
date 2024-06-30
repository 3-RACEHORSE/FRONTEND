import React from "react";
import SimpleBoardInfo from "@/components/molecules/SimpleBoardInfo";
import ImgWithCategory from "@/components/molecules/ImgWithCategory";
import { SimpleBoardObjectProps } from "@/interface/SimpleBoardObjectProps";

export default function SimpleBoardObject({
  category,
  title,
  content,
  src,
  minPrice,
}: SimpleBoardObjectProps) {
  return (
    <div>
      <ImgWithCategory src={src} category={category} />
      <SimpleBoardInfo title={title} content={content} minPrice={minPrice} />
    </div>
  );
}
