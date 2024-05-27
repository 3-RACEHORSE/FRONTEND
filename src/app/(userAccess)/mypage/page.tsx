import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import { cookies } from "next/headers";

async function getUserPofileData() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  console.log(authorization, uuid);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/myprofile`,
    {
      cache: "no-store",
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
      <TextHeader title="마이페이지" />
      <MypageProfile
        src={data.profileImage}
        name={data.name}
        handle={data.handle}
        email={data.email}
        phoneNum={data.phoneNum}
        categories={data.watchList}
      />
      <Footer />
      <NavBar />
    </main>
  );
}
