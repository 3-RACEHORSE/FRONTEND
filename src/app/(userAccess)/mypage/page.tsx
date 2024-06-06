import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import getUserMypageData from "@/utils/mypage/handleGetUserMypageData";
import { cookies } from "next/headers";

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getUserMypageData(authorization, uuid);

  return (
    <main>
      <TextHeader title="마이페이지" />
      <MypageProfile
        src={data.profileImage}
        name={data.name}
        handle={data.handle}
        email={data.email}
        phoneNum={data.phoneNum}
        categories={data.watchList}
        authorization={authorization}
        uuid={uuid}
      />
      <Footer />
      <NavBar />
    </main>
  );
}
