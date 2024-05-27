import Swal from "sweetalert2";

export const handleEditMyInfo = async (
  authorization: string,
  uuid: string,
  inputNameValue: string,
  inputHandleValue: string,
  inputValueOne: string,
  router: any
) => {
  console.log(
    authorization,
    uuid,
    inputNameValue,
    inputHandleValue,
    inputValueOne
  );
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/modify`,
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
          handle: inputHandleValue,
          profileImage: "https://ifh.cc/g/Vv1lrR.png", // 추후 변경 필요
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
          // router.refresh();
          router.push("/mypage");
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
