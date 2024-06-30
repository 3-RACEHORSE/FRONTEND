import AWS from "aws-sdk";

// AWS SDK 설정
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY!,
  region: "ap-northeast-2",
});

const s3 = new AWS.S3();

export const uploadImageToS3 = async (
  croppedCanvas: HTMLCanvasElement
): Promise<string> => {
  try {
    // 이미지 데이터를 base64로 인코딩
    const base64Data = croppedCanvas
      .toDataURL()
      .replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(base64Data, "base64");
    // S3에 업로드할 때 사용할 설정
    const params = {
      Bucket: "cheonma",
      Key: `images/${Date.now()}.png`, // 이미지 파일 이름 설정
      Body: buf,
      ACL: "public-read", // 업로드된 이미지를 공개적으로 접근할 수 있도록 설정
      ContentType: "image/png", // 이미지 파일 타입 지정
    };

    // S3에 이미지 업로드 요청
    const { Location } = await s3.upload(params).promise();

    // 업로드된 이미지의 URL 반환
    return Location;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};
