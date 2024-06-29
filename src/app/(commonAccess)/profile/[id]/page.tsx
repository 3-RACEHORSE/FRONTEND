import Footer from "@/components/organism/layout/Footer";
import ProfileInfo from "@/components/organism/profile/ProfileInfo";
import ProfileDetail from "@/components/organism/profile/ProfileDetail";
import SimpleBoardObject from "@/components/organism/main/SimpleBoardObject";
import { getProfileInfoData } from "@/utils/profile/handleProfileInfoData";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { getProfileBoardData } from "@/utils/profile/handleProfileBoardData";
import Link from "next/link";
import styles from "@/styles/main/main.module.scss";

export default async function Page(props: any) {
  const pathName = props.params.id;

  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const data1 = await getProfileInfoData(pathName, authorization, uuid);

  // console.log("fsdaf");
  // const data2 = await getProfileBoardData(pathName);

  // console.log(data2);

  // console.log("상세데이터", data1);
  return (
    <main className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        {/* <ProfileInfo
          name="아이유"
          src="https://wimg.mk.co.kr/meet/neds/2021/03/image_readtop_2021_291080_16167514554588643.jpg"
          handle={pathName}
          // authorization={authorization}
          // uuid={uuid}
          follow={true}
          authorization={undefined}
          uuid={undefined}
        />
        <ProfileDetail /> */}
      </div>
      {/* <ProfileInfo
        name={data1.handle}
        src={data1.profileImage}
        categories={data1.watchList}
        handle={pathName}
        authorization={authorization}
        uuid={uuid}
        type={session ? "server" : "client"}
        follow={data1.subscribed}
      /> */}

      {/* <div className="flex flex-col justify-center w-full h-200">
        <ul className="flex overflow-x-auto">
          {data2.map((item: any, index: number) => (
            <Link
              href={`/detail/${item.auctionUuid}`}
              key={item.auctionUuid}
              className={styles["flexBox"]}
            >
              <SimpleBoardObject
                // key={index}
                category={item.category}
                title={item.title}
                content={item.content}
                src={item.thumbnail}
                minPrice={item.minimumBiddingPrice}
              />
            </Link>
          ))}
        </ul>
      </div> */}
      {/* <Footer /> */}
    </main>
  );
}
