import BoardDetail from "@/components/organism/boardDetail/BoardDetail";
import BoardDetailBar from "@/components/organism/layout/BoardDetailBar";
import Footer from "@/components/organism/layout/Footer";
import { getDetailListData } from "@/utils/detail/handleDetailListData";
import { cookies } from "next/headers";
import BoardDetailNotice from "@/components/organism/boardDetail/BoardDetailNotice";

export default async function Page(props: any) {
  const pathName = props.params.id;

  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getDetailListData(pathName, authorization, uuid);
  console.log("pathName", pathName, "받은 데이터", data);
  console.log("문제상황", data.auctionStartTime);

  return (
    <main style={{ paddingTop: "12vh" }}>
      <BoardDetail
        auctionStartTime={data.auctionStartTime}
        category={`출연진 / 시작가 / 단위가`}
        cast={data.influencerName}
        versifier={data.startPrice}
        unit={data.incrementUnit}
        boardTitle={data.title}
        boardContent={data.content}
        eventStartTime={data.eventStartTime}
        place={`${data.localName} ${data.eventPlace}`}
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
        state={data.state}
      />
      <BoardDetailNotice />
      <Footer />

      <BoardDetailBar
        auctionStartTime={data.auctionStartTime}
        state={data.state}
      />
    </main>
  );
}
