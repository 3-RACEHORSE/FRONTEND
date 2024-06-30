export const removePrefix = (url: string, prefix: string): string => {
  if (url.startsWith(prefix)) {
    return url.slice(prefix.length);
  }
  return url;
};

export const decodeUrl = (encodedUrl: string): string =>
  decodeURIComponent(encodedUrl);

export const modifyAndDecodeUrl = (url: string): string => {
  let modifiedUrl: string;

  if (url.startsWith("/auction/local")) {
    modifiedUrl = removePrefix(url, "/auction/local");
  } else if (url.startsWith("/auction/search")) {
    modifiedUrl = removePrefix(url, "/auction/search");
  } else {
    modifiedUrl = url;
  }
  return decodeUrl(modifiedUrl);
};
