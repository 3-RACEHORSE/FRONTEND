import styles from "@/styles/organism/profileDetail.module.scss";
interface ProfileTextProps {
  title: string;
  info1: string;
  info2?: string;
}

export default function ProfileWithText({
  title,
  info1,
  info2,
}: ProfileTextProps) {
  return (
    <>
      <div className={styles["detail-layout"]}>
        <div className={styles["detail-conatiner"]}>
          <h4 className={styles["detail-conatiner-e1"]}>{title}</h4>
          <div className={styles["detail-conatiner-e2"]}>
            <p>{info1}</p>
            <p>{info2}</p>
          </div>
        </div>
      </div>
    </>
  );
}
