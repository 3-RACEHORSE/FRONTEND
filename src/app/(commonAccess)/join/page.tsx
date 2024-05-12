import DataFetcher from "@/components/organism/join/JoinInfoOne";
import styles from "@/styles/join/join.module.scss";

export default function Page() {
  return (
    <>
      <main className={styles["join-main-container"]}>
        <DataFetcher />
      </main>
    </>
  );
}
