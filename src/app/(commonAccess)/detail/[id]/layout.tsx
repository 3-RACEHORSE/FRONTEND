import BackHeader from "@/components/organism/layout/BackHeader";
import Footer from "@/components/organism/layout/Footer";
import Header from "@/components/organism/layout/Header";
import NavBar from "@/components/organism/layout/NavBar";
import { ReactNode } from "react";

type Props = { children: ReactNode; detailInfo: ReactNode };

export default function Layout({ children, detailInfo }: Props) {
  return (
    <div>
      <BackHeader title="상세페이지" />
      {children}
      {detailInfo}
      {/* <NavBar /> */}
      <Footer />
    </div>
  );
}
