import ButtonComponent from "../../components/ButtonComponent";
import CreditsDropdown from "../../components/adminCredits/CreditDropDown";

interface Task {
	id?: string;
	role?: string;
	name?: string;
	email?: string;
	description?: string;
	status?: string;
	assignedTo?: string;
	dueDate?: string;
	type?: string;
	actions?: boolean;
	creditsActions?: boolean;
	taskStatus?: string;
	customerName?: string;
	customerEmail?: string;
	creditsRemaining?: string;
	expiringCredits?: string;
	lastTopUpDate?: string;
	phone?: string;
	plan?: string;
	customerStatus?: string;
	customerCredits?: string;
	customerLastLogin?: string;
	customerActions?: boolean;
	invoiceNumber?: string;
	user?: string;
	invoiceDate?: string;
	invoiceAmount?: string;
	invoicePaymentMethod?: string;
	invoiceActions?: boolean;
	teamManagementName?: string;
	teamManagementEmail?: string;
	teamManagementRole?: string;
	teamManagementTeamMemberCount?: string | number;
	teamManagementActions?: boolean;
}
type TaskTableProps = {
	tasks: Task[];
	tasksHeader: string[];
};

const TaskTable = ({ tasks, tasksHeader }: TaskTableProps) => {
	const getStatusBadge = (status: string) => {
		const baseClasses = "px-4 py-2 rounded-full text-sm font-medium";

		switch (status) {
			case "In Progress":
				return `${baseClasses} bg-[#E8EDF2] text-primary-100`;
			case "Pending":
				return `${baseClasses} bg-[#E8EDF2] text-primary-100`;
			case "Completed":
				return `${baseClasses} bg-[#E8EDF2] text-primary-100`;
			default:
				return `${baseClasses} bg-[#E8EDF2] text-primary-100`;
		}
	};

	return (
		<div className="w-full py-4">
			<div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="bg-gray-50 border-b border-gray-200">
								{tasksHeader?.map((header, index) => (
									<th key={index} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{tasks?.map((task, index) => (
								<tr key={index} className="hover:bg-slate-300/50 transition-colors">
									{task?.id && <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.id}</td>}
                  {task?.teamManagementName && <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.teamManagementName}</td>}

									{task?.customerName && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">{task?.customerName}</td>
									)}

									{task?.invoiceNumber && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">{task?.invoiceNumber}</td>
									)}

									{(task?.description || task?.name || task?.type) && (
										<td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
											{task?.description || task?.name || task?.type}
										</td>
									)}
                  {task?.teamManagementEmail && <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
											{task?.teamManagementEmail}
										</td> }
                    {task?.teamManagementRole && <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
											{task?.teamManagementRole}
										</td> }
                    {task?.teamManagementTeamMemberCount && <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
											{task?.teamManagementTeamMemberCount}
										</td> }

									{task?.user && <td className="px-6 py-4 text-sm font-medium text-gray-900">{task?.user}</td>}
									{task?.invoiceAmount && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">{task?.invoiceAmount}</td>
									)}
									{task?.invoiceDate && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">{task?.invoiceDate}</td>
									)}
									{task?.invoicePaymentMethod && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">{task?.invoicePaymentMethod}</td>
									)}

									{task?.customerEmail && <td className="px-6 py-4 text-sm text-gray-600">{task?.customerEmail}</td>}
									{task?.phone && <td className="px-6 py-4 text-sm text-gray-600">{task?.phone}</td>}
									{task?.plan && <td className="px-6 py-4 text-sm text-gray-600">{task?.plan}</td>}
									{task?.creditsRemaining && (
										<td className="px-6 py-4 text-sm text-gray-600">{task?.creditsRemaining}</td>
									)}

									{task?.expiringCredits && (
										<td className="px-6 py-4 text-sm text-gray-600">{task?.expiringCredits}</td>
									)}
									{task?.customerCredits && (
										<td className="px-6 py-4 text-sm text-gray-600">{task?.customerCredits}</td>
									)}
									{(task?.status || task?.taskStatus) && (
										<td className="px-6 py-4">
											<span className={getStatusBadge(task?.status || task?.taskStatus || "Unknown")}>
												{task.status || task?.taskStatus || "Unknown"}
											</span>
										</td>
									)}
									{task?.customerStatus && (
										<td className="px-6 py-4">
											<span className={getStatusBadge(task?.customerStatus)}>{task?.customerStatus}</span>
										</td>
									)}
									{task?.customerLastLogin && (
										<td className="px-6 py-4 text-sm text-gray-600">{task?.customerLastLogin}</td>
									)}

									{task?.assignedTo ||
										(task?.status && (
											<td className="px-6 py-4 text-sm text-gray-600">{task?.assignedTo || task?.status}</td>
										))}

									{task.dueDate && <td className="px-6 py-4 text-sm text-gray-600">{task?.dueDate}</td>}

									{task?.lastTopUpDate && <td className="px-6 py-4 text-sm text-gray-600">{task?.lastTopUpDate}</td>}
									{task?.actions && (
										<td className="px-6 py-4 text-sm text-gray-600">
											<ButtonComponent
												title="Open Task"
												className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
											/>
										</td>
									)}
									{task?.customerActions && (
										<td className="px-6 py-4 text-sm text-gray-600">
											<ButtonComponent
												title="View Profile"
												className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
											/>
										</td>
									)}
                  {task?.teamManagementActions && (
										<td className="px-6 py-4 text-sm text-gray-600">
											<ButtonComponent
												title="Edit Role"
												className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
											/>
										</td>
									)}
									{task?.invoiceActions && (
										<td className="px-6 py-4 text-sm text-gray-600">
											<div className="flex flex-col w-full gap-2 justify-end">
												<ButtonComponent
													title="Download PDF"
													className=" bg-[#EBEDF2] text-[12px] text-black font-medium hover:bg-gray-300 px-3 py-2 rounded-full w-[150px]"
												/>
												<ButtonComponent
													title="Email Invoice"
													className=" bg-[#EBEDF2] text-[12px] text-black font-medium hover:bg-gray-300 px-3 py-2 rounded-full w-[150px]"
												/>
											</div>
										</td>
									)}
									{task?.creditsActions && (
										<td className="px-6 py-4 text-sm text-gray-600">
											<CreditsDropdown />
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default TaskTable;
