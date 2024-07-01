import fetchMock from "jest-fetch-mock";
import { getSearchTextData } from "../apis/getSearchTextData";
import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

fetchMock.enableMocks();

describe("getSearchTextData", () => {
  const mockAuthorization = "testAuthorizationToken";
  const mockUuid = "testUuid";
  const mockSearchText = "testSearch";

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it("should fetch search text data successfully", async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn((name: string) => {
        if (name === "authorization") return { value: mockAuthorization };
        if (name === "uuid") return { value: mockUuid };
        return undefined;
      }),
    });

    const mockResponseData = { result: [{ id: 1, title: "Test Auction" }] };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const data = await getSearchTextData(mockSearchText);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search-title?data=${mockSearchText}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${mockAuthorization}`,
          uuid: mockUuid,
        },
      }
    );

    expect(data).toEqual(mockResponseData.result);
  });
});
