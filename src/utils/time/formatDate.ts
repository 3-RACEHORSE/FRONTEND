export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()} ${date.getHours()}시`;
};
