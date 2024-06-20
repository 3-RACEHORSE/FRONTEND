import fetchMock from "jest-fetch-mock";
import Swal from "sweetalert2";
import { handleJoin } from "../utils/join/handleJoin";

fetchMock.enableMocks();

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe("회원가입 api 함수", () => {
  const routerMock = { push: jest.fn() };

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test("회원가입 성공 시", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    await handleJoin(
      "googleId",
      "google",
      "google.@gmail.com",
      "MrGoogle",
      "010-1234-5678",
      [{ 0: "관심목록1" }, { 1: "관심목록2" }],
      routerMock
    );

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snsId: "googleId",
          snsType: "google",
          email: "google.@gmail.com",
          name: "MrGoogle",
          phoneNum: "010-1234-5678",
          interestCategories: [{ 0: "관심목록1" }, { 1: "관심목록2" }],
        }),
      }
    );
    expect(Swal.fire).toHaveBeenCalledWith({
      title: "회원가입을 축하드립니다!",
      icon: "success",
      confirmButtonText: "확인",
    });
    expect(routerMock.push).toHaveBeenCalledWith("/login");
  });
});
