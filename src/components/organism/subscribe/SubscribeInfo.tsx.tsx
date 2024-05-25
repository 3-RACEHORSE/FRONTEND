import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/profileInfo.module.scss";
import IconWithTitle from "@/components/molecules/IconWithTitle";
import CategoryText from "@/components/atoms/Text/CategoryText";
import SubscribeList from "@/components/organism/subscribe/SubscribeObject";

interface SubScribeInfoProps {
  title: string;
}
export default function SubScribeInfo({ title }: SubScribeInfoProps) {
  return (
    <div>
      <IconWithTitle title={title} />
    </div>
  );
}
