"use server";

import { auth } from "@/auth";
import Swal from "sweetalert2";
import { cookies } from "next/headers";

interface toggleValidProps {
  auctionUuid?: string;
}

export async function toggleValid(auctionUuid: toggleValidProps) {
  const session = await auth();
  if (!session) {
    return console.log("세선없음");
  }

  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  // console.log(auctionUuid, authorization, uuid);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/subscription/auction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          auctionUuid: auctionUuid.auctionUuid,
        }),
      }
    );

    if (res.ok) {
      console.log("성공");
    }
    if (res.status === 200) {
      console.log("성공");
      Swal.fire({
        title: "등록되었습니다!",
        icon: "success",
        confirmButtonText: "확인",
      });
      // .then((result) => {
      //   if (result.isConfirmed) {
      //     router.push("/auction/all");
      //   }
      // });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
