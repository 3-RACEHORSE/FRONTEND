// getAuctionListData.test.ts
import fetchMock from "jest-fetch-mock";
import { getAuctionListData } from "../apis/getAuctionListData";

fetchMock.enableMocks();

describe("getAuctionListData", () => {
  const mockPathName1 = "/auction/progress";
  const mockPathName2 = "/auction/schedule";
  const mockPathName3 = "/auction/end";
  const mockPathName4 = "/auction/local";
  const mockPathName5 = "/rest";

  const mockDecodedString = "decodedString";
  const mockAuthorization = "testAuthorizationToken";
  const mockUuid = "testUuid";
  const mockPageParam = 1;

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it("RQ 데이터 패칭 - AUCTION_IS_IN_PROGRESS", async () => {
    const mockResponseData = {
      auctionPostDtos: [{ id: 1, title: "Test Auction" }],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const data = await getAuctionListData({
      pathName: mockPathName1,
      decodedString: mockDecodedString,
      authorization: mockAuthorization,
      uuid: mockUuid,
      pageParam: mockPageParam,
    });

    const expectedUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/state?state=AUCTION_IS_IN_PROGRESS&page=${mockPageParam}`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: mockAuthorization,
        uuid: mockUuid,
      },
    });

    expect(data).toEqual(mockResponseData.auctionPostDtos);
  });

  it("RQ 데이터 패칭 - BEFORE_AUCTION", async () => {
    const mockResponseData = {
      auctionPostDtos: [{ id: 1, title: "Test Auction" }],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const data = await getAuctionListData({
      pathName: mockPathName2,
      decodedString: mockDecodedString,
      authorization: mockAuthorization,
      uuid: mockUuid,
      pageParam: mockPageParam,
    });

    const expectedUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/state?state=BEFORE_AUCTION&page=${mockPageParam}`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: mockAuthorization,
        uuid: mockUuid,
      },
    });

    expect(data).toEqual(mockResponseData.auctionPostDtos);
  });

  it("RQ 데이터 패칭 - AUCTION_NORMAL_CLOSING", async () => {
    const mockResponseData = {
      auctionPostDtos: [{ id: 1, title: "Test Auction" }],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const data = await getAuctionListData({
      pathName: mockPathName3,
      decodedString: mockDecodedString,
      authorization: mockAuthorization,
      uuid: mockUuid,
      pageParam: mockPageParam,
    });

    const expectedUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/state?state=AUCTION_NORMAL_CLOSING&page=${mockPageParam}`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: mockAuthorization,
        uuid: mockUuid,
      },
    });

    expect(data).toEqual(mockResponseData.auctionPostDtos);
  });

  it("RQ 데이터 패칭 - local", async () => {
    const mockResponseData = {
      auctionPostDtos: [{ id: 1, title: "Test Auction" }],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const data = await getAuctionListData({
      pathName: mockPathName4,
      decodedString: mockDecodedString,
      authorization: mockAuthorization,
      uuid: mockUuid,
      pageParam: mockPageParam,
    });

    const expectedUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/local?localName=${mockDecodedString}&page=${mockPageParam}`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: mockAuthorization,
        uuid: mockUuid,
      },
    });

    expect(data).toEqual(mockResponseData.auctionPostDtos);
  });

  it("RQ 데이터 패칭 - search", async () => {
    const mockResponseData = {
      auctionPostDtos: [{ id: 1, title: "Test Auction" }],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const data = await getAuctionListData({
      pathName: mockPathName5,
      decodedString: mockDecodedString,
      authorization: mockAuthorization,
      uuid: mockUuid,
      pageParam: mockPageParam,
    });

    const expectedUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/searchList?searchContent=${mockDecodedString}&page=${mockPageParam}`;

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: mockAuthorization,
        uuid: mockUuid,
      },
    });

    expect(data).toEqual(mockResponseData.auctionPostDtos);
  });
});
