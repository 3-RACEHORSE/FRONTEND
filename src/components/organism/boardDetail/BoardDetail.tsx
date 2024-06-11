import "react-responsive-carousel/lib/styles/carousel.min.css";
import BoardDetailInfoWithText from "@/components/molecules/BoardDetailInfoWithText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface BoardDetailProps {
  title: string;
  detail?: string;
  auctionStartTime?: string;
  category?: string;
  cast?: string;
  versifier?: string;
  unit?: string;
  boardTitle?: string;
  boardContent?: string;
  eventStartTime?: string;
  place: string;
  imageData?: Array<{
    alt: string;
    url: string;
    index: number;
  }>;
}

export default function BoardDetail({
  title,
  detail,
  auctionStartTime,
  category,
  cast,
  versifier,
  unit,
  boardTitle,
  eventStartTime,
  place,
  boardContent,
  imageData = [],
}: BoardDetailProps) {
  return (
    <>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: imageData.length }).map((_, index) => (
            <CarouselItem key={index}>
              <img
                src={imageData[index].url}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <BoardDetailInfoWithText
        title={title}
        detail={detail}
        auctionStartTime={auctionStartTime}
        category={category}
        cast={cast}
        versifier={versifier}
        unit={unit}
        boardTitle={boardTitle}
        boardContent={boardContent}
        eventStartTime={eventStartTime}
        place={place}
      />
    </>
  );
}
