import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useDarkMode = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = Cookies.get("mode");
    return savedMode === "dark";
  });

  useEffect(() => {
    const handleDarkModeChange = () => {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      setIsDarkMode(isDark);
      Cookies.set("mode", isDark ? "dark" : "light");
    };

    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const currentTheme = isDarkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", currentTheme);
  }, [isDarkMode]);

  return isDarkMode;
};
