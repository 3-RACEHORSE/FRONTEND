// "use client";

import styles from "@/styles/organism/search.module.scss";

const recommendKeywords = [
  "디자인",
  "IT·프로그래밍",
  "영상·사진·음향",
  "마케팅",
  "번역·통역",
  "문서·글쓰기",
  "창업·사업",
  "세무·법무·노무",
  "취업·입시",
  "투잡·노하우",
  "직업역량 레슨",
  "운세",
  "심리상담",
  "취미·레슨",
];

export default function RecommendSearch() {
  return (
    <div>
      <div style={{ padding: "3%" }}>
        <h2 style={{ fontSize: "13px", fontWeight: "bold" }}>카테고리</h2>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {recommendKeywords.map((keyword, index) => (
            <div
              key={index}
              style={{
                paddingLeft: "3%",
                paddingTop: "2%",
              }}
            >
              <div className={styles["keywordStyle"]}>{keyword}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
