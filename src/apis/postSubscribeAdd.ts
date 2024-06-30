export const postSubscribeAdd = async (
  authorization: any,
  uuid: any,
  influencerUuid: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/subscription/influencer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
      body: JSON.stringify({
        influencerUuid: influencerUuid,
      }),
    }
  );
  if (res.ok) {
    return true;
  }
};
