import ButtonComponent from "../../components/generalComponents/ButtonComponent";
import CreditsDropdown from "../../components/adminComponents/adminCredits/CreditDropDown";
import { useNavigate } from "react-router-dom";
import { generatePDF } from "../../utils/pdfGenerator";
import { dummyInvoiceData, InvoiceData } from "../../components/generalComponents/InvoiceTemplate";
import { getTaskStatusBadgeClasses } from '../../utils/taskStatusUtils';
import useAuthStore from '../../stores/authStore';

interface Task {
	id?: string;
	role?: string;
	name?: string;
	email?: string;
	description?: string;
	status?: string;
	assignedTo?:
		| string
		| { _id: string; email: string; firstName?: string; lastName?: string };
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
	manager?: boolean;
};

const TaskTable = ({ tasks, tasksHeader, manager }: TaskTableProps) => {
	const navigate = useNavigate();
	const { user } = useAuthStore();

	// Check if current user is assigned to the task
	const isUserAssignedToTask = (task: Task) => {
		if (!user?._id || !task.assignedTo) return false;

		// If assignedTo is a string (user ID), compare directly
		if (typeof task.assignedTo === 'string') {
			return task.assignedTo === user.email;
		}

		// If assignedTo is an object with _id, compare the _id
		if (typeof task.assignedTo === 'object' && task.assignedTo._id) {
			return task.assignedTo._id === user._id;
		}

		return false;
	};
	const handleProfile = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		navigate('/profile');
	};
	const handleDownloadPdf = async (inVoiceData: InvoiceData) => {
		await generatePDF(inVoiceData);
	};
	return (
		<div className="w-full py-4">
			<div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="bg-gray-50 border-b border-gray-200">
								{tasksHeader?.map((header, index) => (
									<th
										key={index}
										className="px-6 py-4 text-center text-sm font-semibold text-gray-900"
									>
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{tasks?.map((task, index) => (
								<tr
									key={index}
									className="hover:bg-slate-300/50 transition-colors"
								>
									{task?.id && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											{task.id}
										</td>
									)}
									{task?.teamManagementName && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											{task.teamManagementName}
										</td>
									)}

									{task?.customerName && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											{task?.customerName}
										</td>
									)}

									{task?.invoiceNumber && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											{task?.invoiceNumber}
										</td>
									)}

									{(task?.description || task?.name || task?.type) && (
										<td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
											{task?.description || task?.name || task?.type}
										</td>
									)}
									{task?.teamManagementEmail && (
										<td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
											{task?.teamManagementEmail}
										</td>
									)}
									{task?.teamManagementRole && (
										<td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
											{task?.teamManagementRole}
										</td>
									)}
									{task?.teamManagementTeamMemberCount && (
										<td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
											{task?.teamManagementTeamMemberCount}
										</td>
									)}

									{task?.user && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											{task?.user}
										</td>
									)}
									{task?.invoiceAmount && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											{task?.invoiceAmount}
										</td>
									)}
									{task?.invoiceDate && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											{task?.invoiceDate}
										</td>
									)}
									{task?.invoicePaymentMethod && (
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											{task?.invoicePaymentMethod}
										</td>
									)}

									{task?.customerEmail && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.customerEmail}
										</td>
									)}
									{task?.phone && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.phone}
										</td>
									)}
									{task?.plan && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.plan}
										</td>
									)}
									{task?.creditsRemaining && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.creditsRemaining}
										</td>
									)}

									{task?.expiringCredits && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.expiringCredits}
										</td>
									)}
									{task?.customerCredits && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.customerCredits}
										</td>
									)}
									{(task?.status || task?.taskStatus) && (
										<td className="px-6 py-4">
											<span
												className={getTaskStatusBadgeClasses(
													task?.status || task?.taskStatus || 'Unknown'
												)}
											>
												{task.status || task?.taskStatus || 'Unknown'}
											</span>
										</td>
									)}
									{task?.customerStatus && (
										<td className="px-6 py-4">
											<span
												className={getTaskStatusBadgeClasses(
													task?.customerStatus
												)}
											>
												{task?.customerStatus}
											</span>
										</td>
									)}
									{task?.customerLastLogin && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.customerLastLogin}
										</td>
									)}

									{(task?.assignedTo || task?.status) && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.assignedTo ? (
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-green-500 rounded-full"></div>
													<span className="text-green-700 font-medium">
														{typeof task?.assignedTo === 'object' &&
														task?.assignedTo?.email
															? `${task.assignedTo?.firstName || ''} ${
																	task.assignedTo?.lastName || ''
															  }`.trim() || task.assignedTo?.email
															: typeof task?.assignedTo === 'string'
															? task.assignedTo
															: 'Unknown User'}
													</span>
												</div>
											) : (
												<div className="flex items-center gap-2">
													<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
													<span className="text-yellow-700 font-medium">
														Not Assigned
													</span>
												</div>
											)}
										</td>
									)}

									{task.dueDate && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.dueDate}
										</td>
									)}

									{task?.lastTopUpDate && (
										<td className="px-6 py-4 text-sm text-gray-600">
											{task?.lastTopUpDate}
										</td>
									)}
									{task?.actions && (
										<td className="px-6 py-4 text-sm text-gray-600">
											<div className="flex flex-col gap-2">
												<ButtonComponent
													title="Open Task"
													className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
													onClick={() => navigate(`/manager/task/${task.id}`)}
												/>
												{manager && isUserAssignedToTask(task) && (
													<ButtonComponent
														title="Chat"
														className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
														onClick={() => navigate(`/task/${task.id}`)}
													/>
												)}
											</div>
										</td>
									)}
									{task?.customerActions && (
										<td className="px-6 py-4 text-sm text-gray-600">
											<ButtonComponent
												title="View Profile"
												className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
												onClick={() =>
													handleProfile({ preventDefault: () => {} })
												}
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
													onClick={() => handleDownloadPdf(dummyInvoiceData)}
												/>
												{!manager && (
													<ButtonComponent
														title="Email Invoice"
														className=" bg-[#EBEDF2] text-[12px] text-black font-medium hover:bg-gray-300 px-3 py-2 rounded-full w-[150px]"
													/>
												)}
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
					{/* <InvoiceTemplate data={dummyInvoiceData}/> */}
				</div>
			</div>
		</div>
	);
};

export default TaskTable;
