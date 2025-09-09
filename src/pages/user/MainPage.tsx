import { useState, useEffect, useMemo } from 'react';
import DashboardCard from '../../components/generalComponents/DashboardCard';
import LoadingDots from '../../components/generalComponents/LoadingDots';
import CardSkeleton from '../../components/generalComponents/CardSkeleton';
import { CardsData } from '../../datadump';
import AllTasksList from './AllUsersTasksList';
import extend from '../../assets/icons/extends_icon.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar_desgin.css';
import CircularChart from './chart/Chart';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../../stores/taskStore';
import useAuthStore from '../../stores/authStore';
import { Task } from '../../types/task';
import CustomCalendarDay from '../../components/generalComponents/DotIndicator';


const MainPage = () => {
	
	const [allTasks, setAllTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const { getTaskList } = useTaskStore() as { getTaskList: () => Promise<{ success: boolean; tasks: Task[] }> };
	const { user } = useAuthStore();

	const handleRedirect = () => {
		navigate('/Tasks');
	};

	// Fetch tasks on component mount
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
	  }, [])

	// Calculate task counts by status
	const taskCounts = useMemo(() => {
		const counts = {
			inProgress: allTasks.filter((task) => task.status === 'InProgress')
				.length,
			submitted: allTasks.filter((task) => task.status === 'Submitted').length,
			closed: allTasks.filter((task) => task.status === 'Closed').length,
			completed: allTasks.filter((task) => task.status === 'Completed').length,
		};

		return counts;
	}, [allTasks]);

	const getTasksByStatus = useMemo(() => {
		const tasksByStatus = {
			inProgress: allTasks?.filter((task: { status: string; }) => task.status === 'InProgress')
				.length,
			submitted: allTasks?.filter((task: { status: string; }) => task.status === 'Submitted').length,
			completed: allTasks?.filter((task: { status: string; }) => task.status === 'Completed').length,
			closed: allTasks?.filter((task: { status: string; }) => task.status === 'Closed').length,
		};

		return tasksByStatus;
	}, [allTasks]);
	// Create dynamic cards data with real task counts
	const dynamicCardsData = useMemo(() => {
		return [
			{
				title: 'Tasks Submitted',
				value: getTasksByStatus.submitted.toString(),
				color: "#EEF6FF",
				count: taskCounts.submitted,
				icon: CardsData[0].icon,
				path: '/submitted'

	
			},
			{
				title: 'Tasks In Progress',
				value: getTasksByStatus.inProgress.toString(),
				color: "#FEFBEB",
				count: taskCounts.inProgress,
				icon: CardsData[1].icon,
				path: '/inProgress'
	
			},
			
			{
				title: 'Tasks Completed',
				value: getTasksByStatus.completed.toString(),
				color: "#EFFDF4",
				count: taskCounts.completed,
				icon: CardsData[2].icon,
				ipath: '/completed'
			},
			{
				title: 'Tasks Closed',
				value: getTasksByStatus.closed.toString(),
				color: "#FEF1F2",
				count: taskCounts.closed,
				icon: CardsData[3].icon,
				path: '/closed'
			},
		];
	}, [taskCounts]);

	const renderDayContents = ( _Day:number, date: Date) => {
		return <CustomCalendarDay date={date} tasks={allTasks} />;
	  };
	
	// Get user's first name for greeting
	const userName = user?.firstName || user?.userName || 'User';

	
	
	return (
		<div className="flex flex-col gap-5 p-9">
			{/* Dynamic greeting with user's name */}
			<div className="flex gap-2 max-sm:gap-5h items-center">
				<h1 className="text-2xl font-semibold">Good Morning {userName}!</h1>
			</div>

			{/* Task Cards with real data */}
			<div className="mt-14 grid grid-cols-1 max-sm:justify-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{loading ? (
					// Beautiful skeleton loading for cards
					<CardSkeleton count={3} />
				) : (
					// Real task cards
					dynamicCardsData.map((element, index) => (
						<DashboardCard
							key={index}
							title={element.title}
							count={element.count}
							icon={element.icon}
							path={element.path}
							color={element.color}
						/>
					))
				)}
			</div>

			<div className="flex flex-col md:flex-row gap-4 justify-between">
				{/* Tasks - Fills remaining space */}
				<div className="w-full md:flex-1 bg-white p-5 rounded-md">
					<div className="w-full flex items-center justify-between">
						<h2 className="font-semibold text-2xl text-left">Tasks</h2>
						<img
							src={extend}
							alt="extend"
							className="cursor-pointer"
							onClick={handleRedirect}
						/>
					</div>
					{loading ? (
						<div className="flex items-center justify-center h-32">
							<LoadingDots text="Loading tasks" />
						</div>
					) : (
						<AllTasksList />
					)}
				</div>

				{/* DatePicker + Credits - Fixed width, right aligned */}
				<div className="flex flex-col items-end gap-4 md:max-w-[330px] w-full">
				<div className="w-full max-md:hidden flex justify-end">
				<DatePicker
              onChange={() => {/* Do nothing */}}
              inline
              renderDayContents={renderDayContents}
              calendarClassName="task-calendar"
              dayClassName={() => ""}
              todayButton={null}
              showPopperArrow={false}
              disabledKeyboardNavigation
              readOnly={true}
            />
          </div>
					<div className="bg-white rounded-md w-full p-6 flex flex-col gap-5">
						<h2 className="text-2xl">Credits</h2>
						<CircularChart />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
