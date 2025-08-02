import { useState, useEffect, useMemo } from 'react';
import search from '../../../assets/icons/Search_icon.svg';
import TaskTable from '../../../pages/admin/TaskTable';
import ProfileDropdown from '../../generalComponents/ProfileButton';
import useTaskStore from '../../../stores/taskStore';
import useAuthStore from '../../../stores/authStore';

interface InputChangeEvent {
	target: {
		value: string;
	};
}

interface Task {
	_id: string;
	title: string;
	description: string;
	status: string;
	assignedTo?: string;
	createdAt?: string;
	dueDate?: string;
}

const taskListheaders = ['Id', 'Type', 'Status', 'Date', 'Actions'];

const AdminTasks = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [allTasks, setAllTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('All');

	const name = localStorage.getItem('role') || '';
	const { getTaskList } = useTaskStore();

	const handleInputChange = (event: InputChangeEvent) => {
		setSearchQuery(event.target.value);
	};

	// Fetch real tasks
	useEffect(() => {
		const fetchTasks = async () => {
			try {
				setLoading(true);
				const response = await getTaskList();
				if (response.success && response.tasks) {
					setAllTasks(response.tasks);
				}
			} catch (error) {
				console.error('Failed to fetch tasks:', error);
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
		if (activeTab === 'Active') {
			filtered = allTasks.filter(
				(task) =>
					task.status === 'inProgress' ||
					task.status === 'Pending' ||
					task.status === 'Submitted'
			);
		} else if (activeTab === 'Completed') {
			filtered = allTasks.filter(
				(task) => task.status === 'Completed' || task.status === 'Task Closed'
			);
		}

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(task) =>
					task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
					task.status.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		return filtered.map((task) => ({
			id: task._id,
			type: task.title || 'Task',
			status: task.status,
			assignedTo: task.assignedTo,
			dueDate: task.createdAt
				? new Date(task.createdAt).toLocaleDateString()
				: task.dueDate || 'No due date',
			actions: true, // Enable action buttons
		}));
	}, [allTasks, activeTab, searchQuery]);
	const { user } = useAuthStore();
	return (
		<>
			<div className="mt-10 w-full flex justify-between items-center mb-4">
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
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-50"></div>
						<span className="ml-2 text-gray-600">Loading tasks...</span>
					</div>
				) : (
					<TaskTable
						tasks={transformTasksForTable}
						tasksHeader={taskListheaders}
						manager={name === 'MANAGER'}
					/>
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
