import { useEffect, useState } from "react";

const useMessageCarousel = (
  messages: string | any[],
  intervalTime: number | undefined
) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [messages, intervalTime]);

  return messages[currentMessageIndex];
};

export default useMessageCarousel;
