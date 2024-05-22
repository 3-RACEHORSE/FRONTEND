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

const keywordStyle = {
  background: "#f1f1f1",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  padding: "7px",
  fontSize: "14px",
};

export default async function RecommendSearch() {
  return (
    <>
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
              <div style={keywordStyle}>{keyword}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
