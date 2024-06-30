// handleJoin.ts
import Swal from "sweetalert2";

export const postSubmitJoin = async (
  snsId: string,
  snsType: string,
  email: string,
  name: string,
  inputValueOne: string,
  router: any
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snsId: snsId,
          snsType: snsType,
          email: email,
          name: name,
          phoneNum: inputValueOne,
          // interestCategories: apple,
        }),
      }
    );

    if (res.status === 200) {
      console.log("회원가입 완료");
      Swal.fire({
        title: "회원가입을 축하드립니다!",
        icon: "success",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  } catch (error) {
    console.error("API 통신 오류:", error);
  }
};
