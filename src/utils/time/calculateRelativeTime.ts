export const calculateRelativeTime = (utcTime: string) => {
  const now = new Date();
  const utcDate = new Date(utcTime);
  const diffMilliseconds = now.getTime() - utcDate.getTime();
  console.log(now.getTime(), utcDate.getTime());
  const diffSeconds = Math.abs(diffMilliseconds) / 1000;
  const resultTime = diffSeconds - 32400;
  const days = Math.floor(resultTime / 86400);
  const hours = Math.floor(resultTime / 3600) % 24;
  const minutes = Math.floor(resultTime / 60) % 60;

  if (days > 0) {
    if (days === 1) {
      return `1일전`;
    } else {
      return `${days}일전`;
    }
  } else if (hours > 0) {
    return `${hours}시간전`;
  } else {
    if (minutes === 0) {
      return "지금";
    }
    return `${minutes} 분전`;
  }
};
