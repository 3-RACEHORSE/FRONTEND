"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useLoginValidation = (email: string, snsType: string, snsId: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleLoginValid = async () => {
    console.log(email, snsType, snsId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/auth/login`,
        {
          method: "POST",
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

        router.push("/");
      } else if (res.status === 201) {
        console.log("회원가입이 필요한 사람");
        setLoading(false);
      }
    } catch (error) {
      console.error("API 통신 오류:", error);
    }
  };

  useEffect(() => {
    handleLoginValid();
  }, [email, snsType, snsId]);

  return loading; // Return the loading state
};

export default useLoginValidation;
