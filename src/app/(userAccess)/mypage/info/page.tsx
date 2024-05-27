import MyPageUserInfo from "@/components/organism/info/MyPageUserInfo";
import BackHeader from "@/components/organism/layout/BackHeader";
import Footer from "@/components/organism/layout/Footer";
import { cookies } from "next/headers";
import { Key } from "react";

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  return (
    <main>
      <BackHeader title="마이페이지 / 회원정보 관리" />
      <MyPageUserInfo />
      <Footer />
    </main>
  );
}
