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

  const session = await auth();
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const data1 = await getProfileInfoData(
    pathName,
    session,
    authorization,
    uuid
  );

  const data2 = await getProfileBoardData(pathName);

  return (
    <main>
      <ProfileInfo
        name={data1.handle}
        src={data1.profileImage}
        categories={data1.watchList}
        handle={pathName}
        authorization={authorization}
        uuid={uuid}
        type={session ? "server" : "client"}
        follow={data1.subscribed}
      />
      <ProfileDetail
        careerInfo={data1.careerInfo}
        qualificationInfo={data1.qualificationInfo}
      />
      <div className="flex flex-col justify-center w-full h-200">
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
      </div>
      <Footer />
    </main>
  );
}
