import BoardDetail from "@/components/organism/boardDetail/BoardDetail";
import BoardDetailBar from "@/components/organism/layout/BoardDetailBar";
import BoardDetailInfo from "@/components/organism/boardDetail/BoardDetailInfo";
import Footer from "@/components/organism/layout/Footer";
import { combineImg } from "@/utils/detail/combineImg";
import { getDetailListData } from "@/utils/detail/handleDetailListData";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { sessionValid } from "@/utils/session/sessionValid";

export default async function Page(props: any) {
  const pathName = props.params.id;

  const session = await auth();
  let isSession = false;
  let authorization;
  let uuid;

  if (session) {
    isSession = true;
    authorization = cookies().get("authorization")?.value;
    uuid = cookies().get("uuid")?.value;
  }

  // const data = await getDetailListData(session, pathName, authorization, uuid);
  // console.log("pathName", pathName, "받은 데이터", data);

  return (
    <main>
      {/* <BoardDetail
        title="마감시간"
        detail="마감시간 이후, 최고 금액의 입찰자와 매칭이 됩니다."
        endTime={data.readOnlyAuction.endedAt}
        category={`${data.readOnlyAuction.category} / 최소 경매가`}
        price={data.readOnlyAuction.minimumBiddingPrice}
        boardTitle={data.readOnlyAuction.title}
        boardContent={data.readOnlyAuction.content}
        imageData={combineImg(data.thumbnail, data.images)}
      /> */}
      <BoardDetail
        title="경매시작 시간"
        detail="시작시간이 되면, 경매가 진행됩니다."
        endTime="999999"
        category={`출연진 / 시작가 / 단위가`}
        cast="아이유"
        versifier="100000"
        unit="50000"
        boardTitle="광안리 바다 보며 아이유와 펩시 마시기!"
        boardContent="광안리 근처 카페에서, 소규모 팬미팅을 진행합니다♥️ 또한, 취준생을 위해 기부예정이니 서로 함께 화이팅해요!"
        place="부산 수영구 광안리 롤뺑드파리 2층 3번째 좌석"
        imageData={[
          {
            alt: "image2",
            url: "/images/bannerDark/bannerD2.png",
            index: 2,
          },
          {
            alt: "image2",
            url: "/images/bannerDark/bannerD2.png",
            index: 2,
          },
        ]}
      />
      <BoardDetailInfo />
      <Footer />
      {/* <BoardDetailBar
        subscribed={data.subscribed}
        isSession={isSession}
        auctionUuid={pathName}
        handle={data.handle}
        sellerUuid={data.readOnlyAuction.sellerUuid}
      /> */}
    </main>
  );
}
