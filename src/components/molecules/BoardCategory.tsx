"use client";

import React, { useState, ChangeEvent } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/molecules/boardCategory.module.scss";
import Link from "next/link";
import { truncateText } from "@/utils/common/truncateText";

export default function BoardCategory() {
  const pathName = usePathname();

  const removePrefix = (url: string, prefix: string): string => {
    if (url.startsWith(prefix)) {
      return url.slice(prefix.length);
    }
    return url;
  };

  const decodeUrl = (encodedUrl: string): string =>
    decodeURIComponent(encodedUrl);

  const modifyAndDecodeUrl = (url: string): string => {
    let modifiedUrl: string;

    // Check if url starts with "/auction/local"
    if (url.startsWith("/auction/local")) {
      modifiedUrl = removePrefix(url, "/auction/local");
    }
    // Check if url starts with "/auction/search"
    else if (url.startsWith("/auction/search")) {
      modifiedUrl = removePrefix(url, "/auction/search");
    }
    // Default case: return the original url if no matching prefix found
    else {
      modifiedUrl = url;
    }

    // Decode the modified URL
    return decodeUrl(modifiedUrl);
  };
  const decodedString: string = modifyAndDecodeUrl(pathName);

  return (
    <div className={styles["boardCategory-container"]}>
      <div className={styles["boardCategory-list"]}>
        {!pathName.startsWith("/auction/local") ||
          (!pathName.startsWith("/auction/search") && (
            <>
              <Link
                href="/auction/progress"
                className={styles["boardCategory-list-link"]}
              >
                {pathName === "/auction/progress" && (
                  <div className={styles["boardCategory-list-element"]}>
                    진행중
                  </div>
                )}
                {pathName !== "/auction/progress" && (
                  <div className={styles["boardCategory-list-element-invalid"]}>
                    진행중
                  </div>
                )}
              </Link>
              <Link
                href="/auction/schedule"
                className={styles["boardCategory-list-link"]}
              >
                {pathName === "/auction/schedule" && (
                  <div className={styles["boardCategory-list-element"]}>
                    예정
                  </div>
                )}
                {pathName !== "/auction/schedule" && (
                  <div className={styles["boardCategory-list-element-invalid"]}>
                    예정
                  </div>
                )}
              </Link>
              <Link
                href="/auction/end"
                className={styles["boardCategory-list-link"]}
              >
                {pathName === "/auction/end" && (
                  <div className={styles["boardCategory-list-element"]}>
                    마감
                  </div>
                )}
                {pathName !== "/auction/end" && (
                  <div className={styles["boardCategory-list-element-invalid"]}>
                    마감
                  </div>
                )}
              </Link>
            </>
          ))}
        {pathName.startsWith("/auction/local") && (
          <div className={styles["searchResult"]}>
            🔗 {decodedString} 검색결과
          </div>
        )}
        {pathName.startsWith("/auction/search") && (
          <div className={styles["searchResult"]}>
            🔗 {truncateText(decodedString, 6)} 검색결과
          </div>
        )}
      </div>
    </div>
  );
}
