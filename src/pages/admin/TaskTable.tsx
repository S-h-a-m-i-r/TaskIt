import ButtonComponent from "../../components/generalComponents/ButtonComponent";
import TaskStatusDropdown from '../../components/generalComponents/TaskStatusDropdown';
import { useNavigate } from 'react-router-dom';
import { generatePDF } from '../../utils/pdfGenerator';
import {
	dummyInvoiceData,
	InvoiceData,
} from '../../components/generalComponents/InvoiceTemplate';
import { getTaskStatusBadgeClasses } from '../../utils/taskStatusUtils';
import useAuthStore from '../../stores/authStore';
import useTaskStore from '../../stores/taskStore';

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
	customerCreditsRemaining?: string;
	customerExpiringCredits?: string;
	customerLastTopUpDate?: string;
	phone?: string;
	plan?: string;
	customerStatus?: string;
	customerCredits?: string;
	customerLastLogin?: string;
	customerCreditsActions?: boolean;
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
	createAt?: string;
	// Additional fields for different use cases
	task_id?: string;
	Date?: string;
	Recurring?: string;
	date_joined?: string;
	'Task Made'?: string;
	'Total Credits'?: string;
	'Remaining Credits'?: string;
	Amount?: string;
	Action?: string;
	'User Id'?: string;
	'Last Login'?: string;
	memberLastLogin?: string;
	'Team memeber Count'?: string | number;
}

type TaskTableProps = {
	tasks: Task[];
	tasksHeader: string[];
	manager?: boolean;
	onTaskUpdate?: () => void;
};

