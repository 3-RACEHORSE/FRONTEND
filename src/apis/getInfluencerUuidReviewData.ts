export default async function getinfluencerUuidReviewData(
  authorization: any,
  uuid: any,
  pathName: any
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/review/influencer/${pathName}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );
  console.log(res.status);

  const data = await res.json();
  return data;
}
