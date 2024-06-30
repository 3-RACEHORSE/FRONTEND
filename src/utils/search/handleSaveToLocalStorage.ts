import { useRouter } from "next/navigation";

export const handleSaveToLocalStorage = (
  searchText: string,
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>,
  router: ReturnType<typeof useRouter>
) => {
  const storedSearchHistory: string | null =
    localStorage.getItem("searchHistory");
  const previousSearchHistory: string[] = storedSearchHistory
    ? JSON.parse(storedSearchHistory)
    : [];

  const newSearchHistory: string[] = [searchText, ...previousSearchHistory];

  setSearchHistory(newSearchHistory);

  localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));

  router.push(`/auction/search${searchText}`);
};
