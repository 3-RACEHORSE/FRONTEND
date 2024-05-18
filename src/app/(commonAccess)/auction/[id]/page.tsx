import Image from "next/image";
import styles from "@/styles/auction/auction.module.scss";
import Header from "@/components/organism/layout/Header";
import NavBar from "@/components/organism/layout/NavBar";
import BoardObject from "@/components/organism/auction/BoardObject";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Header />
      <Link href="/detail/1">
        <BoardObject
          src="/dummy/profile.jpg"
          title="G사 CTO 멘토링"
          detail="시니어 경력 17년차 프론트엔드 개발자..."
          category="세무·법무·노무"
          minPrice="✅최소 9,999"
          startDate="9999.99.99"
          endDate="9999.99.99"
        />
      </Link>
      <BoardObject
        src="/dummy/profile.jpg"
        title="G사 CTO 멘토링"
        detail="시니어 경력 17년차 프론트엔드 개발자..."
        category="세무·법무·노무"
        minPrice="✅최소 9,999"
        startDate="9999.99.99"
        endDate="9999.99.99"
      />
      <BoardObject
        src="/dummy/profile.jpg"
        title="G사 CTO 멘토링"
        detail="시니어 경력 17년차 프론트엔드 개발자..."
        category="세무·법무·노무"
        minPrice="✅최소 9,999"
        startDate="9999.99.99"
        endDate="9999.99.99"
      />
      <BoardObject
        src="/dummy/profile.jpg"
        title="G사 CTO 멘토링"
        detail="시니어 경력 17년차 프론트엔드 개발자..."
        category="세무·법무·노무"
        minPrice="✅최소 9,999"
        startDate="9999.99.99"
        endDate="9999.99.99"
      />
      <BoardObject
        src="/dummy/profile.jpg"
        title="G사 CTO 멘토링"
        detail="시니어 경력 17년차 프론트엔드 개발자..."
        category="세무·법무·노무"
        minPrice="✅최소 9,999"
        startDate="9999.99.99"
        endDate="9999.99.99"
      />
      <NavBar />
    </main>
  );
}
