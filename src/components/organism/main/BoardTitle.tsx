import React, { useState, useEffect } from "react";
import styles from "@/styles/layout/header.module.scss";
import IconWithTitle from "@/components/molecules/IconWithTitle";

interface BoardTitlenProps {
  title: string;
  src?: string;
  detail?: string;
}

export default function BoardTitle({ title, src, detail }: BoardTitlenProps) {
  return (
    <div>
      <IconWithTitle title={title} src={src} detail={detail} />
    </div>
  );
}
