
import { useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function AdminRevenueChart() {
  const chartRef = useRef<ChartJS<"line"> | null>(null)

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [
            8000, 56000, 0, 10000, 90000, 0, 1100, 850, 400, 750, 9500, 650, 800, 1050, 1250, 1400, 1150,
            900, 750, 1000,
        ],
        borderColor: "#4D7599",
        backgroundColor: "transparent",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
          padding: 10,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  }

  return (
    <div className="w-full py-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg text-left font-medium text-gray-900 mb-2">Revenue Over Time</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">$15,000</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm text-gray-500">Last 6 Months</span>
            <span className="text-sm font-medium text-green-600">+15%</span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative h-64 w-full">
          <canvas
            ref={(canvas) => {
              if (canvas && !chartRef.current) {
                const ctx = canvas.getContext("2d")
                if (ctx) {
                  chartRef.current = new ChartJS(ctx, {
                    type: "line",
                    data,
                    options,
                  })
                }
              }
            }}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
