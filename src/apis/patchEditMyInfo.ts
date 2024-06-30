import Swal from "sweetalert2";

export const patchEditMyInfo = async (
  authorization: string,
  uuid: string,
  inputNameValue: string,
  inputValueOne: string,
  src: any,
  router: any
) => {
  console.log(authorization, uuid, inputNameValue, inputValueOne, src);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/users/modify`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          name: inputNameValue,
          phoneNum: inputValueOne,
          profileImage: src,
        }),
      }
    );
    if (res.status === 200) {
      Swal.fire({
        title: "추가되었습니다!",
        icon: "success",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/mypage");
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
