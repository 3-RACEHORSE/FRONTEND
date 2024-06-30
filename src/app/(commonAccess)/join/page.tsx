import DataFetcher from "@/components/organism/join/JoinInfoOne";
import styles from "@/styles/join/join.module.scss";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  console.log("회원가입 세션", session?.user);

  return (
    <main className={styles["join-main-container"]}>
      <DataFetcher
        email={session?.user.email}
        name={session?.user.name}
        snsType={session?.user.type}
        snsId={session?.user.id}
      />
    </main>
  );
}
