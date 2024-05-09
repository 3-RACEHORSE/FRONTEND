import Image from "next/image";
import LoginLogo from "@/asset/images/login/loginLogo.png";
import styles from "@/styles/login/login.module.scss";
import LoginBtn from "./_component/LoginBtn";

export default function Page() {
  return (
    <main className={styles["login-main-frame"]}>
      <Image src={LoginLogo} alt="" />
      <LoginBtn />
    </main>
  );
}
