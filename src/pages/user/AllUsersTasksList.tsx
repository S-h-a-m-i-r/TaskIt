import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../../stores/taskStore";
import { TasksHeadersData } from "../../datadump";
// import { statusColor } from "../../utils/statusColor";   // path to helper

// Define types for the component
interface Task {
	_id: string;
	title: string;
	status: string;
	createdAt?: string;
	recurring?: boolean;
}

interface TaskStore {
	getTaskList: () => Promise<{
		success: boolean;
		tasks: Task[];
		message?: string;
	}>;
}

interface StatusColorMap {
	[key: string]: string;
}

export const statusColor: StatusColorMap = {
	Submitted: 'bg-blue-50',
	inProgress: 'bg-yellow-50',
	Completed: 'bg-green-50',
	'Task Closed': 'bg-red-50',
	default: 'bg-gray-50',
};

const AllUsersTasksList = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const { getTaskList } = useTaskStore() as unknown as TaskStore;
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await getTaskList();
				if (res.success) {
					setTasks(res.tasks);
				}
			} catch (error) {
				console.error('Failed to fetch tasks:', error);
			}
		};
		fetchTasks();
	}, [getTaskList]);

	const goToTask = (id: string) => navigate(`/task/${id}`);

	return (
		<div className="bg-white">
			<table className="w-full border-separate border-spacing-y-2">
				<thead>
					<tr>
						{TasksHeadersData.map((h) => (
							<th
								key={h}
								className={`py-3 pl-5 text-left text-[14px] font-normal ${
									['Task Id', 'Date', 'Recurring', 'Status'].includes(h)
										? 'hidden md:table-cell'
										: ''
								}`}
							>
								{h}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{tasks?.map((task) => {
						const rowBg = statusColor[task.status] || statusColor.default;

						return (
							<tr
								key={task._id}
								className={` text-left cursor-pointer hover:bg-gray-200/50 ${rowBg}`}
								onClick={() => goToTask(task._id)}
							>
								<td className=" py-5 pl-5 text-sm font-normal text-primary-400 border-b border-custom-border">
									{task.title}
								</td>

								<td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
									{task._id}
								</td>

								<td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
									{task.createdAt
										? new Date(task.createdAt).toLocaleDateString('en-US')
										: 'N/A'}
								</td>

								<td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
									{task.status}
								</td>

								<td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
									{task.recurring ? 'Yes' : 'No'}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default AllUsersTasksList;
