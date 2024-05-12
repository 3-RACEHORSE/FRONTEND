import DataFetcher from "@/components/organism/join/JoinInfoOne";
import BackHeader from "@/components/organism/layout/BackHeader";
import styles from "@/styles/join/join.module.scss";

export default function Page() {
  return (
    <>
      <BackHeader />
      <main className={styles["join-main-container"]}>
        <DataFetcher />
      </main>
    </>
  );
}
