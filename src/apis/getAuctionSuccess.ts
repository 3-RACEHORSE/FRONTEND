export const getAuctionSuccess = async (
  authorization: any,
  auctionUuid: any,
  uuid: any,
  router: any
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/result/${auctionUuid}`,
    {
      headers: {
        Authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  if (data.bidder) {
    router.push(`/payment/${auctionUuid}`);
  } else {
    router.push("/");
  }

  return response.json();
};
