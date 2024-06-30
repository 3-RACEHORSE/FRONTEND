export interface BoardProps {
  authorization?: any; // 토큰
  uuid?: any; //유유아이디
  isSession?: boolean; // 로그인 되어있는지의 여부
  src?: string;
  status?: string;
  title: string;
  detail?: string;
  category?: string;
  startPrice?: string;
  auctionStartDate?: string;
  eventStartDate?: string;
  incrementUnit?: any;
  auctionUuid?: string;
  isSubscribed?: boolean; // 구독되어있는지의 여부
  place?: string;
  innerRef?: React.Ref<HTMLParagraphElement>;
}
