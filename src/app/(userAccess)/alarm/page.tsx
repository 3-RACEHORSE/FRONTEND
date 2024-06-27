import DataFetcher from "@/components/organism/join/JoinInfoOne";
import BackHeader from "@/components/organism/layout/BackHeader";
import styles from "@/styles/organism/chat.module.scss";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import NavBar from "@/components/organism/layout/NavBar";
import Header from "@/components/organism/layout/Header";
import ChatHeader from "@/components/organism/layout/ChatHeader";
import ChatList from "@/components/organism/chat/ChatList";
import Link from "next/link";
import { redirect } from "next/navigation";
import AlarmList from "@/components/organism/alarm/AlarmList";

export default async function Page() {
  return (
    <main>
      <BackHeader title="" />
      <AlarmList />
    </main>
  );
}
