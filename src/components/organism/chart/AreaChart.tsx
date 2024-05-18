import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const data = {
  labels: [
    "9999.99.99.99",
    "9999.99.99.99",
    "9999.99.99.99",
    "9999.99.99.99",
    "9999.99.99.99",
  ],
  datasets: [
    {
      label: "",
      fill: true,
      backgroundColor: "rgb(82, 235, 182, 0.2)",
      borderColor: "rgba(82,235,182,1)",

      borderWidth: 1,
      pointBackgroundColor: "rgba(82,235,182,1)",
      pointBorderColor: "#fff",
      data: [44100, 49999, 50001, 60000, 99999],
    },
  ],
};

const options: any = {
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        font: {
          size: 9, // x축 글자 굵게 설정
        },
      },
      grid: {
        color: "white", // y축 그리드 색상 변경
      },
    },
    y: {
      beginAtZero: true,
      display: false, // y축 제거
    },
  },
  plugins: {
    legend: {
      labels: {
        boxWidth: 0,
        padding: 15, // 레전드 항목 사이의 간격
      },
    },
    datalabels: {
      align: "end",
      anchor: "end",
      // backgroundColor: "rgba(255,255,255,0.8)",
      borderRadius: 4,
      color: "black",
      font: {
        weight: "bold",
      },
      formatter: (value: any) => `${value}`,
    },
  },
};

const AreaChart = () => {
  return (
    <div>
      <Line data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default AreaChart;
