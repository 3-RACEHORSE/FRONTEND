export function combineImg(thumbnail: string, images: string[]) {
  const allImages = [thumbnail, ...images];
  return allImages.map((url, index) => ({
    alt: `image${index + 1}`,
    url: url,
    index: index + 1,
  }));
}
