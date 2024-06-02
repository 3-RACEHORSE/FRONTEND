import { renderHook } from "@testing-library/react";
import Cookies from "js-cookie";
import { useDarkMode } from "../hooks/common/checkDarkMode";

jest.mock("js-cookie");

describe("useDarkMode", () => {
  beforeEach(() => {
    Cookies.get = jest.fn();
    Cookies.set = jest.fn();
    document.body.setAttribute("data-theme", "");
  });

  it("쿠키에 dark모드로 저장되어 있으면, dark모드로", () => {
    (Cookies.get as jest.Mock).mockReturnValue("dark");

    const { result } = renderHook(() => useDarkMode());

    expect(result.current).toBe(true);
    expect(document.body.getAttribute("data-theme")).toBe("dark");
  });

  it("쿠키에 아무것도 없다면, 시작은, light모드로", () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useDarkMode());

    expect(result.current).toBe(false);
    expect(document.body.getAttribute("data-theme")).toBe("light");
  });

  it("쿠키에 light모드로 저장되어 있으면, light모드로", () => {
    (Cookies.get as jest.Mock).mockReturnValue("light");

    const { result } = renderHook(() => useDarkMode());

    expect(result.current).toBe(false);
    expect(document.body.getAttribute("data-theme")).toBe("light");
  });
});
