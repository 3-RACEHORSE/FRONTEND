export interface BoardDetailProps {
  auctionStartTime?: any;
  category?: string;
  cast?: string;
  versifier?: string;
  unit?: string;
  boardTitle?: string;
  boardContent?: string;
  eventStartTime?: string;
  place: string;
  imageData?: Array<{
    alt: string;
    url: string;
    index: number;
  }>;
  state: string;
}
