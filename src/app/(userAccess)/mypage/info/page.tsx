import MyPageUserInfo from "@/components/organism/info/MyPageUserInfo";
import BackHeader from "@/components/organism/layout/BackHeader";
import Footer from "@/components/organism/layout/Footer";
import { cookies } from "next/headers";
import { Key } from "react";

async function getUserPofileData() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  console.log(authorization, uuid);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/myprofile`,
    {
      headers: {
        authorization: `Bearer ${authorization}`, // Add Bearer if needed
        uuid: `${uuid}`,
      },
    }
  );
  console.log(res.status);
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getUserPofileData();
  console.log(data);

  return (
    <main>
      <BackHeader title="마이페이지 / 회원정보 관리" />
      <MyPageUserInfo
        src={data.profileImage}
        name={data.name}
        handle={data.handle}
        phoneNum={data.phoneNum}
        authorization={authorization}
        uuid={uuid}
      />
      <Footer />
    </main>
  );
}
