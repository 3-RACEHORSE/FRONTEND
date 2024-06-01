"use client";

import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import bannerData from "@/constants/bannerData";
import bannerDataDark from "@/constants/bannerDataDark";
import { useDarkMode } from "@/hooks/common/checkDarkMode";

function MainBanner() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
  };

  //다크모드
  const [currentBannerData, setCurrentBannerData] = useState(bannerData);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      setCurrentBannerData(bannerDataDark);
    } else {
      setCurrentBannerData(bannerData);
    }
  }, [isDarkMode]);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* 내부 이미지 */}
      <div className="flex justify-center items-center " style={{ zIndex: 1 }}>
        <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          swipeable={true}
          selectedItem={currentIndex}
          onChange={handleChange}
          showIndicators={false}
        >
          {currentBannerData.map(
            (
              image,
              index // 추후 bannerDataToUse로 바꿔야함
            ) => (
              <div key={index} style={{ position: "relative" }}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={1000}
                  height={1000}
                />
              </div>
            )
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default MainBanner;
