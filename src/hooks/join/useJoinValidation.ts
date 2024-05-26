"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useLoginValidation = (email: string, snsType: string, snsId: string) => {
  const router = useRouter();

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
        console.log("반환 헤더2", res);

        // const access_token: any = res?.headers.get("Authorization");
        // const uuid: any = res?.headers.get("Uuid");
        // console.log(access_token, uuid);
        // Cookies.set("access_token", access_token);
        // Cookies.set("uuid", uuid);

        router.push("/");
      } else if (res.status === 201) {
        console.log("회원가입이 필요한 사람");
      }
    } catch (error) {
      console.error("API 통신 오류:", error);
    }
  };

  useEffect(() => {
    handleLoginValid();
  }, [email, snsType, snsId]);
};

export default useLoginValidation;
