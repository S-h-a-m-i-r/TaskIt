import { useState, useEffect, useMemo } from 'react';
import search from '../../../assets/icons/Search_icon.svg';
import TaskTable from '../../../pages/admin/TaskTable';
import ProfileDropdown from '../../generalComponents/ProfileButton';
import LoadingDots from '../../generalComponents/LoadingDots';
import useTaskStore from '../../../stores/taskStore';
import useAuthStore from '../../../stores/authStore';
import { formatDate } from "../../../utils/dateFormatter";

interface InputChangeEvent {
  target: {
    value: string;
  };
}

const taskListheaders = [
  "Customer Name",
  "Task Title",
  "Status",
  "Date",
  "isRecurring",
  "Actions",
];

const AdminTasks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  const { user } = useAuthStore();
  const name = user?.role || localStorage.getItem("role") || "";
  const { getTaskList, tasks: allTasks } = useTaskStore() as any;

  const handleInputChange = (event: InputChangeEvent) => {
    setSearchQuery(event.target.value);
  };

  // Fetch real tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        await getTaskList();
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [getTaskList]);

  // Filter and transform tasks for display
  const transformTasksForTable = useMemo(() => {
    let filtered = allTasks;

    // Apply status filter
    if (activeTab === "Active") {
      filtered = allTasks.filter(
        (task: { status: string }) =>
          task.status === "InProgress" || task.status === "Submitted"
      );
    } else if (activeTab === "Completed") {
      filtered = allTasks.filter(
        (task: { status: string }) =>
          task.status === "Completed" || task.status === "Task Closed"
      );
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (task: { title: string; description: string; status: string }) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.map(
      (task: {
        _id: any;
        createdBy: { userName: any };
        title: any;
        status: any;
        assignedTo: any;
        dueDate: string | number | Date;
        isRecurring: any;
      }) => {
        return {
          id: task._id,
          customerName:
            typeof task.createdBy === "object" && task.createdBy?.userName
              ? task.createdBy.userName
              : undefined,
          title: task.title,
          status: task.status,
          assignedTo: task.assignedTo,
          dueDate: formatDate(task?.dueDate),
          isRecurring: task?.isRecurring,
          actions: true,
        };
      }
    );
  }, [allTasks, activeTab, searchQuery]);
  return (
    <>
      <div className="p-10 w-full flex justify-between items-center mb-4">
        <h1 className="text-[32px] font-bold text-primary-100"> Tasks </h1>
        <div className="flex gap-2 items-center">
          <ProfileDropdown userName={user?.userName} />
        </div>
      </div>
      <div className="border bg-white flex gap-2 items-center  border-gray-300 rounded-md px-3 py-3 w-full transition-all duration-1000">
        <img src={search} alt="search" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="border-none w-full outline-none"
          placeholder="Search tasks..."
          autoFocus
        />
      </div>
      <FilterSortInterface activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingDots text="Loading tasks" />
          </div>
        ) : (
          <>
            <TaskTable
              tasks={transformTasksForTable}
              tasksHeader={taskListheaders}
              manager={name === "MANAGER"}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AdminTasks;

interface FilterSortInterfaceProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

function FilterSortInterface({
	activeTab,
	setActiveTab,
}: FilterSortInterfaceProps) {
	const [activeSort, setActiveSort] = useState<string | null>(null);

	const tabs = ['All', 'Active', 'Completed'];
	const sortOptions = ['Date', 'Status', 'Type'];

	return (
		<div className="w-full mx-auto p-6">
			<div className="mb-8">
				<div className="flex space-x-8 border-b border-gray-300">
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
								activeTab === tab
									? 'text-gray-900 border-b-2 border-blue-500 font-bold'
									: 'text-gray-500 hover:text-gray-700'
							}`}
						>
							{tab}
						</button>
					))}
				</div>
			</div>

			<div>
				<h2 className="text-xl font-semibold text-gray-900 mb-6 text-left">
					Sort
				</h2>
				<div className="flex flex-wrap gap-3">
					{sortOptions.map((option) => (
						<button
							key={option}
							onClick={() =>
								setActiveSort(activeSort === option ? null : option)
							}
							className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
								activeSort === option
									? 'bg-blue-100 text-blue-700 border border-blue-200'
									: 'bg-white text-gray-700 hover:bg-gray-200'
							}`}
						>
							{option}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
