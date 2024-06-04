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
  endTime?: string;
  category?: string;
  price?: string;
  boardTitle?: string;
  boardContent?: string;
  imageData?: Array<{
    alt: string;
    url: string;
    index: number;
  }>;
}

export default function BoardDetail({
  title,
  detail,
  endTime,
  category,
  price,
  boardTitle,
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
        endTime={endTime}
        category={category}
        price={price}
        boardTitle={boardTitle}
        boardContent={boardContent}
      />
    </>
  );
}
