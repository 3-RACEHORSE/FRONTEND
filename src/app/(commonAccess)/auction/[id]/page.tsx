import Image from "next/image";
import styles from "@/styles/auction/auction.module.scss";
import Header from "@/components/organism/layout/Header";
import NavBar from "@/components/organism/layout/NavBar";
import BoardObject from "@/components/organism/auction/BoardObject";

export default function Page() {
  return (
    <main>
      <Header />
      <BoardObject />
      {/* <div className={styles["ddd"]}></div>
      <div className={styles["ddd"]}></div>
      <div className={styles["ddd"]}></div>
      <div className={styles["aaa"]}></div>
      <NavBar /> */}
    </main>
  );
}
