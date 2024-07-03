"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useLoginValidation = (email: string, snsType: string, snsId: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleLoginValid = async () => {
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
        router.push("/");
      } else if (res.status === 201) {
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
