"use client";

import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import bannerData from "@/constants/bannerData";
import bannerDataDark from "@/constants/bannerDataDark";

function MainBanner() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
  };

  //다크모드
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleDarkModeChange = () => {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      setIsDarkMode(isDark);
    };

    handleDarkModeChange();

    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const bannerDataToUse = isDarkMode ? bannerDataDark : bannerData;

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
          {bannerDataToUse.map((image, index) => (
            <div key={index} style={{ position: "relative" }}>
              <Image
                src={image.url}
                alt={image.alt}
                width={1000}
                height={1000}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default MainBanner;
