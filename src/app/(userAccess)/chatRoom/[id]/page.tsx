import React, { useState, ChangeEvent } from "react";
import BoardInfo from "@/components/molecules/BoardInfo";
import styles from "@/styles/organism/boardObject.module.scss";
import { cookies } from "next/headers";
import { useParams } from "next/navigation";
export default async function Page() {
  const pathName = useParams();
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  return <>채팅방</>;
}
