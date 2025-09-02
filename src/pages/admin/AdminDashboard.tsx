import AdminRevenueChart from "../../components/adminComponents/AdminDashboardChart";
import ButtonComponent from "../../components/generalComponents/ButtonComponent";
import {
	customerHeader,
	tasksHeader,
} from '../../datadump';
import TaskTable from './TaskTable';
import { adminTaskList as customerManagement } from '../../datadump';
import ProfileDropdown from '../../components/generalComponents/ProfileButton';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { useEffect, useMemo } from 'react';
import useTaskStore from '../../stores/taskStore';
import useAuthStore from '../../stores/authStore';
import useUserStore from "../../stores/userStore";
interface Task {
	_id: string;
	title: string;
	description: string;
	status: string;
	assignedTo?:
		| string
		| { _id: string; email: string; firstName?: string; lastName?: string; role?: string; userName?: string};
	createdBy?:
		| string
		| { _id: string; email: string; firstName?: string; lastName?: string; role?: string; userName?: string };
	createdAt?: string;
	dueDate?: string;
	isRecurring?: boolean;
}

const AdminDashboard = () => {
	// const [allTasks, setAllTasks] = useState<Task[]>([]);
	// const [teamMembers, setTeamMembers] = useState<User[]>([]);
	const { user } = useAuthStore();
	const { tasks: allTasks } = useTaskStore();
	const { teamMembers, getAllTeamMembers } = useUserStore();

	const navigate = useNavigate();
	const handleAddCredit = () => {
		navigate('/credits');
	};

	const { getTaskList } = useTaskStore();
	// const { getAllUsers } = useAuthStore();
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

				// Fetch users for team management
				// const userResponse = await getAllUsers();
				// if (userResponse.success && userResponse.users) {
				// 	setAllUsers(userResponse.users);
				// }
			} catch (error) {
				console.error('Failed to fetch data:', error);
			} finally {
				// setLoading(false); // Removed loading state
			}
		};

		fetchData();
	}, [getTaskList]);

	const dashboardCards = [
		{
			title: 'Tasks Submitted',
			value: getTasksByStatus.submitted.toString(),
			bgColor: "bg-[#EEF6FF]"

		},
		{
			title: 'Tasks In Progress',
			value: getTasksByStatus.inProgress.toString(),
			bgColor: "bg-[#FEFBEB]"

		},
		
		{
			title: 'Tasks Completed',
			value: getTasksByStatus.completed.toString(),
			bgColor: "bg-[#EFFDF4]"
		},
		{
			title: 'Tasks Closed',
			value: getTasksByStatus.closed.toString(),
			bgColor: "bg-[#FEF1F2]"
		},
	];

	const transformTasksForTable = (tasks: Task[]) => {
		return tasks.map((task) => ({
      id: task._id,
      customerName:
        typeof task?.createdBy === "object" && task?.createdBy?.userName
          ? task.createdBy.userName
          : "-",
      title: task?.title,
      status: task.status,
      assignedTo:
        typeof task.assignedTo === "object" && task.assignedTo?.email
          ? `${task.assignedTo?.firstName || ""} ${
              task.assignedTo?.lastName || ""
            }`.trim() || task.assignedTo?.email
          : typeof task.assignedTo === "string"
          ? task.assignedTo
          : "Unassigned",
		  dueDate: task.dueDate
		  ? new Date(task.dueDate).toLocaleDateString()
		  : task.dueDate ,
		  isRecurring: task?.isRecurring,
      actions: true, // Enable action buttons
    }));
	};
	

	useEffect(() => {
		getAllTeamMembers();
	}, [getAllTeamMembers]);

	const teamMembersTableData = teamMembers.map((member) => ({
		_id: member._id,
		teamManagementName: `${member.firstName} ${member.lastName}`,
		teamManagementEmail: member.email,
		teamManagementRole: member.role,
		teamManagementTeamMemberCount: member.userName,
		teamManagementActions: true
	}));

	const teamManagementHeader = [
		'Team Member Name',
		'Team Member Email', 
		'Team Member Role',
		'Team Member Username',
		'Team Member Actions',
	];
	const handleViewTeam = () => {
		navigate('/admin/teamManagement');
	}
	return (
		<>
			<div className="mt-10 flex w-full justify-between">
				<h1 className="font-bold text-[32px] text-primary-100 text-left">
					{' '}
					Admin Dashboard
				</h1>
				<ProfileDropdown userName={user?.userName} />
			</div>
			<div>
				<div className="mt-14 grid grid-cols-1 max-sm:justify-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					{dashboardCards.map((card, index) => (
						<div
							key={index}
							className={`${card.bgColor} border border-slate-300/50 rounded-xl p-6 min-h-[136px] hover:shadow-sm transition-shadow`}
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
							onClick={() => navigate('/admin/tasks')}
						/>
					</div>
					<TaskTable
						tasks={transformTasksForTable(allTasks)}
						tasksHeader={tasksHeader}
					/>
					<div>
						<div className="flex items-center justify-between mt-10 mb-5 pl-3">
							<h2 className="text-[22px] text-primary-100 font-bold ">
								Credits & Refunds
							</h2>
							<ButtonComponent
								title={'View'}
								className=" bg-primary-50 w-full text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center max-w-[109px]"
							/>
						</div>
						<div className="flex items-center gap-5 my-5">
							<ButtonComponent
								title={'Add Credits'}
								className=" bg-primary-50 w-full hover:bg-primary-200 text-white py-3 mt rounded-full flex justify-center self-center max-w-[150px]"
								onClick={handleAddCredit}
							/>
							<ButtonComponent
								title={'Issue Refund'}
								className=" bg-white w-full hover:bg-slate-50 !text-black py-3 mt rounded-full flex justify-center self-center max-w-[150px]"
							/>
						</div>
						<div>
							<h2 className="text-[22px] pl-3 font-bold text-primary-100 text-left">
								Financial Reporting
							</h2>
							<AdminRevenueChart />
						</div>
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
							/>
						</div>
						<div>
							<div className="flex items-center justify-between my-5">
								<h2 className="text-[22px] font-bold text-primary-100 text-left">
									Team Management
								</h2>
								<ButtonComponent
									title={'View'}
									className=" bg-primary-50 w-full text-white py-2 px-4 mt rounded-full hover:bg-primary-200 flex justify-center self-center max-w-[109px]"
									onClick={ handleViewTeam}
								/>
							</div>
							<TaskTable tasks={teamMembersTableData} tasksHeader={teamManagementHeader} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