const TaskTable = ({
	tasks,
	tasksHeader,
	manager,
	onTaskUpdate,
}: TaskTableProps) => {
	const navigate = useNavigate();
	const { user } = useAuthStore();
	const { getTaskList } = useTaskStore();

	// Check if current user is assigned to the task
	const isUserAssignedToTask = (task: Task) => {
		if (!user?._id || !task.assignedTo) return false;

		// If assignedTo is a string (user ID), compare directly
		if (typeof task.assignedTo === 'string') {
			return task.assignedTo === user._id || task.assignedTo === user.email;
		}
		console.log(task.assignedTo, user._id, 'task.assignedTo');

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

	const handleOpenTask = (task: Task, role: string) => {
		navigate(`/${role.toLowerCase()}/task/${task.id}`);
	};

	const handleStatusChange = async (taskId: string, newStatus: string) => {
		console.log(`Task ${taskId} status changed to ${newStatus}`);
		if (onTaskUpdate) {
			onTaskUpdate();
		} else {
			await getTaskList();
		}
	};

	// Function to render cell content based on header
	const renderCell = (task: Task, header: string) => {
		const headerLower = header.toLowerCase().trim();
		switch (headerLower) {
			case 'id':
			case 'task id':
			case 'customer id':
			case 'user id':
			case 'userid':
				return (
					<td className="px-6 py-4 text-sm font-medium text-gray-900">
						{task.id || task.task_id || task['User Id'] || '-'}
					</td>
				);

			case 'type':
			case 'description':
			case 'email':
				return (
					<td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
						{task.type ||
							task.description ||
							task.name ||
							task.customerEmail ||
							task.email ||
							'-'}
					</td>
				);

			case 'status':
				return (
					<td className="px-6 py-4 flex justify-center">
						{task.status || task.taskStatus ? (
							user?.role === 'MANAGER' || user?.role === 'ADMIN' ? (
								<TaskStatusDropdown
									taskId={task.id || ''}
									currentStatus={task?.status || task?.taskStatus || 'Unknown'}
									onStatusChange={(newStatus) =>
										handleStatusChange(task.id || '', newStatus)
									}
								/>
							) : (
								<span
									className={getTaskStatusBadgeClasses(
										task?.status || task?.taskStatus || 'Unknown'
									)}
								>
									{task.status || task?.taskStatus || 'Unknown'}
								</span>
							)
						) : (
							'-'
						)}
					</td>
				);

			case 'date':
			case 'due date':
			case 'date_joined':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.dueDate || task.Date || task.date_joined || '-'}
					</td>
				);

			case 'last login':
			case 'lastlogin':
			case 'member last login':
			case 'memberlastlogin':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task?.memberLastLogin || task.customerLastLogin || '-'}
					</td>
				);

			case 'assignedto':
			case 'assigned to':
				return (
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
				);

			case 'actions':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.actions || task.Action ? (
							<div className="flex flex-col gap-2">
								<ButtonComponent
									title="Open Task"
									className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
									onClick={() => handleOpenTask(task, user?.role || '')}
								/>
								{isUserAssignedToTask(task) && (
									<ButtonComponent
										title="Chat"
										className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
										onClick={() => navigate(`/task/${task.id}`)}
									/>
								)}
							</div>
						) : (
							'-'
						)}
					</td>
				);

			// Customer related columns
			case 'customername':
			case 'customer name':
			case 'name':
				return (
					<td className="px-6 py-4 text-sm font-medium text-gray-900">
						{task.customerName || task.name || '-'}
					</td>
				);

			case 'customeremail':
			case 'customer email':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.customerEmail || task.email || '-'}
					</td>
				);

			case 'customerstatus':
			case 'customer status':
				return (
					<td className="px-6 py-4">
						{task.customerStatus ? (
							<span className={getTaskStatusBadgeClasses(task.customerStatus)}>
								{task.customerStatus}
							</span>
						) : (
							'-'
						)}
					</td>
				);

			case 'creditsactions':
			case 'customer credits actions':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.customerCreditsActions ? (
							<ButtonComponent
								title="View Profile"
								className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
								onClick={() => handleProfile({ preventDefault: () => {} })}
							/>
						) : (
							'-'
						)}
					</td>
				);

			// Invoice related columns
			case 'invoicenumber':
			case 'invoice number':
				return (
					<td className="px-6 py-4 text-sm font-medium text-gray-900">
						{task.invoiceNumber || '-'}
					</td>
				);

			case 'amount':
				return (
					<td className="px-6 py-4 text-sm font-medium text-gray-900">
						{task.invoiceAmount || task.Amount || '-'}
					</td>
				);

			case 'invoicedate':
			case 'invoice date':
				return (
					<td className="px-6 py-4 text-sm font-medium text-gray-900">
						{task.invoiceDate || '-'}
					</td>
				);

			case 'invoicepaymentmethod':
			case 'invoice payment method':
				return (
					<td className="px-6 py-4 text-sm font-medium text-gray-900">
						{task.invoicePaymentMethod || '-'}
					</td>
				);

			case 'invoiceactions':
			case 'invoice actions':
				return (
					<td className=" py-4 text-sm text-gray-600 flex justify-center">
						{task.invoiceActions ? (
							<div className="flex flex-col w-full gap-2 justify-center">
								<ButtonComponent
									title="Download PDF"
									className="bg-[#EBEDF2] text-[12px] text-black font-medium hover:bg-gray-300 px-3 py-2 rounded-full w-[150px]"
									onClick={() => handleDownloadPdf(dummyInvoiceData)}
								/>
								{!manager && (
									<ButtonComponent
										title="Email Invoice"
										className="bg-[#EBEDF2] text-[12px] text-black font-medium hover:bg-gray-300 px-3 py-2 rounded-full w-[150px]"
									/>
								)}
							</div>
						) : (
							'-'
						)}
					</td>
				);

			// Credits related columns
			case 'customercreditsremaining':
			case 'customer credits remaining':
			case 'remaining credits':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task?.customerCreditsRemaining || task['Remaining Credits'] || '-'}
					</td>
				);
			case 'customerexpiringcredits':
			case 'customer expiring credits':
			case 'customer expiring credits ': // Note the trailing space
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task?.customerExpiringCredits || '-'}
					</td>
				);
			case 'customerlasttopupdate':
			case 'customer last top-up date':
			case 'customer last top up date':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.customerLastTopUpDate || '-'}
					</td>
				);

			// Team management related columns
			case 'team member name':
				return (
					<td className="px-6 py-4 text-sm font-medium text-gray-900">
						{task?.teamManagementName || '-'}
					</td>
				);

			case 'teammanagementemail':
			case 'team member email':
				return (
					<td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
						{task.teamManagementEmail || '-'}
					</td>
				);

			case 'teammanagementrole':
			case 'team member role':
				return (
					<td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
						{task.teamManagementRole || task.role || '-'}
					</td>
				);

			case 'teammanagementactions':
			case 'team member actions':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.teamManagementActions ? (
							<ButtonComponent
								title="Edit Role"
								className="text-[#5C758A] bg-none text-[14px] font-bold hover:bg-gray-300 px-3 py-2 rounded-full w-[100px]"
							/>
						) : (
							'-'
						)}
					</td>
				);

			// Other common columns
			case 'user':
				return (
					<td className="px-6 py-4 text-sm font-medium text-gray-900">
						{task.user || '-'}
					</td>
				);

			case 'phone':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.phone || '-'}
					</td>
				);

			case 'plan':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.plan || '-'}
					</td>
				);

			// Additional fields for different use cases
			case 'recurring':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.Recurring || '-'}
					</td>
				);

			case 'task made':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task['Task Made'] || '-'}
					</td>
				);

			case 'total credits':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task['Total Credits'] || task.customerCredits || '-'}
					</td>
				);

			case 'team memeber count':
			case 'team member count':
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{task.teamManagementTeamMemberCount ||
							task['Team memeber Count'] ||
							'-'}
					</td>
				);

			default: {
				// For any other headers, try to find a matching property
				const propertyKey = headerLower.replace(/\s+/g, '') as keyof Task;
				const value = task[propertyKey];
				return (
					<td className="px-6 py-4 text-sm text-gray-600">
						{value ? String(value) : '-'}
					</td>
				);
			}
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
									{tasksHeader.map((header) => renderCell(task, header))}
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