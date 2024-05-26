export async function getMainStatistic() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/statistic`,
    {
      next: { revalidate: 86400 },
    }
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

export async function getMainHotActionList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/hot-auction`
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

export async function getMainHighBiddingList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/high-bidding-statistics`
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}

export async function getMainSameCategoryList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/category-hot-auction`
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}
