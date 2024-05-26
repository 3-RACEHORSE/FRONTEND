"use client";

import { useState } from "react";
import styles from "@/styles/organism/resumeEdit.module.scss";
import { Switch } from "@/components/ui/switch";
import ResumeWithInputOne from "@/components/molecules/ResumeWithInputOne";
import ResumeWithInputTwo from "@/components/molecules/ResumeWithInputTwo";

interface authorizationProps {
  authorization: any;
  uuid: any;
}

export default function ResumeEdit({
  authorization,
  uuid,
}: authorizationProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [career1, setCareer1] = useState<string>("");
  const [career2, setCareer2] = useState<string>("");
  const [career3, setCareer3] = useState<string>("");

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
  const handleCareerChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareer3(event.target.value);
    console.log(career3);
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
    console.log(authorization, uuid);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/career`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authorization}`, // Add Bearer if needed
            uuid: `${uuid}`,
          },
          body: JSON.stringify({
            job: career1,
            year: career2,
            month: career3,
          }),
        }
      );
      //   const data = await res.json();
      //   console.log(data);
      console.log(res.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //자격 보내는 api함수
  const handleSendCertify = async () => {
    console.log(authorization, uuid);
    console.log(career1, career2, career3);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/qualification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
          body: JSON.stringify({
            name: certify1,
            issueDate: certify3,
            agency: certify2,
          }),
        }
      );
      console.log(res.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <ResumeWithInputTwo
              title="연 월"
              onChange1={handleCareerChange2}
              onChange2={handleCareerChange3}
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
    </main>
  );
}
