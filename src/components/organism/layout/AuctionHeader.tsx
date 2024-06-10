"use client";

import styles from "@/styles/layout/header.module.scss";
import SearchWithAlarm from "@/components/molecules/SearchWithAlarm";
import SliderWithCategory from "@/components/molecules/SliderWithCategory";
import { usePathname } from "next/navigation";
import BoardCategory from "@/components/molecules/BoardCategory";
import SearchInAuction from "@/components/molecules/SearchInAuction";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import imageData from "@/constants/bannerDataDark";
export default function AuctionHeader() {
  const pathName = usePathname();
  console.log("pathNmae", pathName);
  return (
    <header className={styles["auction-header-layout "]}>
      <div className={styles["main-header-container"]}>
        <SearchInAuction />
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
