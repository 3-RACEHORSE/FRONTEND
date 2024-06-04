import BoardDetail from "@/components/organism/boardDetail/BoardDetail";
import BoardDetailBar from "@/components/organism/layout/BoardDetailBar";
import BoardDetailInfo from "@/components/organism/boardDetail/BoardDetailInfo";
import Footer from "@/components/organism/layout/Footer";
import { combineImg } from "@/utils/detail/combineImg";
import { getDetailListData } from "@/utils/detail/handleDetailListData";
import { cookies } from "next/headers";
import { auth } from "@/auth";

export default async function Page(props: any) {
  const pathName = props.params.id;

  //남은 쿠키 있을수도 있으니 삭제 요망
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getDetailListData(pathName, authorization, uuid);
  console.log("pathName", pathName, "받은 데이터", data);

  const session = await auth();
  let isSession;

  if (session) {
    isSession = true;
  } else {
    isSession = false;
  }

  return (
    <main>
      <BoardDetail
        title="마감시간"
        detail="마감시간 이후, 최고 금액의 입찰자와 매칭이 됩니다."
        endTime={data.readOnlyAuction.endedAt}
        category={`${data.readOnlyAuction.category} / 최소 경매가`}
        price={data.readOnlyAuction.minimumBiddingPrice}
        boardTitle={data.readOnlyAuction.title}
        boardContent={data.readOnlyAuction.content}
        imageData={combineImg(data.thumbnail, data.images)}
      />
      <BoardDetailInfo />
      <Footer />
      {/* <BoardDetailBar
        subscribed={data.subscribed}
        isSession={isSession}
        auctionUuid={pathName}
      /> */}
    </main>
  );
}
