"use client";

import styles from "@/styles/layout/header.module.scss";
import BackBtn from "@/components/atoms/button/BackBtn";
import TitleText from "@/components/atoms/Text/TitleText";
import Gap from "@/components/atoms/etc/Gap";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useDarkMode } from "@/hooks/common/checkDarkMode";

interface TextProps {
  title: string;
}

export default function BackHeader({ title }: TextProps) {
  useDarkMode();
  const router = useRouter();
  const pathName = usePathname();
  const handleBack = () => {
    if (pathName === "/join") {
      router.push("/");
    } else {
      router.back();
    }
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
