import React from "react";
import { RiChat1Fill2 } from "react-icons/ri";
interface Props {
  color: any;
}

export default function FChat({ color }: Props) {
  return <RiChat1Fill2 size={35} color={color} />;
}
