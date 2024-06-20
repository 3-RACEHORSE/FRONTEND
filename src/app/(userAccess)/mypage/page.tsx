import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUserPofileData() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  console.log(authorization, uuid);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/users/myprofile`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`, // Add Bearer if needed
        uuid: `${uuid}`,
      },
    }
  );
  console.log(res.status);
  if (res.status === 401 || res.status === 500) {
    // 이후 에러코드 401로 수정 필요
    console.log("토큰없");
    redirect("https://fe-meetplus.vercel.app/login");
  }
  if (!res.ok) {
    // throw new Error("Network Error");
    redirect("https://fe-meetplus.vercel.app/login");
  }
  const data = await res.json();
  return data;
}

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getUserPofileData();
  console.log("마이페이지에서 불러오는", authorization, uuid, data);

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
      {/* <MypageProfile
        src="/dummy/myprofile.jpg"
        name="조윤찬"
        email="whdbscks77@gmail.com"
        phoneNum="01040503913"
      /> */}
      <Footer />
      <NavBar />
    </main>
  );
}
