import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../types/task';
import { Tag, List, Typography, Tooltip as AntTooltip } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, FileDoneOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { formatDateForCalendar } from "../../utils/dateFormatter";

const { Text } = Typography;

type TasksByStatus = Record<string, Task[]>;

interface CustomDayProps {
  date: Date;
  tasks: Task[];
}

const CustomCalendarDay = ({ date, tasks }: CustomDayProps) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);

  // Get tasks for this date
  const dueTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const dueDate = new Date(task.dueDate);
    return (
      date.getDate() === dueDate.getDate() &&
      date.getMonth() === dueDate.getMonth() &&
      date.getFullYear() === dueDate.getFullYear()
    );
  });

  // Group tasks by status
  const tasksByStatus: TasksByStatus = dueTasks.reduce((acc, task) => {
    const status = task.status || "Unknown";
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {} as TasksByStatus);

  // Status configuration (colors, icons, labels)
  const statusConfig = {
    InProgress: {
      color: "#FFB800",
      tagColor: "warning",
      icon: <ClockCircleOutlined />,
      label: "In Progress",
    },
    Submitted: {
      color: "#3E7BFA",
      tagColor: "processing",
      icon: <FileDoneOutlined />,
      label: "Submitted",
    },
    Completed: {
      color: "#34C759",
      tagColor: "success",
      icon: <CheckCircleOutlined />,
      label: "Completed",
    },
    Closed: {
      color: "#8E8E93",
      tagColor: "default",
      icon: <CloseCircleOutlined />,
      label: "Closed",
    },
  };

  // Show tooltip with delay
  const handleMouseEnter = () => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
      tooltipTimeout.current = null;
    }
    setShowTooltip(true);
  };

  // Hide tooltip with delay
  const handleMouseLeave = () => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }

    tooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 500);
  };

  // Navigate to task detail
  const handleTaskClick = (taskId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/task/${taskId}`);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
    };
  }, []);

  // Status indicators (dots)
  const statusDots = Object.keys(tasksByStatus)
    .slice(0, 3)
    .map((status) => (
      <div
        key={status}
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor:
            statusConfig[status as keyof typeof statusConfig]?.color ||
            "#8E8E93",
        }}
      />
    ));

  // Format date for display
  const formattedDate = formatDateForCalendar(date);

  return (
    <div
      className="date-cell relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.preventDefault()}
    >
      <div>{date.getDate()}</div>

      {/* Status dots */}
      {dueTasks.length > 0 && (
        <div className="flex justify-center mt-1 gap-1">
          {statusDots}
          {Object.keys(tasksByStatus).length > 3 && (
            <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          )}
        </div>
      )}

      {/* Enhanced Tooltip with tasks */}
      {dueTasks.length > 0 && showTooltip && (
        <div className="task-tooltip shadow-lg">
          <div className="border-b pb-2 mb-3">
            <Text strong className="text-base">
              {formattedDate}
            </Text>
            <div className="text-xs text-gray-500 mt-1">
              {dueTasks.length} {dueTasks.length === 1 ? "task" : "tasks"} due
            </div>
          </div>

          {Object.entries(tasksByStatus).map(([status, tasks]) => {
            const config = statusConfig[
              status as keyof typeof statusConfig
            ] || {
              color: "#8E8E93",
              tagColor: "default",
              icon: null,
              label: status,
            };

            return (
              <div key={status} className="mb-3">
                <div className="mb-2">
                  <Tag
                    color={config.tagColor as any}
                    icon={config.icon}
                    className="text-xs"
                  >
                    {config.label}
                  </Tag>
                </div>

                <List
                  size="small"
                  dataSource={tasks}
                  className="task-list"
                  renderItem={(task) => (
                    <List.Item
                      className="px-2 py-1 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                      onClick={(e) => handleTaskClick(task._id, e)}
                    >
                      <div className="w-full">
                        <div className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0 mr-2"
                            style={{ backgroundColor: config.color }}
                          />
                          <AntTooltip
                            title="Click to view task details"
                            style={{ background: "green" }}
                          >
                            <Text
                              ellipsis={{ tooltip: task.title }}
                              className="text-sm hover:text-primary-500 hover:underline"
                            >
                              {task.title}
                            </Text>
                          </AntTooltip>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            );
          })}

          {dueTasks.length > 5 && (
            <div className="text-center mt-2 pt-2 border-t border-gray-100">
              <Text
                type="secondary"
                className="text-xs cursor-pointer hover:text-primary-500"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/tasks", {
                    state: {
                      dateFilter: date.toISOString().split("T")[0],
                    },
                  });
                }}
              >
                View all tasks for this day
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomCalendarDay;