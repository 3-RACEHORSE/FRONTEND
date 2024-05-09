import { ReactNode } from "react";
import styles from "@/styles/login/login.module.scss";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return <div className={styles["login-main-container"]}>{children}</div>;
}
