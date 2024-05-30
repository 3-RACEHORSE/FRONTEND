export interface boardObject {
  authorization?: any; // 토큰
  uuid?: any; //유유아이디
  isSession: boolean; // 로그인 되어있는지의 여부
  endedAt: string | undefined;
  createdAt: string | undefined;
  minimumBiddingPrice: string | undefined;
  category: string | undefined;
  thumbnail: string | undefined;
  auctionUuid: string;
  title: string;
  content: string;
  isSubscribed: boolean;
}
