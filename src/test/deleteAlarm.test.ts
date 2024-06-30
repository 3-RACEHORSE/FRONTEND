import { deleteAlarm } from "../apis/deleteAlarm";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("deleteAlarm", () => {
  const mockId = "testId";
  const mockAuthorization = "testAuthorizationToken";
  const mockUuid = "testUuid";

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it("알림 삭제 api", async () => {
    fetchMock.mockResponseOnce("", { status: 200 });

    await deleteAlarm(mockId, mockAuthorization, mockUuid);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/notification-service/api/v1/alarm/delete/${mockId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${mockAuthorization}`,
          uuid: `${mockUuid}`,
        },
      }
    );
  });
});
