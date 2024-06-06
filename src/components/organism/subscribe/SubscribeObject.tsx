import Image from "next/image";
import styles from "@/styles/subscribe/subscribe.module.scss";

interface SubscribeProps {
  src: any;
  name?: string;
}

export default function SubscribeObject({ src, name }: SubscribeProps) {
  return (
    <div className={styles["flexBox"]}>
      <div className={styles["element-container"]}>
        <img className={styles["element-img"]} src={src} alt="" />
        <p>{name}</p>
      </div>
    </div>
  );
}
