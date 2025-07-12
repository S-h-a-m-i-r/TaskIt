import { useNavigate } from "react-router-dom";
import { tasksBodyData, TasksHeadersData } from "../../datadump";
import { useState } from "react";

const AllUsersTasksList = () => {
	const [status] = useState(
		tasksBodyData.reduce((acc: Record<string, string>, task) => {
			acc[task.task_id] = task.status;
			return acc;
		}, {} as Record<string, string>)
	);
	const navigate = useNavigate();
	const redirection = (id: unknown) => {
		navigate(`/task/${id}`);
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
									["Task Id", "Date", "Recurring", "Status"].includes(header)
										? "hidden md:table-cell"
										: ""
								}`}
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tasksBodyData.map((task, index) => (
						<tr
							key={index}
							className={` hover:bg-gray-200/50 space-y-2 cursor-pointer  ${
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
							<td className="text-left py-5 pl-5 font-normal text-sm border-b border-custom-border max-md:hidden">
								{task.task_id}
							</td>
							<td className="text-left py-5 pl-5 font-normal text-sm border-b border-custom-border max-md:hidden">
								{task.Date}
							</td>
							<td className="text-left py-5 pl-5 font-normal text-sm border-b border-custom-border max-md:hidden">
								{status[task.task_id]}
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
