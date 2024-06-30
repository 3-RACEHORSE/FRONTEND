import getinfluencerUuidReviewData from "@/apis/getInfluencerUuidReviewData";
import ModalProfile from "@/app/(commonAccess)/detail/[id]/_component/ModalProfile";
import { getProfileInfoData } from "@/utils/profile/handleProfileInfoData";
import { cookies } from "next/headers";

export default async function Page(props: any) {
  const pathName = props.params.id;
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const data1 = await getProfileInfoData(pathName, authorization, uuid);
  const data2 = await getinfluencerUuidReviewData(
    authorization,
    uuid,
    pathName
  );

  return (
    <ModalProfile
      name={data1.name}
      profileImage={data1.profileImage}
      birth={data1.birth}
      description={data1.description}
      authorization={authorization}
      uuid={uuid}
      influencerUuid={data1.influencerUuid}
      review={data2}
    />
  );
}
