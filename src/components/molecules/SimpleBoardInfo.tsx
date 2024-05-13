import React, { ChangeEvent } from "react";
import TitleText from "../atoms/Text/TitleText";
import BusinessCard from "../atoms/icon/Approval";
import styles from "@/styles/molecules/iconWithText.module.scss";
import CheckMark from "../atoms/icon/CheckMark";

interface BoardProps {
  category?: string;
  title: string;
  src?: string;
  minPrice?: string;
}
export default function SimpleBoardInfo({
  category,
  title,
  src,
  minPrice,
}: BoardProps) {
  return <></>;
}
