"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/profileInfo.module.scss";
import IconWithTitle from "@/components/molecules/IconWithTitle";
import CategoryText from "@/components/atoms/Text/CategoryText";
import SubscribeList from "@/components/organism/subscribe/SubscribeObject";

export default function SubScribeInfo() {
  return (
    <div>
      <IconWithTitle title="✅구독" />
    </div>
  );
}
