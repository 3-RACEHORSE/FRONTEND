"use client";

import styles from "@/styles/layout/header.module.scss";
import { usePathname } from "next/navigation";
import BoardCategory from "@/components/molecules/BoardCategory";
import SearchInAuction from "@/components/molecules/SearchInAuction";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import imageData from "@/constants/bannerDataDark";
import AlarmConnect from "@/components/organism/alarm/AlarmConnect";

export default function AuctionHeader() {
  return (
    <header className={styles["auction-header-layout "]}>
      <div className={styles["main-header-container"]}>
        <AlarmConnect />
      </div>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: imageData.length }).map((_, index) => (
            <CarouselItem key={index}>
              <img
                src={imageData[index].url}
                style={{ width: "100%", height: "100%" }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <BoardCategory />
    </header>
  );
}
