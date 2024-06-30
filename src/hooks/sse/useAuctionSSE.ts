import { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { AuctionRoundInfo } from "@/interface/AuctionProgressInfo";
import { useRouter } from "next/navigation";

const useAuctionSSE = (
  authorization: string,
  pathName: string
): [AuctionRoundInfo, boolean] => {
  const router = useRouter();

  const [roundInfo, setRoundInfo] = useState<AuctionRoundInfo>({
    round: 0,
    roundEndTime: "",
    leftNumberOfParticipants: 0,
    price: 0,
    isActive: true,
  });

  const [connected, setConnected] = useState(false);
  const eventSource = useRef<null | EventSource>(null);

  useEffect(() => {
    const fetchSSE = () => {
      eventSource.current = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/auction-page/${pathName}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        }
      );

      eventSource.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.round === null) {
          console.log("데이터가 null입니다. 재연결 시도 중...");
          eventSource.current?.close();
          fetchSSE();
          console.log("연결됨");
          return;
        }

        console.log(data);

        setRoundInfo({
          round: data.round,
          roundEndTime: data.roundEndTime,
          leftNumberOfParticipants: data.leftNumberOfParticipants,
          price: data.price,
          isActive: data.isActive,
        });

        //경매 마감
        if (data.endStatus) {
          router.push(`/paymentStay/${pathName}`);
        }
      };

      eventSource.current.onerror = async () => {
        console.log("에러");
        eventSource.current?.close();
        setTimeout(fetchSSE, 3000);
      };

      eventSource.current.onopen = (event) => {
        console.log("연결 성공:", event);
        setConnected(true);
      };
    };

    fetchSSE();
    return () => {
      eventSource.current?.close();
    };
  }, [authorization, pathName, router]);

  return [roundInfo, connected];
};

export default useAuctionSSE;
