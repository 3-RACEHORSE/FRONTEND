import Image from "next/image";

import BoardDetail from "@/components/organism/boardDetail/BoardDetail";
import BoardDetailBar from "@/components/organism/layout/BoardDetailBar";
import BoardDetailInfo from "@/components/organism/boardDetail/BoardDetailInfo";
import Footer from "@/components/organism/layout/Footer";

export default function Page() {
  return (
    <main>
      <BoardDetail />
      <BoardDetailInfo />
      <Footer />
      <BoardDetailBar />
    </main>
  );
}
