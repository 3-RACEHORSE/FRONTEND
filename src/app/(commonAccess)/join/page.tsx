import DataFetcher from "@/components/organism/join/JoinInfoOne";
import BackHeader from "@/components/organism/layout/BackHeader";
import styles from "@/styles/join/join.module.scss";

export default function Page() {
  return (
    <>
      <BackHeader title="회원가입" />
      <main className={styles["join-main-container"]}>
        <DataFetcher />
      </main>
    </>
  );
}
