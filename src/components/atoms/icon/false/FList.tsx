import React from "react";
import { RiFileList2Line } from "react-icons/ri";

interface Props {
  color: any;
}

export default function FList({ color }: Props) {
  return <RiFileList2Line size={35} color={color} />;
}
