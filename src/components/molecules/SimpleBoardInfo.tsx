import React, { ChangeEvent } from "react";
import SimpleBoardTextOne from "../atoms/Text/SimpleBoardTextOne";
import SimpleBoardTextTwo from "../atoms/Text/SimpleBoardTextTwo";
import SimpleBoardTextThree from "../atoms/Text/SimpleBoardTextThree";

interface BoardProps {
  category?: string;
  title?: string;
  content?: string;
  src?: string;
  minPrice?: string;
}
export default function SimpleBoardInfo({
  title,
  content,
  minPrice,
}: BoardProps) {
  return (
    <>
      <SimpleBoardTextOne title={title} />
      <SimpleBoardTextTwo content={content} />
      <SimpleBoardTextThree minPrice={minPrice} />
    </>
  );
}
