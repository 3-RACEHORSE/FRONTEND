"use client";

import React from "react";
import Image from "next/image";

interface GapComponentProps {
  width: number;
  height: number;
}

export default function Gap({ width, height }: GapComponentProps) {
  const gapStyle: React.CSSProperties = {
    width: width,
    height: width,
  };

  return <div style={gapStyle} />;
}
