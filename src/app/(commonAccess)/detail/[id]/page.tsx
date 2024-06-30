import BoardDetail from "@/components/organism/boardDetail/BoardDetail";
import BoardDetailBar from "@/components/organism/layout/BoardDetailBar";
import Footer from "@/components/organism/layout/Footer";
import { cookies } from "next/headers";
import BoardDetailNotice from "@/components/organism/boardDetail/BoardDetailNotice";
import { getDetailListData } from "@/apis/getDetailListData";

export default async function Page(props: any) {
  const pathName = props.params.id;

  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getDetailListData(pathName, authorization, uuid);

  const imageData = data.images.map((url: string, index: number) => ({
    alt: `image${index + 1}`,
    url,
    index,
  }));

  console.log(data.influencerUuid);
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
        imageData={imageData}
        state={data.state}
      />
      <BoardDetailNotice />
      <Footer />

      <BoardDetailBar
        auctionStartTime={data.auctionStartTime}
        state={data.state}
        pathName={pathName}
        influencerUuid={data.influencerUuid}
      />
    </main>
  );
}
