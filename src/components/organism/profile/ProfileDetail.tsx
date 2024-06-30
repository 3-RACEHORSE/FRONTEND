import IconWithTitle from "@/components/molecules/IconWithTitle";
import ProfileWithText from "@/components/molecules/ProfileWithText";

interface Review {
  reviewWriterName: any;
  influencerName: any;
  reviewRate: any;
  reviewContent: any;
}

interface ProfileDetailProps {
  review?: Review[];
}

export default function ProfileDetail({ review }: ProfileDetailProps) {
  console.log("최종적으로 받은", review);

  return (
    <>
      <IconWithTitle title="🔗REVIEW" detail="출연진 리뷰 정보입니다." />
      {review &&
        review.map((item, index) => (
          <ProfileWithText
            key={index}
            title={item.reviewWriterName}
            info1={item.reviewContent}
            info2={`⭐⭐⭐⭐⭐`.slice(0, item.reviewRate + 1)}
          />
        ))}
    </>
  );
}
