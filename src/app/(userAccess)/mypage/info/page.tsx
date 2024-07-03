import { getUserProfileData } from "@/apis/getUserProfileData";
import MyPageUserInfo from "@/components/organism/info/MyPageUserInfo";
import BackHeader from "@/components/organism/layout/BackHeader";
import { cookies } from "next/headers";

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getUserProfileData(authorization, uuid);

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
    </main>
  );
}
