import DataFetcher from "@/components/organism/join/JoinInfoOne";
import BackHeader from "@/components/organism/layout/BackHeader";
import AlarmList from "@/components/organism/alarm/AlarmList";
import { cookies } from "next/headers";

async function getUserAlarmData() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  console.log(authorization, uuid);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/notification-service/api/v1/alarm/notifications`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`, // Add Bearer if needed
        uuid: `${uuid}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const data = await getUserAlarmData();
  console.log(data);
  return (
    <main>
      <BackHeader title="" />
      <div style={{ padding: "3%", paddingTop: "12vh" }}>
        <AlarmList
          eventType="경매"
          alarmUrl="url"
          message="경매 낙찰되었습니다."
        />
      </div>
    </main>
  );
}
