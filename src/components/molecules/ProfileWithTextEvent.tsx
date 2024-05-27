"use client";

import styles from "@/styles/organism/profileDetail.module.scss";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface ProfileTextProps {
  title: string;
  info1: string;
  info2?: string;
  authorization: any;
  uuid: any;
  type: string;
}

export default function ProfileWithTextEvent({
  title,
  info1,
  info2,
  authorization,
  uuid,
  type,
}: ProfileTextProps) {
  const router = useRouter();

  const handleDeleteCareer = async () => {
    try {
      const endpoint = type === "career" ? "career" : "qualification";
      const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/${endpoint}`;
      const body = type === "career" ? { job: title } : { name: title };

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        Swal.fire({
          title: "삭제되었습니다!",
          icon: "success",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            router.refresh();
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className={styles["detail-layout"]} onClick={handleDeleteCareer}>
        <div className={styles["detail-conatiner"]}>
          <h4 className={styles["detail-conatiner-e1"]}>{title}</h4>
          <div className={styles["detail-conatiner-e2"]}>
            <p>{info1}</p>
            <p>{info2}</p>
          </div>
        </div>
      </div>
    </>
  );
}