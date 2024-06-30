import BackHeader from "@/components/organism/layout/BackHeader";
import AlarmList from "@/components/organism/alarm/AlarmList";
import { cookies } from "next/headers";
import { getUserAlarmData } from "@/apis/getUserAlarmData";

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const data = await getUserAlarmData(authorization, uuid);

  return (
    <main>
      <BackHeader title="알림" />
      <div style={{ padding: "3%", paddingTop: "12vh" }}>
        {data.map((notification: any) => (
          <AlarmList
            key={notification.alarmTime}
            eventType={notification.eventType}
            alarmUrl="url"
            message={notification.message}
            alarmTime={notification.alarmTime}
            id={notification.id}
            authorization={authorization}
            uuid={uuid}
          />
        ))}
      </div>
    </main>
  );
}
