"use client";

import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { useDarkMode } from "@/hooks/common/checkDarkMode";
import styles from "@/styles/main/main.module.scss"; // Import the SCSS module
import Link from "next/link";

interface BannerItem {
  auctionUuid: string;
  title: string;
  eventStartTime: number;
  state: string;
  thumbnail: string;
}

interface MainBannerProps {
  data?: BannerItem[];
}

// Assuming you can update bannerData to the correct structure
const bannerData: BannerItem[] = [
  {
    auctionUuid: "default-uuid-1",
    title: "Default Title 1",
    eventStartTime: Date.now(),
    state: "BEFORE_AUCTION",
    thumbnail: "https://example.com/default1.jpg",
  },
];

function MainBanner({ data }: MainBannerProps) {
  // console.log(data);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentBannerData, setCurrentBannerData] =
    useState<BannerItem[]>(bannerData);

  const handleChange = (index: number): void => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (data) {
      setCurrentBannerData(data);
    }
  }, [data]);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()} ${date.getHours()}시`;
  };

  return (
    <div className={styles.container}>
      {/* 내부 이미지 */}
      <div className={styles.innerImage}>
        <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          swipeable={true}
          selectedItem={currentIndex}
          onChange={handleChange}
          showIndicators={false}
          showStatus={false}
        >
          {currentBannerData.map((item, index) => (
            <div key={index} className={styles.imageContainer}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className={styles.image}
              />
              <div className={styles.textContainer}>
                <div className={styles.status}>
                  {item.state === "AUCTION_IS_IN_PROGRESS" ? "진행중" : "예정"}
                </div>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.date}>
                  행사시작 {formatDate(item.eventStartTime)}
                </p>
                {item.state === "AUCTION_IS_IN_PROGRESS" && (
                  <Link href={`/auctionProgress/${item.auctionUuid}`}>
                    <button className={styles.button}>
                      {" "}
                      지금 참여하기 &gt;
                    </button>
                  </Link>
                )}
                {item.state !== "AUCTION_IS_IN_PROGRESS" && (
                  <button className={styles.button}> 경매 예정⌛</button>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default MainBanner;
