import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../../stores/taskStore";
import { TasksHeadersData } from "../../datadump";
// import { statusColor } from "../../utils/statusColor";   // path to helper

// Define types for the component
interface Task {
	_id: string;
	title: string;
	description: string;
	status: string;
	createdAt?: string;
	dueDate?:string;
	isRecurring?: boolean;
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
	InProgress: 'bg-yellow-50',
	Completed: 'bg-green-50',
	Closed: 'bg-red-50',
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
			<div className="max-h-[500px] overflow-y-auto">
				<table className="w-full border-separate border-spacing-y-2">
					<thead className="sticky top-0 bg-white z-10">
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
										{task?.description}
									</td>

									<td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
  {task.dueDate ? (
    <span className={
      new Date(task.dueDate) < new Date() 
        ? "text-red-600 font-medium" 
        : ""
    }>
      {new Date(task.dueDate).toLocaleDateString('en-US')}
      {new Date(task.dueDate) < new Date() && 
        <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
          Passed
        </span>
      }
    </span>
  ) : (
    <span className="text-gray-500 text-lg flex justify-start pl-5" title="No due date">∞</span>
  )}
</td>

									<td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
										{task.status}
									</td>

									<td className="py-5 pl-5 text-sm font-normal border-b border-custom-border max-md:hidden">
										{task.isRecurring ? 'Yes' : 'No'}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUsersTasksList;
