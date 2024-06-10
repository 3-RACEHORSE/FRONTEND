import React from "react";
import { RiUser3Fill } from "react-icons/ri";
interface Props {
  color: any;
}
export default function TMy({ color }: Props) {
  return <RiUser3Fill size={35} color={color} />;
}
