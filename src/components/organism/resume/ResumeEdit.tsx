"use client";

import { useState } from "react";
import styles from "@/styles/organism/resumeEdit.module.scss";
import { Switch } from "@/components/ui/switch";
import IconWithTitle from "@/components/molecules/IconWithTitle";
import ProfileWithText from "@/components/molecules/ProfileWithText";
import ResumeWithInputOne from "@/components/molecules/ResumeWithInputOne";

export default function ResumeEdit() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [career1, setCareer1] = useState<string>("");
  const [career2, setCareer2] = useState<string>("");

  const [certify1, setCertify1] = useState<string>("");
  const [certify2, setCertify2] = useState<string>("");
  const [certify3, setCertify3] = useState<string>("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  //경력 input
  const handleCareerChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareer1(event.target.value);
    console.log(career1);
  };
  const handleCareerChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareer2(event.target.value);
    console.log(career2);
  };

  //자격 input
  const handleCertifyChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertify1(event.target.value);
    console.log(certify1);
  };
  const handleCertifyChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertify2(event.target.value);
    console.log(certify2);
  };
  const handleCertifyChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertify3(event.target.value);
    console.log(certify3);
  };

  //경력 보내는 api함수
  const handleSendCareer = async () => {
    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/signup`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }),
    //     }
    //   );
    //   const data = await res.json();
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  //경력 보내는 api함수
  const handleSendCertify = async () => {};

  return (
    <main>
      <div className={styles["resume-container"]}>
        {!toggle && (
          <>
            <div className={styles["resume-title"]}>
              <div style={{ width: "44px", height: "15px" }}></div>
              <div className={styles["resume-title-content"]}>경력</div>
              <Switch checked={toggle} onClick={handleToggle} />
            </div>
            <ResumeWithInputOne
              title="경력추가"
              onChange={handleCareerChange1}
            />
            <ResumeWithInputOne
              title="기간"
              onChange={handleCareerChange2}
              style={{ marginTop: "15px" }}
            />

            <button className={styles["btn1"]} onClick={handleSendCareer}>
              추가
            </button>
          </>
        )}
        {toggle && (
          <>
            <div className={styles["resume-title"]}>
              <div style={{ width: "44px", height: "15px" }}></div>
              <div className={styles["resume-title-content"]}>자격</div>
              <Switch checked={toggle} onClick={handleToggle} />
            </div>
            <ResumeWithInputOne
              title="자격증명"
              onChange={handleCertifyChange1}
            />
            <ResumeWithInputOne
              title="발급기관"
              onChange={handleCertifyChange2}
              style={{ marginTop: "15px" }}
            />
            <ResumeWithInputOne
              title="취득일"
              onChange={handleCertifyChange3}
              style={{ marginTop: "15px" }}
            />
            <button className={styles["btn1"]} onClick={handleSendCertify}>
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
