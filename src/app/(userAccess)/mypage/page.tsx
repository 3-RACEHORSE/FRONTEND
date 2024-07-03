import { getUserProfileData } from "@/apis/getUserProfileData";
import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import { cookies } from "next/headers";

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getUserProfileData(authorization, uuid);

  return (
    <main>
      <TextHeader title="마이페이지" />
      <MypageProfile
        authorization={authorization}
        uuid={uuid}
        src={data.profileImage}
        name={data.name}
        email={data.email}
        phoneNum={data.phoneNum}
      />
      <Footer />
      <NavBar />
    </main>
  );
}
