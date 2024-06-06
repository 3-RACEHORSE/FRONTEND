export async function getProfileBoardData(handle: any) {
  console.log(decodeURIComponent(handle));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/history?handle=${handle}`
  );

  const data = await res.json();
  return data;
}
