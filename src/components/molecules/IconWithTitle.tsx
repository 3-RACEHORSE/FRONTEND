import BoardTitleText from "../atoms/Text/BoardTitleText";
import ImageTag from "@/components/atoms/etc/ImageTag";
import styles from "@/styles/atoms/boardTitleText.module.scss";

interface IconWithTextnProps {
  title: string;
  src?: string;
  detail?: string;
}

export default function IconWithTextOne({
  title,
  src,
  detail,
}: IconWithTextnProps) {
  return (
    <>
      <div className={styles["container"]}>
        <BoardTitleText title={title} />
        <ImageTag src={src} />
      </div>
      <div className={styles["detail"]}>{detail}</div>
    </>
  );
}
