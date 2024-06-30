import getinfluencerUuidReviewData from "@/apis/getInfluencerUuidReviewData";
import { getProfileInfoData } from "@/apis/getProfileInfoData";
import ModalProfile from "@/app/(commonAccess)/detail/[id]/_component/ModalProfile";
import { cookies } from "next/headers";

export default async function Page(props: any) {
  const pathName = props.params.id;
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const data1 = await getProfileInfoData(pathName, authorization);
  const data2 = await getinfluencerUuidReviewData(
    authorization,
    uuid,
    pathName
  );

  console.log(data1);
  console.log(data2);

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
