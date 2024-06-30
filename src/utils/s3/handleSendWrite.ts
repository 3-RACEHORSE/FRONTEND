import Swal from "sweetalert2";

export const handleSendWrite = async (
  title: string,
  content: string,
  category: string,
  minPrice: string,
  thumbnail: string | null,
  imagesList: (string | null)[],
  authorization: string,
  uuid: string,
  router: any
) => {
  console.log(
    title,
    content,
    category,
    minPrice,
    thumbnail,
    imagesList,
    authorization,
    uuid,
    router
  );

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/authorization/auction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          category: category,
          minimumBiddingPrice: minPrice,
          thumbnail: thumbnail,
          images: imagesList,
        }),
      }
    );
    if (res.status === 200) {
      Swal.fire({
        title: "추가되었습니다!",
        icon: "success",
        confirmButtonText: "확인",
      });
      // .then((result) => {
      //   if (result.isConfirmed) {
      //     router.push("/auction/all");
      //   }
      // });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
