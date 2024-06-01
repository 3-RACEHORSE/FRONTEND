import { useState, useEffect } from "react";

export const useDarkMode = (): boolean => {
  console.log("다크모드");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      return savedMode === "dark";
    } else {
      return document.body.getAttribute("data-theme") === "dark";
    }
  });

  useEffect(() => {
    const currentTheme = isDarkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", currentTheme);
    localStorage.setItem("mode", currentTheme);
  }, [isDarkMode]);

  useEffect(() => {
    const handleDarkModeChange = () => {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      setIsDarkMode(isDark);
    };

    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
};
