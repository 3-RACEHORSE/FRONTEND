"use client";

import React from "react";
import styles from "@/styles/atoms/sendBtn.module.scss";

interface ButtonProps {
  buttonText: string;
}

export default function SendBtnInValid({ buttonText }: ButtonProps) {
  return <button className={styles["button-invalid"]}>{buttonText}</button>;
}
