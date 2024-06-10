import React from "react";
import { RiChat1Line } from "react-icons/ri";
interface Props {
  color: any;
}
export default function FChat({ color }: Props) {
  return <RiChat1Line size={35} color={color} />;
}
