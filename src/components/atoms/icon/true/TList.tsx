import React from "react";
import { RiFileList2Fill } from "react-icons/ri";
interface Props {
  color: any;
}
export default function TList({ color }: Props) {
  return <RiFileList2Fill size={35} color={color} />;
}
