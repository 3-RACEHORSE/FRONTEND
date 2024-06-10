import React from "react";
import { GoHome } from "react-icons/go";
interface Props {
  color: any;
}
export default function FHome({ color }: Props) {
  return <GoHome size={35} color={color} />;
}
