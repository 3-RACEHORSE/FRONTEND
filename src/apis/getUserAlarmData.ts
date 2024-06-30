export async function getUserAlarmData(authorization: any, uuid: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/notification-service/api/v1/alarm/notifications`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data.notificationDtoList;
}
