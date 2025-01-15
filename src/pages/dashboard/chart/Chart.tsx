import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const UsageChart = () => {
  const data = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        data: [79, 31], 
        backgroundColor: ["#5855F8", "#E6E6E6"], 
        borderWidth: 0, 
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="flex items-center justify-between">
      <div className="mr-6 flex-1">
        <div className="flex items-center justify-between w-full mb-2">
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#5855F8",
              borderRadius: "2px",
              marginRight: "8px",
            }}
          ></span>
          <span>Used</span>
          <span className="ml-auto">79</span>
        </div>
        <div className="w-full h-[1px] bg-gray-200"></div>
        <div className="flex items-center justify-between w-full">
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#E6E6E6",
              borderRadius: "2px",
              marginRight: "8px",
            }}
          ></span>
          <span>Remain</span>
          <span className="ml-auto">31</span>
        </div>
      </div>

      {/* Right side: Doughnut chart */}
      <div style={{ width: "120px", height: "120px", position: "relative" }}>
        <Doughnut data={data} options={options} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#5855F8",
          }}
        >
          79%
        </div>
      </div>
    </div>
  );
};

export default UsageChart;
