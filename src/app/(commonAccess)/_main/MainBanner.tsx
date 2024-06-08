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
                <img
                  src={image.url}
                  alt={image.alt}
                  style={{
                    width: "100%",
                    height: "100vh",
                    objectFit: "cover",
                    filter: "brightness(0.4)", // Adjust the value to make the image darker
                  }}
                />
                <div
                  style={{
                    // background: "red",
                    position: "absolute",
                    bottom: "20vh",
                    left: 0,
                    width: "100%",
                    height: "30vh",
                    // background: "red",
                    paddingLeft: "3%",
                    paddingRight: "3%",
                  }}
                >
                  <div
                    style={{
                      background: "#F9BDEC",
                      borderRadius: "10px",
                      paddingLeft: "3%",
                      paddingRight: "3%",
                      paddingTop: "0.5%",
                      paddingBottom: "0.5%",
                      width: "fit-content",
                      fontSize: "14px",
                      color: "white",
                    }}
                  >
                    진행중
                  </div>
                  <h2
                    style={{
                      // background: "#F9BDEC",
                      borderRadius: "10px",
                      width: "100%",
                      fontSize: "27px",
                      color: "white",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    광안리 바다 보며 아이유와 펩시 마시기!
                  </h2>
                  <p
                    style={{
                      // background: "#F9BDEC",
                      borderRadius: "10px",
                      width: "100%",
                      fontSize: "17px",
                      color: "white",
                      textAlign: "left",
                      fontWeight: "bold",
                      marginTop: "2vh",
                    }}
                  >
                    2024.6.9 오후 2시
                  </p>
                  <button
                    style={{
                      // background: "#F9BDEC",
                      borderRadius: "10px",
                      width: "100%",
                      fontSize: "20px",
                      color: "white",
                      textAlign: "left",
                      fontWeight: "bold",
                      marginTop: "4vh",
                    }}
                  >
                    지금 참여하기 ▶
                  </button>
                </div>
              </div>
            )
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default MainBanner;
