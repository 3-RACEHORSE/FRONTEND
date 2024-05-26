import DataFetcher from "@/components/organism/join/JoinInfoOne";
import BackHeader from "@/components/organism/layout/BackHeader";
import styles from "@/styles/join/join.module.scss";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  console.log("유저세션", session?.user);

  return (
    <>
      <BackHeader title="회원가입" />
      <main className={styles["join-main-container"]}>
        <DataFetcher
          email={session?.user.email}
          name={session?.user.name}
          snsType="google"
          snsId={session?.user.id}
        />
      </main>
    </>
  );
}
