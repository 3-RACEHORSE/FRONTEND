import IconWithTitle from "@/components/molecules/IconWithTitle";
import ProfileWithTextEvent from "@/components/molecules/ProfileWithTextEvent";
import BackHeader from "@/components/organism/layout/BackHeader";
import Footer from "@/components/organism/layout/Footer";
import ResumeEdit from "@/components/organism/resume/ResumeEdit";
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
  // console.log(data);
  return (
    <main>
      <BackHeader title="마이페이지 / 경럭·자격 관리" />
      <ResumeEdit authorization={authorization} uuid={uuid} />
      <IconWithTitle
        title="🔗CAREER"
        detail="사용자님 경력 정보입니다.(터치하며 삭제)"
      />
      {data.resumeInfo.map(
        (
          item: { job: string; year: any; month: any },
          index: Key | null | undefined
        ) => (
          <ProfileWithTextEvent
            key={index}
            title={item.job}
            info1={`${item.year}년 ${item.month}개월`}
            authorization={authorization}
            uuid={uuid}
            type="career"
          />
        )
      )}
      <IconWithTitle
        title="🔗CERTIFICATE"
        detail="사용자님 자격 정보입니다..(터치하며 삭제)"
      />
      {data.certificationInfo.map(
        (
          item: { certification_name: string; issue_date: any; agency: any },
          index: Key | null | undefined
        ) => (
          <ProfileWithTextEvent
            key={index}
            title={item.certification_name}
            info1={item.agency}
            info2={item.issue_date}
            authorization={authorization}
            uuid={uuid}
            type="qualification"
          />
        )
      )}
      <Footer />
    </main>
  );
}
