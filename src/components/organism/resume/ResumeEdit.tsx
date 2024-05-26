"use client";

import { useState } from "react";
import styles from "@/styles/organism/resumeEdit.module.scss";
import { Switch } from "@/components/ui/switch";
import ResumeWithInputOne from "@/components/molecules/ResumeWithInputOne";
import ResumeWithInputTwo from "@/components/molecules/ResumeWithInputTwo";
import useCareerState from "@/hooks/resumeEdit/useCareerState";
import useCertifyState from "@/hooks/resumeEdit/useCertifyState";
import {
  sendCareer,
  sendCertify,
} from "@/utils/resumeEdit/handleSendCareerAndCertify";
import { useRouter } from "next/navigation";

interface authorizationProps {
  authorization: any;
  uuid: any;
}

export default function ResumeEdit({
  authorization,
  uuid,
}: authorizationProps) {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // 경력 관련 커스텀 훅
  const {
    career1,
    career2,
    career3,
    handleCareerChange1,
    handleCareerChange2,
    handleCareerChange3,
  } = useCareerState();

  // 자격 관련 커스텀 훅
  const {
    certify1,
    certify2,
    certify3,
    handleCertifyChange1,
    handleCertifyChange2,
    handleCertifyChange3,
  } = useCertifyState();

  // 경력 보내는 API 함수
  const handleSendCareer = async () => {
    await sendCareer(authorization, uuid, career1, career2, career3, router);
  };

  // 자격 보내는 API 함수
  const handleSendCertify = async () => {
    await sendCertify(
      authorization,
      uuid,
      certify1,
      certify2,
      certify3,
      router
    );
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
