import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import PayBtn from "@/components/organism/payment/PayBtn";
import PaymentAgree from "@/components/organism/payment/PaymentAgree";
import PaymentInfo from "@/components/organism/payment/PaymentInfo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUserPaymentInfo(pathName: any) {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  console.log(authorization, uuid);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/result/${pathName}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`, // Add Bearer if needed
        uuid: `${uuid}`,
      },
    }
  );

  const data = await res.json();
  return data;
}

async function getAuctionInfo(pathName: any) {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  console.log(authorization, uuid);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/${pathName}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`, // Add Bearer if needed
        uuid: `${uuid}`,
      },
    }
  );

  const data = await res.json();
  return data;
}

export default async function Page(props: any) {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const pathName = props.params.id;

  const data1 = await getUserPaymentInfo(pathName);
  const data2 = await getAuctionInfo(pathName);
  console.log(data1);
  console.log(data2);
  return (
    <main>
      <PaymentInfo price={data1.price} title={data2.title} />
      <PaymentAgree />
      <PayBtn
        authorization={authorization}
        uuid={uuid}
        pathName={pathName}
        price={data1.price}
      />
    </main>
  );
}
