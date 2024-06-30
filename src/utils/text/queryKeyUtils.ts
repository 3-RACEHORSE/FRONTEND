export const getQueryKey = (pathName: string): (string | undefined)[] => {
  let queryKey: (string | undefined)[] = ["object"];
  let keyword: string | undefined;

  if (pathName === "/auction/progress") {
    queryKey = ["object"];
  } else if (pathName.startsWith("/auction/")) {
    keyword = pathName.replace("/auction/", "");
    queryKey = ["object", keyword];
  }

  return queryKey;
};
