"use client";

import React from "react";
import styles from "@/styles/atoms/searchInput.module.scss";
import Link from "next/link";

export default function Search() {
  return (
    <Link href="/search" style={{ width: "70%" }}>
      <input type="text" className={styles["input"]} />
    </Link>
  );
}
