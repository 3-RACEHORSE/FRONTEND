import { ReactNode } from "react";
import styles from "@/styles/login/login.module.scss";
import { SessionProvider } from "next-auth/react";
import BackHeader from "@/components/organism/layout/BackHeader";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return <div className={styles["login-main-container"]}>{children}</div>;
}
