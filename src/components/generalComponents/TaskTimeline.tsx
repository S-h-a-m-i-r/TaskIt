import type React from "react"
import { Steps } from "antd"
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import { Task } from "../../types"


const stepOrder: Task["status"][] = ["Submitted", "InProgress", "Completed", "Closed"]

// Configure step appearance
const getStepConfig = (status: Task["status"], currentIndex: number, stepIndex: number) => {
    const isCompletedOrCurrent = stepIndex <= currentIndex

    if (!isCompletedOrCurrent) {
      // Pending (future step) → grey
      return {
        title: <span style={{ color: "#9ca3af" }}>{status}</span>, // grey text
        icon: <ClockCircleOutlined style={{ color: "#9ca3af" }}  />, // grey icon
      }
    }
  switch (status) {
    case "Submitted":
      return {
        title: "Submitted",
        icon: <ClockCircleOutlined />,
      }
      case "InProgress":
        return {
          title: <span style={{ color: "#a16207", fontWeight: 600  }}>In Progress</span>, // custom text
          icon: <CheckCircleOutlined style={{ color: "#a16207"}} />, 
        }
    case "Completed":
      return {
        title: <span style={{color: "#15803d", fontWeight: 600}}> Completed </span>,
        icon: <CheckCircleOutlined style={{ color: "#15803d" }} />,
      }
    case "Closed":
      return {
        title: <span style={{color: "#ef4444", fontWeight: 600}}> Closed</span> ,
        icon: <CheckCircleOutlined style={{ color: "#ef4444" }} />,
      }
    default:
      return { title: "Unknown", icon: <ClockCircleOutlined /> }
  }
}

const TaskTimeline: React.FC<{ task: Task }> = ({ task }) => {
  const currentIndex = stepOrder.indexOf(task.status)
console.log("Task status:", task.status, "Current index:", currentIndex)
  return (
    <div className="w-full py-6">
      
        <Steps
          current={currentIndex}
          status={task.status === "Closed" ? "finish" : "process"} 
          items={stepOrder.map((status, idx) => getStepConfig(status, currentIndex, idx))}
        />
    </div>
  )
}

export default TaskTimeline
