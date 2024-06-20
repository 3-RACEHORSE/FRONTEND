// "use client";

import styles from "@/styles/organism/search.module.scss";
import watchListData from "@/constants/watchListData";
import Link from "next/link";

export default function RecommendSearch() {
  return (
    <div>
      <div style={{ padding: "3%" }}>
        <h2 style={{ fontSize: "13px", fontWeight: "bold" }}>지역</h2>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {watchListData.map((keyword, index) => (
            <div
              key={index}
              style={{
                // paddingLeft: "3%",
                // paddingTop: "2%",
                padding: "3%",
                width: "fit-content",
                whiteSpace: "nowrap",
              }}
            >
              <Link href={`/auction/local${keyword.label}`}>
                <div className={styles["keywordStyle"]}>{keyword.label}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
