"use client";

import styles from "@/styles/layout/writeBar.module.scss";
import { useRouter } from "next/navigation";

export default function WriteBar() {
  const router = useRouter();
  const goToWrite = async () => {
    router.push("/write");
  };

  return (
    <div className={styles["icon"]} onClick={goToWrite}>
      +글쓰기
    </div>
  );
}
