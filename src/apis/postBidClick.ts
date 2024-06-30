import confetti from "canvas-confetti";

const postBidClick = async (
  authorization: string,
  uuid: string,
  pathName: string,
  roundInfo: { round: number; price: number }
): Promise<void> => {
  confetti({
    particleCount: 150,
    spread: 60,
  });

  setTimeout(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/bidding`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          auctionUuid: pathName,
          biddingPrice: roundInfo.price,
          round: roundInfo.round,
        }),
      }
    );

    const data = await response.json();
    if (!data) {
      alert("이미 입찰 했습니다");
    }
  }, 1500);
};

export default postBidClick;
