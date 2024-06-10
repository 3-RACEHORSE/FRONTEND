import React from "react";
import { GoHomeFill } from "react-icons/go";
interface Props {
  color: any;
}
export default function THome({ color }: Props) {
  return <GoHomeFill size={35} color={color} />;
}
