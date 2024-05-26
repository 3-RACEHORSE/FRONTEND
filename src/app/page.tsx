import Image from "next/image";
// import { auth } from "@/auth"; // auth 추가
import Header from "@/components/organism/layout/Header";
import NavBar from "@/components/organism/layout/NavBar";
import MainBanner from "@/app/(commonAccess)/_main/MainBanner";
import MainArticle from "@/components/organism/layout/MainArticle";
import styles from "@/styles/main/main.module.scss";
import BoardTitle from "@/components/organism/main/BoardTitle";
import SimpleBoardObject from "@/components/organism/main/SimpleBoardObject";
import CategoryText from "@/components/atoms/Text/CategoryText";
import Footer from "@/components/organism/layout/Footer";
import { auth } from "@/auth";

async function getMainStatistic() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/statistic`,
    {
      next: { revalidate: 86400 },
    }
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

async function getMainHotActionList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/hot-auction`
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

async function getMainHighBiddingList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/high-bidding-statistics`
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

async function getMainSameCategoryList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/category-hot-auction`
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

export default async function Home() {
  // const session = await auth(); // session 호출 추가
  // console.log(session);
  const data1 = await getMainStatistic();
  const data2 = await getMainHotActionList();
  const data3 = await getMainHighBiddingList();
  const data4 = await getMainSameCategoryList();

  return (
    <main>
      <Header />
      <MainBanner />
      <MainArticle data={data1} />
      <div className={styles["infoBar"]}>
        <div className={styles["infoText"]}>경매 통계(금일)</div>
        <div className={styles["detailLink"]}>상세보기</div>
      </div>

      {/* 스크롤1  */}
      <BoardTitle
        title="HOT 경매글 📢"
        detail="지금 가장 인기있는 경매글을 찾아보세요!"
      />

      <div className="flex flex-col justify-center w-full h-200">
        <ul className="flex overflow-x-auto">
          {data2.map((item: any) => (
            <SimpleBoardObject
              key={item.auctionUuid}
              category={item.category}
              title={item.title}
              content={item.content}
              src={item.thumbnail}
              minPrice={item.minimumBiddingPrice.toLocaleString()}
            />
          ))}
        </ul>
      </div>

      {/* 스크롤2  */}
      <BoardTitle
        title="높은 입찰가 경매글 📢"
        detail="전체 경매에서 TOP10을 확인하세요!"
      />
      <div className="flex flex-col justify-center w-full h-200">
        <ul className="flex overflow-x-auto">
          {data3.map((item: any) => (
            <SimpleBoardObject
              key={item.auctionUuid}
              category={item.category}
              title={item.title}
              content={item.content}
              src={item.thumbnail}
              minPrice={item.minimumBiddingPrice.toLocaleString()}
            />
          ))}
        </ul>
      </div>

      {/* 스크롤2  */}
      <BoardTitle
        title="요즘 뜨는 분야 📢"
        detail="나도 오늘부터 개발자! 맥북 사러가자~"
      />
      <div className="flex flex-col justify-center w-full h-200">
        <ul className="flex overflow-x-auto">
          {data4.map((item: any) => (
            <SimpleBoardObject
              key={item.auctionUuid}
              category={item.category}
              title={item.title}
              content={item.content}
              src={item.thumbnail}
              minPrice={item.minimumBiddingPrice.toLocaleString()}
            />
          ))}
        </ul>
      </div>

      <Footer />
      <NavBar />
    </main>
  );
}
