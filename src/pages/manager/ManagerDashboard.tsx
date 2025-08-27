import ButtonComponent from "../../components/generalComponents/ButtonComponent";
import {
	customerHeader,
	tasksHeader,
	teamHeader,
	teamTasksdetails,
} from '../../datadump';
import TaskTable from '../admin/TaskTable';
import { customerTasksdetails as customerManagement } from '../../datadump';
import ProfileDropdown from '../../components/generalComponents/ProfileButton';
import CountUp from 'react-countup';
import useAuthStore from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import useTaskStore from '../../stores/taskStore';

interface Task {
	_id: string;
	title: string;
	description: string;
	status: string;
	createdBy?:
		| string
		| { _id: string; email: string; firstName?: string; lastName?: string; role?: string; userName?: string};
	assignedTo?:
		| string
		| { _id: string; email: string; firstName?: string; lastName?: string };
	createdAt?: string;
	dueDate?: string;
}

const ManagerDashboard = () => {
	// const [allTasks, setAllTasks] = useState<Task[]>([]);
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const { getTaskList, tasks: allTasks } = useTaskStore();

	const getTasksByStatus = useMemo(() => {
		const tasksByStatus = {
			inProgress: allTasks?.filter((task) => task.status === 'InProgress')
				.length,
			submitted: allTasks?.filter((task) => task.status === 'Submitted').length,
			completed: allTasks?.filter((task) => task.status === 'Completed').length,
			closed: allTasks?.filter((task) => task.status === 'Closed').length,
		};

		return tasksByStatus;
	}, [allTasks]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch tasks
				await getTaskList();
				// if (taskResponse.success && taskResponse.tasks) {
				// 	setAllTasks(taskResponse.tasks);
				// }
			} catch (error) {
				console.error('Failed to fetch data:', error);
			}
		};

		fetchData();
	}, []);

	const dashboardCards = [
		{
			title: 'Tasks In Progress',
			value: getTasksByStatus.inProgress.toString(),
		},
		{
			title: 'Tasks Submitted',
			value: getTasksByStatus.submitted.toString(),
		},
		{
			title: 'Tasks Completed',
			value: getTasksByStatus.completed.toString(),
		},
		{
			title: 'Tasks Closed',
			value: getTasksByStatus.closed.toString(),
		},
	];

	const transformTasksForTable = (tasks: Task[]) => {
		return tasks.map((task) => ({
			id: task._id,
			customerName: typeof task.createdBy === 'object' && task.createdBy ? (task.createdBy).userName : 'Unknown User',
			title: task.title,
			status: task.status,
			assignedTo:
				typeof task.assignedTo === 'object' && task.assignedTo?.email
					? `${task.assignedTo?.firstName || ''} ${
							task.assignedTo?.lastName || ''
					  }`.trim() || task.assignedTo?.email
					: typeof task.assignedTo === 'string'
					? task.assignedTo
					: 'Unassigned',
			dueDate: task.createdAt
				? new Date(task.createdAt).toLocaleDateString()
				: 'No due date',
			actions: true, 
		}));
	};

	return (
		<div className="w-full p-10">
			<div className="flex w-full justify-between">
				<h1 className="font-bold text-[32px] text-primary-100 text-left">
					{' '}
					{(user?.role || '').charAt(0).toUpperCase() + (user?.role || '').slice(1).toLowerCase()} Dashboard
				</h1>
				<ProfileDropdown userName={user?.userName || ''} />
			</div>
			<div>
				<h2 className="font-bold text-[22px] text-primary-100 text-left mt-8">
					{' '}
					Overview
				</h2>
				<div className="mt-6 grid grid-cols-1 max-sm:justify-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					{dashboardCards.map((card, index) => (
						<div
							key={index}
							className="bg-transparent border border-slate-300 rounded-xl p-6 min-h-[136px] hover:shadow-sm transition-shadow"
						>
							<div className="space-y-2 flex flex-col justify-center h-full">
								<h3 className="text-[16px] text-left font-medium text-gray-600 leading-tight">
									{card.title}
								</h3>
								<p className="text-[24px] text-left font-bold text-gray-900">
									<CountUp end={Number(card.value)} duration={2} />
								</p>
							</div>
						</div>
					))}
				</div>
				<div>
					<div className="flex items-center justify-between mt-10 mb-5 pl-3">
						<h2 className="text-[22px] text-primary-100 font-bold ">
							Task Management
						</h2>
						<ButtonComponent
							title={'View'}
							className=" bg-primary-50 w-full text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center max-w-[109px]"
							onClick={() => navigate(`/${user?.role.toLowerCase()}/tasks`)}
						/>
					</div>
					<TaskTable
						tasks={transformTasksForTable(allTasks)}
						tasksHeader={tasksHeader}
						manager={true}
					/>
					<div>
						<div>
							<div className="flex items-center justify-between my-5">
								<h2 className="text-[22px] font-bold text-primary-100 text-left">
									Customer Management
								</h2>
								<ButtonComponent
									title={'View'}
									className=" bg-primary-50 w-full text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center max-w-[109px]"
								/>
							</div>
							<TaskTable
								tasks={customerManagement}
								tasksHeader={customerHeader}
								manager={false}
							/>
						</div>
						{user?.role === 'MANAGER' && (
						<div>
							<div className="flex items-center justify-between my-5">
								<h2 className="text-[22px] font-bold text-primary-100 text-left">
									Team Management
								</h2>
								<ButtonComponent
									title={'View'}
									className=" bg-primary-50 w-full text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center max-w-[109px]"
								/>
							</div>
							<TaskTable
								tasks={teamTasksdetails}
								tasksHeader={teamHeader}
								manager={true}
							/>
						</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManagerDashboard;
