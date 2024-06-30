import { getAuctionInfo } from "@/apis/getAuctionInfo";
import { getUserPaymentInfo } from "@/apis/getUserPaymentInfo";
import PayBtn from "@/components/organism/payment/PayBtn";
import PaymentAgree from "@/components/organism/payment/PaymentAgree";
import PaymentInfo from "@/components/organism/payment/PaymentInfo";
import { cookies } from "next/headers";

export default async function Page(props: any) {
  const pathName = props.params.id;
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data1 = await getUserPaymentInfo(pathName, authorization, uuid);
  const data2 = await getAuctionInfo(pathName, authorization, uuid);

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
