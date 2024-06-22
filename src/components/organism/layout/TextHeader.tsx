import styles from "@/styles/layout/header.module.scss";
import TitleText from "@/components/atoms/Text/TitleText";
import Gap from "@/components/atoms/etc/Gap";

interface TextProps {
  title: string;
}

export default function TextHeader({ title }: TextProps) {
  return (
    <>
      <header className={styles["text-header-layout"]}>
        <div
          className={styles["text-header-container"]}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <header
        className={styles["header-main-container"]}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
          <TitleText title={title} />
          {/* </header> */}
        </div>
      </header>
    </>
  );
}
