import Footer from "@/components/organism/layout/Footer";
import ProfileInfo from "@/components/organism/profile/ProfileInfo";
import ProfileDetail from "@/components/organism/profile/ProfileDetail";
import SimpleBoardObject from "@/components/organism/main/SimpleBoardObject";
import { getProfileInfoData } from "@/utils/profile/handleProfileInfoData";

export default async function Page(props: any) {
  const pathName = props.params.id;

  const data1 = await getProfileInfoData(pathName);

  return (
    <main>
      <ProfileInfo
        name={data1.handle}
        src={data1.profileImage}
        categories={data1.watchList}
      />
      <ProfileDetail
        careerInfo={data1.careerInfo}
        qualificationInfo={data1.qualificationInfo}
      />
      <div className="flex flex-col justify-center w-full h-200">
        <ul className="flex overflow-x-auto">
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
        </ul>
      </div>
      <Footer />
    </main>
  );
}
