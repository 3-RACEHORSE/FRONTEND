"use client";

import styles from "@/styles/layout/header.module.scss";
import BackBtn from "@/components/atoms/button/BackBtn";
import TitleText from "@/components/atoms/Text/TitleText";
import Gap from "@/components/atoms/etc/Gap";

interface TextProps {
  title: string;
}

export default function BackHeader({ title }: TextProps) {
  const handleBack = () => {
    console.log("d");
  };

  return (
    <>
      <header className={styles["header-main-container"]}>
        <BackBtn onClick={handleBack} />
        <TitleText title={title} />
        <Gap width={30} height={30} />
      </header>
    </>
  );
}
