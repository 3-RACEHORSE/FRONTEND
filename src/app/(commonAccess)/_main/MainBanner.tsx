"use client";

import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import bannerData from "@/constants/bannerData";
import bannerDataDark from "@/constants/bannerDataDark";
import { useDarkMode } from "@/hooks/common/checkDarkMode";
import styles from "@/styles/main/main.module.scss"; // Import the SCSS module

function MainBanner() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
  };

  //다크모드
  const [currentBannerData, setCurrentBannerData] = useState(bannerData);

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
          {currentBannerData.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <img src={image.url} alt={image.alt} className={styles.image} />
              <div className={styles.textContainer}>
                <div className={styles.status}>진행중</div>
                <h2 className={styles.title}>
                  광안리 바다 보며 아이유와 펩시 마시기!
                </h2>
                <p className={styles.date}>2024.6.9 오후 2시</p>
                <button className={styles.button}> 지금 참여하기 &gt;</button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default MainBanner;
