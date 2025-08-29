import type React from "react"
import { FileText, Settings, CheckCircle, Target } from "lucide-react"
import { Task } from "../../types"

const stepOrder: Task["status"][] = ["Submitted", "InProgress", "Completed", "Closed"]

// Configure step appearance with the new design
const getStepConfig = (status: Task["status"]) => {
  switch (status) {
    case "Submitted":
      return {
        title: "Submitted",
        icon: FileText,
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        iconColor: "text-blue-600",
      }
    case "InProgress":
      return {
        title: "In Progress",
        icon: Settings,
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        iconColor: "text-yellow-600",
      }
    case "Completed":
      return {
        title: "Completed",
        icon: CheckCircle,
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        iconColor: "text-green-600",
      }
    case "Closed":
      return {
        title: "Closed",
        icon: Target,
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        iconColor: "text-red-600",
      }
    default:
      return {
        title: "Unknown",
        icon: FileText,
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        iconColor: "text-gray-600",
      }
  }
}

const TaskTimeline: React.FC<{ task: Task }> = ({ task }) => {
  const currentIndex = stepOrder.indexOf(task.status)

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mx-auto">
        {stepOrder.map((status, idx) => {
          const config = getStepConfig(status)
          const Icon = config.icon
          const isActive = idx <= currentIndex
          const isLast = idx === stepOrder.length - 1

          return (
            <div key={status} className="flex items-center flex-1">
              {/* Step Badge */}
              <div
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-full font-medium text-sm
                  ${isActive ? `${config.bgColor} ${config.textColor}` : "bg-gray-300 text-gray-600"}
                  transition-all duration-300
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? config.iconColor : "text-gray-600"}`} />
                <span className="whitespace-nowrap">{config.title}</span>
              </div>

              {/* Connecting Line */}
              {!isLast && <div className="flex-1 h-0.5 bg-gray-300 mx-1" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TaskTimeline
