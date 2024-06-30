import fetchMock from "jest-fetch-mock";
import { getAuctionInfo } from "../apis/getAuctionInfo";

fetchMock.enableMocks();

describe("getAuctionInfo", () => {
  const mockPathName = "testPath";
  const mockAuthorization = "testAuthorizationToken";
  const mockUuid = "testUuid";

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it("경매 상세 조회 api", async () => {
    const mockResponseData = { id: 1, name: "Test Auction" };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const data = await getAuctionInfo(
      mockPathName,
      mockAuthorization,
      mockUuid
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/${mockPathName}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${mockAuthorization}`,
          uuid: `${mockUuid}`,
        },
      }
    );

    expect(data).toEqual(mockResponseData);
  });

  it("경매 상세 조회 api - 네트워크 에러", async () => {
    fetchMock.mockReject(new Error("Network error"));

    await expect(
      getAuctionInfo(mockPathName, mockAuthorization, mockUuid)
    ).rejects.toThrow("Network error");

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/${mockPathName}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${mockAuthorization}`,
          uuid: `${mockUuid}`,
        },
      }
    );
  });
});
