import Image from "next/image";
import { auth } from "@/auth"; // auth 추가

export default async function Home() {
  const session = await auth(); // session 호출 추가
  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
