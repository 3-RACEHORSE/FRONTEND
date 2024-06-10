import React from "react";
import { RiUser3Line } from "react-icons/ri";
interface Props {
  color: any;
}
export default function FMy({ color }: Props) {
  return <RiUser3Line size={35} color={color} />;
}
