import IconWithTitle from "@/components/molecules/IconWithTitle";
import ProfileWithText from "@/components/molecules/ProfileWithText";
import BackHeader from "@/components/organism/layout/BackHeader";
import ResumeEdit from "@/components/organism/resume/ResumeEdit";
import { cookies } from "next/headers";

export default function Page() {
  // const authorization = cookies().get("authorization");
  // const uuid = cookies().get("uuid");

  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  return (
    <main>
      <BackHeader title="마이페이지 / 경럭·자격 관리" />
      <ResumeEdit authorization={authorization} uuid={uuid} />
      <IconWithTitle
        title="🔗CAREER"
        detail="사용자님 경력 정보입니다.(터치하며 삭제)"
      />
      <ProfileWithText title="전기배선사" info1="5년5개월" />
      <IconWithTitle
        title="🔗CERTIFICATE"
        detail="사용자님 자격 정보입니다..(터치하며 삭제)"
      />
      <ProfileWithText
        title="전기기사"
        info1="한국안전공사"
        info2="9999.99.99"
      />
    </main>
  );
}
