import BoardTitleText from "@/components/atoms/Text/BoardTitleText";
import Gap from "@/components/atoms/etc/Gap";
import BackHeader from "@/components/organism/layout/BackHeader";
import styles from "@/styles/organism/resumeEdit.module.scss";
import { Switch } from "@/components/ui/switch";
export default function ResumeEdit() {
  return (
    <main>
      <div className={styles["resume-container"]}>
        <div className={styles["resume-title"]}>
          <div style={{ width: "44px", height: "15px" }}></div>
          <div
            style={{ color: "#d4d4d4", fontSize: "15px", fontWeight: "bold" }}
          >
            경력
          </div>
          {/* <Switch checked={isBookmarked} onClick={handleToggle} /> */}
          <Switch />
        </div>
        <p className={styles["input-title"]}>경력추가</p>
        <input
          className={styles["input"]}
          type="text"
          //   value={value}
          //   onChange={onChange}
        />
        <p className={styles["input-title"]} style={{ marginTop: "15px" }}>
          기간
        </p>
        <input
          className={styles["input"]}
          type="text"
          //   value={value}
          //   onChange={onChange}
        />
        <button className={styles["btn1"]} style={{ marginTop: "15px" }}>
          추가
        </button>
      </div>
    </main>
  );
}
