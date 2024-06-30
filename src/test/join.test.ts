// handleJoin.test.ts
import { postSubmitJoin } from "../apis/postSubmitJoin";
import fetchMock from "jest-fetch-mock";
import Swal from "sweetalert2";

fetchMock.enableMocks();

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe("postSubmitJoin", () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it("should successfully sign up and redirect to login page", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    await postSubmitJoin(
      "testSnsId",
      "testSnsType",
      "test@example.com",
      "testName",
      "1234567890",
      mockRouter
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snsId: "testSnsId",
          snsType: "testSnsType",
          email: "test@example.com",
          name: "testName",
          phoneNum: "1234567890",
        }),
      }
    );

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "회원가입을 축하드립니다!",
      icon: "success",
      confirmButtonText: "확인",
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });
});
