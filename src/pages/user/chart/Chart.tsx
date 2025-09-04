import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import LoadingDots from "../../../components/generalComponents/LoadingDots";
import useCreditsStore from "../../../stores/creditsStore";

ChartJS.register(ArcElement, Tooltip, Legend);

const UsageChart = () => {
  const { available, total, used, loading, fetchCredits } = useCreditsStore();
  const [activeSegment, setActiveSegment] = useState<"used" | "available">("used");
  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);
  
  const usedPercentage = total > 0 ? Math.round((used / total) * 100) : 0;
  const availablePercentage = total > 0 ? 100 - usedPercentage : 0;
  
  const data = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        data: [used, available], 
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
    onHover: (_: any, elements: any) => {
      if (elements && elements.length > 0) {
        // If hovering over an element, identify which segment
        const index = elements[0].index;
        setActiveSegment(index === 0 ? "used" : "available");
      }
    },
  };

  if (loading && total === 0) {
    return (
      <div className="flex items-center justify-center h-[150px]">
        <LoadingDots />
      </div>
    );
  }

  const handleMouseLeave = () => {
    setActiveSegment("used");
  };

  return (
    <div className="flex max-md:flex-col max-md:gap-5 items-center justify-between">
      <div className="mr-6 flex-1">
      <div 
          className="flex items-center justify-between w-full mb-2 hover:bg-gray-50 p-1 rounded cursor-pointer"
          onMouseEnter={() => setActiveSegment("used")}
        >
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
          <span className="ml-auto">{used}</span>
        </div>
        <div className="w-full h-[1px] bg-gray-200"></div>
        <div 
          className="flex items-center justify-between w-full mt-2 hover:bg-gray-50 p-1 rounded cursor-pointer"
          onMouseEnter={() => setActiveSegment("available")}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#E6E6E6",
              borderRadius: "2px",
              marginRight: "8px",
            }}
          ></span>
          <span>Remaining</span>
          <span className="ml-auto">{available}</span>
        </div>
      </div>

      <div 
        style={{ width: "120px", height: "120px", position: "relative" }}
        onMouseLeave={handleMouseLeave}
      >
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
           {activeSegment === "used" ? usedPercentage : availablePercentage}%
        </div>
      </div>
    </div>
  );
};

export default UsageChart;
