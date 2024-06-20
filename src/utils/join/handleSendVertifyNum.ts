import Swal from "sweetalert2";

export const handleSendVertifyNum = async (
  phoneNum: string,
  verificationCode: string,
  setCheckValid2: (value: boolean) => void,
  checkValid2: boolean
) => {
  console.log(verificationCode);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/auth/sms/verify`,
      {
        method: "POST", // 또는 "POST" 등 필요한 메서드로 변경
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNum: phoneNum,
          verificationCode: verificationCode,
        }),
      }
    );

    if (res.status === 200) {
      Swal.fire({
        title: "승인 되었습니다!",
        icon: "success",
        confirmButtonText: "확인",
      });
      setCheckValid2(!checkValid2);
    } else if (res.status === 400) {
      Swal.fire({
        title: "다시 작성해주세요!",
        icon: "warning",
        confirmButtonText: "확인",
      });
    }
  } catch (error) {
    console.error("API 통신 오류:", error);
  }
};
