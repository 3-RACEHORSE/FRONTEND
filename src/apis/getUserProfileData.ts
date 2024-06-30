import { redirect } from "next/navigation";

export async function getUserProfileData(authorization: any, uuid: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/users/myprofile`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );
  if (res.status === 401 || res.status === 500) {
    // 이후 에러코드 401로 수정 필요
    redirect("https://fe-meetplus.vercel.app/login");
  }
  if (!res.ok) {
    redirect("https://fe-meetplus.vercel.app/login");
  }
  const data = await res.json();
  return data;
}
