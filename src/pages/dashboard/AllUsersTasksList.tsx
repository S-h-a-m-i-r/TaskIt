import { useNavigate } from "react-router-dom";
import { tasksBodyData, TasksHeadersData } from "../../datadump";
import { useState } from "react";

const AllUsersTasksList = () => {
	const [status, setStatus] = useState(
		tasksBodyData.reduce((acc: Record<string, string>, task) => {
			acc[task.task_id] = task.status;
			return acc;
		}, {} as Record<string, string>)
	);
	const navigate = useNavigate();
	const redirection = (id: unknown) => {
		navigate(`/task/${id}`);
	};

	const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>, id: string, newStatus: string): void => {
		e.stopPropagation();
		setStatus((prev: Record<string, string>) => ({
			...prev,
			[id]: newStatus,
		}));
	};

	return (
		<div className="bg-white">
			<table className="w-full border-separate border-spacing-y-2">

				<thead>
					<tr>
					{TasksHeadersData.map((header, index) => (
  <th
    key={index}
    className={`py-3 pl-5 text-left text-[14px] font-normal ${
      ['Task Id', 'Date', 'Recurring', "Status"].includes(header) ? 'hidden md:table-cell' : ''
    }`}
  >
    {header}
  </th>
))}
					</tr>
				</thead>
				<tbody >
					{tasksBodyData.map((task, index) => (
						<tr
							key={index}
							className={ ` hover:bg-gray-200/50 space-y-2 cursor-pointer  ${
								status[task.task_id] === "Submitted"
									? "bg-blue-50"
									: status[task.task_id] === "Completed"
									? "bg-green-50"
									: status[task.task_id] === "In Progress"
									? "bg-yellow-50"
									: status[task.task_id] === "Task Closed"
									? "bg-red-50"
									: "bg-gray-50"
							}`}
							onClick={() => redirection(task.task_id)}
						>
							<td className=" text-left py-5 pl-5 text-primary-400 font-normal text-sm border-b border-custom-border max-md:w-fit">
								{task.name}
							</td>
							<td className="text-left py-5 pl-5 font-normal text-sm border-b border-custom-border max-md:hidden">{task.task_id}</td>
							<td className="text-left py-5 pl-5 font-normal text-sm border-b border-custom-border max-md:hidden">{task.Date}</td>
							<td className="text-left py-5 pl-5 font-normal text-sm border-b border-custom-border max-md:hidden">{status[task.task_id]}</td>
							<td className="text-left py-5 pl-5 font-normal text-sm border-b border-custom-border">
								<div className="relative inline-block w-full">
									<select
										id={index.toString()}
										className="appearance-none w-full bg-transparent text-gray-600 font-medium text-base border-none focus:outline-none cursor-pointer"
										onClick={(e) => e.stopPropagation()}
										onChange={(e) => handleStatus(e, task.task_id, e.target.value)}
										defaultValue={task.status}
									>
										<option value="Completed">Completed</option>
										<option value="In Progress">In Progress</option>
										<option value="Task Closed">Task Closed</option>
										<option value="Submitted">submitted</option>
									</select>
									<div className="absolute inset-y-0 right-1 flex items-center pr-2 pointer-events-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4 text-gray-600"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								</div>
							</td>
							<td className=" max-md:hidden text-left py-5 pl-5 font-normal text-sm border-b border-custom-border">
								{task.Recurring}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AllUsersTasksList;
