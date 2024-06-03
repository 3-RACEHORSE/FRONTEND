import BoardDetail from "@/components/organism/boardDetail/BoardDetail";
import BoardDetailBar from "@/components/organism/layout/BoardDetailBar";
import BoardDetailInfo from "@/components/organism/boardDetail/BoardDetailInfo";
import Footer from "@/components/organism/layout/Footer";

interface DetailProps {
  pathName?: any; // 토큰
}

export async function getDetailInfoData(pathName: DetailProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/${pathName}`
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

export default async function Page(props: any) {
  const pathName = props.params.id;
  const data = await getDetailInfoData(pathName);
  console.log("pathName", pathName, "받은 데이터", data);

  const category = `${data.readOnlyAuction.category} / 최소 경매가`;

  //이미지 합치기
  const allImages = [data.thumbnail, ...data.images];

  // imageData 배열 생성
  const imageData = allImages.map((url, index) => ({
    alt: `image${index + 1}`,
    url: url,
    index: index + 1,
  }));

  console.log(imageData);

  return (
    <main>
      <BoardDetail
        title="마감시간"
        detail="마감시간 이후, 최고 금액의 입찰자와 매칭이 됩니다."
        detailDate="9999.99.99"
        deadLine="7"
        category={category}
        price={data.readOnlyAuction.minimumBiddingPrice}
        boardTitle={data.readOnlyAuction.title}
        boardContent={data.readOnlyAuction.content}
        imageData={imageData}
      />
      <BoardDetailInfo />
      <Footer />
      <BoardDetailBar />
    </main>
  );
}
