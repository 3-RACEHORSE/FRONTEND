import BackHeader from "@/components/organism/layout/BackHeader";
import ResumeEdit from "@/components/organism/resume/ResumeEdit";

export default function Page() {
  return (
    <main>
      <BackHeader title="마이페이지 / 경럭·자격 관리" />
      <ResumeEdit />
    </main>
  );
}
