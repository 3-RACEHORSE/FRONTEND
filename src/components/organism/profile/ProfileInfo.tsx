"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/profileInfo.module.scss";
import { getCheckSubscription } from "@/apis/getCheckSubscription";
import { postSubscribeAdd } from "@/apis/postSubscribeAdd";
import { patchSubscribeCancel } from "@/apis/patchSubscribeCancel";

interface ProfileInfoProps {
  name: string;
  src?: string;
  authorization: any;
  uuid: any;
  description?: any;
  birth?: any;
  influencerUuid?: any;
}
export default function ProfileInfo({
  name,
  src,
  authorization,
  uuid,
  description,
  birth,
  influencerUuid,
}: ProfileInfoProps) {
  //구독여부
  const [subscribe, setSubscribe] = useState<boolean>(false);

  //구독여부 조회
  useEffect(() => {
    const checkSubscription = async () => {
      const result = await getCheckSubscription(
        authorization,
        uuid,
        influencerUuid
      );
      setSubscribe(result);
    };

    checkSubscription();
  }, []);

  //팔로우 하기
  const handleSubscribeAdd = async () => {
    if (await postSubscribeAdd(authorization, uuid, influencerUuid)) {
      setSubscribe(true);
    }
  };

  //팔로우 취소
  const handleSubscribeCancel = async () => {
    if (await patchSubscribeCancel(authorization, uuid, influencerUuid)) {
      setSubscribe(false);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-img"]}>
        <img src={src} />
      </div>
      <div className={styles["profile-info"]}>
        <p className={styles["profile-info-name"]}> {name}</p>
        <p className={styles["profile-info-career"]}>
          🎉 {birth ? birth : "비공개"}
        </p>
        <p className={styles["profile-info-sns"]}>⭐ {description}</p>
        {subscribe && (
          <div
            className={styles["profile-follow-btn"]}
            onClick={handleSubscribeCancel}
          >
            팔로우 취소
          </div>
        )}
        {!subscribe && (
          <div
            className={styles["profile-follow-btn"]}
            onClick={handleSubscribeAdd}
          >
            팔로우
          </div>
        )}
      </div>
    </div>
  );
}
