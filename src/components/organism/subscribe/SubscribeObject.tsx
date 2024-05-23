"use client";

import React, { ChangeEvent } from "react";
import Image from "next/image";
import styles from "@/styles/subscribe/subscribe.module.scss";

export default function SubscribeObject() {
  return (
    <div className={styles["flexBox"]}>
      <div className={styles["element-container"]}>
        <Image
          src="/dummy/profile.jpg"
          alt=""
          width={100}
          height={100}
          style={{
            borderRadius: "100px",
            border: "2px solid #52ebb6",
            marginLeft: "3%",
          }}
        />
        <p>CHO</p>
      </div>
    </div>
  );
}
