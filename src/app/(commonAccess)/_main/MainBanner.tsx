"use client";

import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import bannerData from "@/constants/bannerData";

function MainBanner() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
  };

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
          {bannerData.map((image, index) => (
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
