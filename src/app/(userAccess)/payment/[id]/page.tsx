import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import PayBtn from "@/components/organism/payment/PayBtn";
import PaymentAgree from "@/components/organism/payment/PaymentAgree";
import PaymentInfo from "@/components/organism/payment/PaymentInfo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  return (
    <main>
      <PaymentInfo />
      <PaymentAgree />
      <PayBtn />
    </main>
  );
}
