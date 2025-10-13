import { useNavigate } from "react-router-dom";
import useTaskStore from "../../stores/taskStore";
import { TasksHeadersData } from "../../datadump";
import { useEffect, useState, useMemo } from "react";
import { Input, Select, Switch, Space, Button, Tooltip } from "antd";
import { SearchOutlined, FilterOutlined, ClearOutlined, SyncOutlined } from "@ant-design/icons";
// import debounce from "lodash/debounce";
import dayjs from "dayjs";
import { DatePicker } from "antd";
// import { statusColor } from "../../utils/statusColor";   // path to helper
import { formatDate } from "../../utils/dateFormatter";

const { RangePicker } = DatePicker;
const { Option } = Select;
// Define types for the component
interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
  dueDate?: string;
  isRecurring?: boolean;
}

interface TaskStore {
  getTaskList: () => Promise<{
    success: boolean;
    tasks: Task[];
    message?: string;
  }>;
  tasks: Task[];
}

interface StatusColorMap {
  [key: string]: string;
}

export const statusColor: StatusColorMap = {
  Submitted: "bg-blue-50",
  InProgress: "bg-yellow-50",
  Completed: "bg-green-50",
  Closed: "bg-red-50",
  default: "bg-gray-50",
};

const AllUsersTasksList = () => {
  const { tasks, getTaskList } = useTaskStore() as TaskStore;
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);
  const [showRecurringOnly, setShowRecurringOnly] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const debouncedSetSearchText = useMemo(() => {
    let timeout: NodeJS.Timeout;

    return (value: string) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        setSearchText(value);
      }, 300);
    };
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        getTaskList();
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [getTaskList]);

  const goToTask = (id: string) => navigate(`/task/${id}`);

  // Clear all filters
  const clearFilters = () => {
    setSearchText("");
    setStatusFilter(null);
    setDateRange(null);
    setShowRecurringOnly(false);

    // Also clear the input field value
    const searchInput = document.getElementById(
      "task-search-input"
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.value = "";
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Filter by search text (title and description)
      const searchMatch =
        !searchText ||
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchText.toLowerCase()));

      // Filter by status
      const statusMatch = !statusFilter || task.status === statusFilter;

      // Filter by date range
      let dateMatch = true;
      if (dateRange && dateRange[0] && dateRange[1] && task.dueDate) {
        const taskDate = dayjs(task.dueDate);
        dateMatch =
          taskDate.isAfter(dateRange[0]) &&
          taskDate.isBefore(dateRange[1].add(1, "day"));
      }

      // Filter by recurring
      const recurringMatch = !showRecurringOnly || task.isRecurring;

      return searchMatch && statusMatch && dateMatch && recurringMatch;
    });
  }, [tasks, searchText, statusFilter, dateRange, showRecurringOnly]);

  return (
    <div className="bg-white">
      <div className="mb-4 pb-4 border-b">
        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
          {/* Main Search Input */}
          <div className="relative flex-grow">
            <Input
              id="task-search-input"
              placeholder="Search by task title or description..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={(e) => debouncedSetSearchText(e.target.value)}
              className="w-full"
              allowClear
              size="middle"
            />
          </div>

          {/* Toggle to expand/collapse advanced filters on mobile */}
          <Button
            icon={<FilterOutlined />}
            className="lg:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            type={isSearchExpanded ? "primary" : "default"}
          >
            Filters
          </Button>

          {/* Advanced Filters - Responsive */}
          <div
            className={`${
              isSearchExpanded ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row gap-3 w-full lg:w-auto`}
          >
            {/* Status Filter */}
            <Select
              placeholder="Filter by status"
              style={{ minWidth: 150 }}
              allowClear
              onChange={(value) => setStatusFilter(value)}
              value={statusFilter}
            >
              <Option value="InProgress">In Progress</Option>
              <Option value="Submitted">Submitted</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Closed">Closed</Option>
            </Select>

            {/* Date Range Filter */}
            <RangePicker
              onChange={(dates) =>
                setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
              }
              value={dateRange}
              format="DD/MM/YYYY"
              placeholder={["Due from", "Due to"]}
              allowClear
            />

            {/* Recurring Tasks Toggle */}
            <div className="flex items-center whitespace-nowrap">
              <span className="mr-2 text-sm">Recurring only</span>
              <Switch
                checked={showRecurringOnly}
                onChange={setShowRecurringOnly}
                size="small"
              />
            </div>

            {/* Action Buttons */}
            <Space>
              <Tooltip title="Clear all filters">
                <Button
                  icon={<ClearOutlined />}
                  onClick={clearFilters}
                  type="text"
                />
              </Tooltip>
            </Space>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-2 text-sm text-gray-500 flex items-center">
          {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}{" "}
          found
          {(searchText || statusFilter || dateRange || showRecurringOnly) && (
            <Button
              type="link"
              size="small"
              onClick={clearFilters}
              className="ml-2 p-0 h-auto"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>
      {/* Tasks Table */}
      <div className="max-h-[500px] overflow-y-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              {TasksHeadersData.map((h) => (
                <th
                  key={h}
                  className={`py-3 pl-5 text-left text-[14px] font-normal ${
                    ["Task Id", "Date", "Recurring", "Status"].includes(h)
                      ? "hidden md:table-cell"
                      : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                const rowBg = statusColor[task.status] || statusColor.default;
                const isPastDue =
                  task.dueDate && new Date(task.dueDate) < new Date();

                return (
                  <tr
                    key={task._id}
                    className={`text-left cursor-pointer hover:bg-gray-200/50 ${rowBg}`}
                    onClick={() => goToTask(task._id)}
                  >
                    <td className="py-5 pl-5 text-sm font-normal text-primary-400 border-b border-custom-border">
                      {task.isRecurring && (
                        <Tooltip title="Recurring task">
                          <SyncOutlined className="mr-2 text-blue-500" />
                        </Tooltip>
                      )}
                      {task.title}
                    </td>

                    <td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
                      {task?.description}
                    </td>

                    <td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
                      {task.dueDate ? (
                        <span
                          className={
                            isPastDue ? "text-red-600 font-medium" : ""
                          }
                        >
                          {formatDate(task.dueDate)}
                          {isPastDue && (
                            <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              Passed
                            </span>
                          )}
                        </span>
                      ) : (
                        <span
                          className="text-gray-500 text-lg flex justify-start pl-5"
                          title="No due date"
                        >
                          ∞
                        </span>
                      )}
                    </td>

                    <td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.status === "InProgress"
                            ? "bg-yellow-100 text-yellow-800"
                            : task.status === "Submitted"
                            ? "bg-blue-100 text-blue-800"
                            : task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "Closed"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
                      {task.isRecurring ? "Yes" : "No"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  No tasks found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>{" "}
    </div>
  );
};

export default AllUsersTasksList;

