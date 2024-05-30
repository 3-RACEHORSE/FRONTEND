import {
  getMainStatistic,
  getMainHotActionList,
  getMainHighBiddingList,
  getMainSameCategoryList,
} from "../utils/main/handleMainListData";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("메인 api 함수", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  test("메인페이지 통계함수 - getMainStatistic", async () => {
    const mockData = {};
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await getMainStatistic();

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/statistic`,
      {
        next: { revalidate: 86400 },
      }
    );
  });

  test("핫 게시글 함수 - getMainHotActionList", async () => {
    const mockData = {};
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await getMainHotActionList();

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/hot-auction`
    );
  });

  test("가장 높은 입찰률 함수 - getMainHighBiddingList", async () => {
    const mockData = {};
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await getMainHighBiddingList();

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/high-bidding-statistics`
    );
  });

  test("하나의 뜨는 카테고리 함수 - getMainSameCategoryList", async () => {
    const mockData = {};
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await getMainSameCategoryList();

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/category-hot-auction`
    );
  });
});
