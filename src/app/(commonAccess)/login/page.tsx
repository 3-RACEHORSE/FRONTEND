import Image from "next/image";
import styles from "@/styles/login/login.module.scss";
import LoginBtn from "./_component/LoginBtn";
import NavBar from "@/components/organism/layout/NavBar";
import BackHeader from "@/components/organism/layout/BackHeader";

export default function Page() {
  const LoginLogo = "/dummy/loginLogo.png";
  return (
    <main>
      <BackHeader title={"LOGIN"} />
      <div className={styles["login-main-frame"]}>
        <Image src={LoginLogo} alt="" width={220} height={220} />
      </div>
      <div className={styles["login-btn-frame"]}>
        <LoginBtn />
      </div>
    </main>
  );
}
