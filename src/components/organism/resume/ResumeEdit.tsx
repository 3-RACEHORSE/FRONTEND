"use client";

import { useState } from "react";
import styles from "@/styles/organism/resumeEdit.module.scss";
import { Switch } from "@/components/ui/switch";
import IconWithTitle from "@/components/molecules/IconWithTitle";
import ProfileWithText from "@/components/molecules/ProfileWithText";
export default function ResumeEdit() {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <main>
      <div className={styles["resume-container"]}>
        {!toggle && (
          <>
            <div className={styles["resume-title"]}>
              <div style={{ width: "44px", height: "15px" }}></div>
              <div
                style={{
                  color: "#d4d4d4",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                경력
              </div>
              {/* <Switch checked={isBookmarked} onClick={handleToggle} /> */}
              <Switch checked={toggle} onClick={handleToggle} />
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
          </>
        )}
        {toggle && (
          <>
            <div className={styles["resume-title"]}>
              <div style={{ width: "44px", height: "15px" }}></div>
              <div
                style={{
                  color: "#d4d4d4",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                자격
              </div>
              {/* <Switch checked={isBookmarked} onClick={handleToggle} /> */}
              <Switch checked={toggle} onClick={handleToggle} />
            </div>
            <p className={styles["input-title"]}>자격추가</p>
            <input
              className={styles["input"]}
              type="text"
              //   value={value}
              //   onChange={onChange}
            />
            <p className={styles["input-title"]} style={{ marginTop: "15px" }}>
              발급기관
            </p>
            <input
              className={styles["input"]}
              type="text"
              //   value={value}
              //   onChange={onChange}
            />
            <p className={styles["input-title"]} style={{ marginTop: "15px" }}>
              취득일
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
          </>
        )}
      </div>

      <IconWithTitle
        title="🔗CAREER"
        detail="사용자님 경력 정보입니다.(터치하며 삭제)"
      />
      <ProfileWithText title="전기배선사" info1="5년5개월" />
      <IconWithTitle
        title="🔗CERTIFICATE"
        detail="사용자님 자격 정보입니다..(터치하며 삭제)"
      />
      <ProfileWithText
        title="전기기사"
        info1="한국안전공사"
        info2="9999.99.99"
      />
    </main>
  );
}
