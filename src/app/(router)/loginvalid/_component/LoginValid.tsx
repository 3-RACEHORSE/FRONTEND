"use client";
import React, { useEffect } from "react";

interface LoginValidProps {
  email: string;
  snsType: string;
  snsId: string;
}

export default function LoginValid({ email, snsType, snsId }: LoginValidProps) {
  console.log(email, snsType, snsId, "입니다.");

  const handleLoginValid = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/login`,
        {
          method: "POST", // 또는 "POST" 등 필요한 메서드로 변경
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            snsType: snsType,
            snsId: snsId,
          }),
        }
      );
      if (res.status === 200) {
        console.log("회원가입된 사람");
      }

      if (res.status === 404) {
        console.log("존재안함");
      }
    } catch (error) {
      console.error("API 통신 오류:", error);
      return false;
    }
  };

  useEffect(() => {
    handleLoginValid();
  }, []);

  return <>라우터</>;
}
