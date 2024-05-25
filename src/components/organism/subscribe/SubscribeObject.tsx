import Image from "next/image";
import styles from "@/styles/subscribe/subscribe.module.scss";

interface SubscribeProps {
  src: string;
  name?: string;
}

export default function SubscribeObject({ src, name }: SubscribeProps) {
  return (
    <div className={styles["flexBox"]}>
      <div className={styles["element-container"]}>
        <Image
          src={src}
          alt=""
          width={100}
          height={100}
          style={{
            borderRadius: "100px",
            border: "2px solid #52ebb6",
            marginLeft: "3%",
          }}
        />
        <p>{name}</p>
      </div>
    </div>
  );
}
