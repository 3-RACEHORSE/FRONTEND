import Image from "next/image";
import { auth } from "@/auth"; // auth 추가
import Header from "@/components/organism/layout/Header";
import NavBar from "@/components/organism/layout/NavBar";
import MainBanner from "@/app/(commonAccess)/_main/MainBanner";

export default async function Home() {
  const session = await auth(); // session 호출 추가
  console.log(session);

  const imageData = [
    { src: "/images/navbar/homeBtn.png", description: "Home Button" },
    { src: "/images/navbar/actionBtn.png", description: "Action Button" },
    { src: "/images/navbar/homeBtn.png", description: "Home Button" },
    { src: "/images/navbar/actionBtn.png", description: "Action Button" },
    { src: "/images/navbar/homeBtn.png", description: "Home Button" },
    { src: "/images/navbar/actionBtn.png", description: "Action Button" },
    { src: "/images/navbar/actionBtn.png", description: "Action Button" },
  ];
  return (
    <main>
      <Header />
      <MainBanner />

      <NavBar />
    </main>
  );
}
