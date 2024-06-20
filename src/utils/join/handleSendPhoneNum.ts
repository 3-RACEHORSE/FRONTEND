import Swal from "sweetalert2";

export const handleSendPhoneNum = async (
  inputValueOne: string,
  setCheckValid1: (value: boolean) => void,
  checkValid1: boolean
) => {
  console.log(inputValueOne);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/auth/sms/certify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNum: inputValueOne,
        }),
      }
    );

    if (res.status === 200) {
      console.log("전화 인증 완료");
      Swal.fire({
        title: "문자를 확인해주세요!",
        icon: "success",
        confirmButtonText: "확인",
      });
      setCheckValid1(!checkValid1);
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
