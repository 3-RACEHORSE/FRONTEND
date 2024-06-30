export const handleChangeImgData = async (
  authorization: string,
  uuid: string,
  name: string,
  phoneNum: string,
  uploadedImageUrl: string
) => {
  console.log(
    "데이터 통신",
    authorization,
    uuid,
    name,
    phoneNum,
    uploadedImageUrl
  );
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
          name: name,
          phoneNum: phoneNum,
          profileImage: uploadedImageUrl,
        }),
      }
    );
    if (res.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
