export const getCheckSubscription = async (
  authorization: any,
  uuid: any,
  influencerUuid: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/subscription/influencer/${influencerUuid}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }
};
