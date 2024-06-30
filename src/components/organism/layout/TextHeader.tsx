import styles from "@/styles/layout/header.module.scss";
import TitleText from "@/components/atoms/Text/TitleText";

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
          <TitleText title={title} />
        </div>
      </header>
    </>
  );
}
