import ModalProfile from "@/app/(commonAccess)/detail/[id]/_component/ModalProfile";
import { getProfileInfoData } from "@/utils/profile/handleProfileInfoData";
import { cookies } from "next/headers";

async function getinfluencerUuidReviewData(
  authorization: any,
  uuid: any,
  pathName: any
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/review/influencer/${pathName}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`, // Add Bearer if needed
        uuid: `${uuid}`,
      },
    }
  );
  console.log(res.status);

  const data = await res.json();
  return data;
}
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

  console.log(data1);
  console.log(data2);

  return (
    <>
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
    </>
  );
}
