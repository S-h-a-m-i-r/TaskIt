import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/icons/ArrowLeft_icon.svg";
import { useEffect, useState, useCallback } from 'react';
import useTaskStore from '../../stores/taskStore';
import useAuthStore from '../../stores/authStore';
import { getTaskStatusColors } from '../../utils/taskStatusUtils';
import { Switch, message } from 'antd';
import { updateTaskStatusService } from '../../services/taskService';

import { ChatComponent } from '../../components/generalComponents';
import LoadingDots from '../../components/generalComponents/LoadingDots';
import TaskFiles from '../../components/generalComponents/TaskFiles';
import { TaskFile } from '../../types/task';

interface Message {
	senderId: {
		_id: string;
	};
	content: string;
	createdAt: string;
}

interface Task {
	_id: string;
	title: string;
	status: string;
	description: string;
	createdBy: string;
	creditCost: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
	assignedTo?:
		| string
		| { _id: string; email: string; firstName?: string; lastName?: string };
	files?: Array<{
		filename: string;
		fileSize: number;
		fileType: string;
		fileKey: string;
		uploadedAt: string;
	}>;
}
interface TaskStore {
	viewTask: (id: string) => Promise<{
		success: boolean;
		data: {
			messages: Message[];
			task: Task;
		};
		message?: string;
	}>;
}

interface AuthStore {
	user: {
		_id: string;
	} | null;
}

const TaskDetailsPage = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	const { id: taskId } = useParams();
	const { viewTask } = useTaskStore() as unknown as TaskStore;
	const { user } = useAuthStore() as AuthStore;
	const [messages, setMessages] = useState<Message[]>([]);
	const [task, setTask] = useState<Task | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);
	const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

	// Debounced task status toggle for customer
	const handleStatusToggle = useCallback(async (checked: boolean) => {
		if (!task) return;
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}
		setIsUpdatingStatus(true);
		const timer = setTimeout(async () => {
			try {
				const newStatus = checked ? 'Closed' : 'Completed';
				
				const response = await updateTaskStatusService(task._id, newStatus);
				
				if (response?.success) {
					message.success(`Task ${checked ? 'closed' : 'reopened'} successfully!`);
					// Refresh task details
					const taskResponse = await viewTask(taskId!);
					if (taskResponse?.success) {
						setTask(taskResponse?.data?.task);
					}
				} else {
					message.error(response?.message || 'Failed to update task status');
				}
			} catch (error) {
				console.error('Error updating task status:', error);
				message.error('Failed to update task status. Please try again.');
			} finally {
				setIsUpdatingStatus(false);
			}
		}, 500);

		setDebounceTimer(timer);
	}, [task, taskId, viewTask, debounceTimer]);

	// Cleanup timer on unmount
	useEffect(() => {
		return () => {
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
		};
	}, [debounceTimer]);

	// Check if toggle should be shown (only for completed tasks)
	const shouldShowToggle = () => {
		return task?.status === 'Completed' || task?.status === 'Closed';
	};

	// Get toggle state (checked when task is closed)
	const getToggleState = () => {
		return task?.status === 'Closed';
	};

	// Handle file removal - only update local state since useFileUpload.removeFile handles backend
	const handleRemoveFile = async (fileKey: string) => {
		if (!task) return;
		
		// Remove file from local state only
		// The backend request is already handled by useFileUpload.removeFile
		const updatedFiles = task.files?.filter(file => file.fileKey !== fileKey) || [];
		setTask(prev => prev ? { ...prev, files: updatedFiles } : null);
	};

	// Handle new files added
	const handleFilesAdded = (newFiles: TaskFile[]) => {
		if (!task) return;
		
		const updatedFiles = [
			...(task.files || []),
			...newFiles.map(file => ({
				filename: file.filename,
				fileSize: file.fileSize,
				fileType: file.fileType,
				fileKey: file.fileKey,
				uploadedAt: file.uploadedAt,
			}))
		];
		setTask(prev => prev ? { ...prev, files: updatedFiles } : null);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await viewTask(taskId!);
				if (response.success) {
					setMessages(response.data.messages);
					setTask(response.data.task);
				} else {
					console.error('Failed to fetch task details:', response.message);
				}
			} catch (error) {
				console.error('Error fetching task details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [taskId, viewTask]);
	getTaskStatusColors(task?.status || '');

	return (
		<div className="p-9 w-full flex flex-col gap-10">
			{loading ? (
				<div className="flex items-center justify-center h-64">
					<LoadingDots text="Loading task details" />
				</div>
			) : (
				<>
					<div className="flex items-center justify-between">
						<div>
						<div className="flex items-center gap-3">
							<div
								className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex"
								onClick={handleGoBack}
							>
								<img src={backIcon} alt="back" />
							</div>
							<span className="font-semibold text-2xl">
								{' '}
								{task?.title}
								<span className="text-[#3B82F6]"> {task?.status}</span>
							</span>
						</div>
				{shouldShowToggle() && (
					 <div className="flex justify-between items-center min-w-[180px] max-w-[220px] gap-4 rounded-xl px-4 py-3 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 bg-white">
					 <div className="flex items-center gap-2">
					   <div
						 className={`w-2 h-2 rounded-full transition-colors duration-200 ${
						   task?.status === 'Completed' ? "bg-green-500" : "bg-orange-400"
						 }`}
					   />
					   <span
						 className={`text-sm font-medium transition-colors duration-200 ${
						   task?.status === 'Completed' ? "text-green-700" : "text-gray-700"
						 }`}
					   >
						 {task?.status === 'Completed' ? "Task Complete" : "Close Task"}
					   </span>
					 </div>
			   
					 <Switch
					   checked={getToggleState()}
					   onChange={handleStatusToggle}
					   loading={isUpdatingStatus}
					   checkedChildren="✓"
					   unCheckedChildren="○"
					   size="default"
					   style={{
						 backgroundColor: getToggleState() ? "#10B981" : "#D1D5DB",
					   }}
					   className="flex-shrink-0"
					 />
				   </div>
				)}
				</div>
				
				{/* Task Status Toggle for Customer */}
				
			</div>
			<div className="bg-gray-100 w-full border border-1"></div>
			<div className="flex max-md:flex-col gap-6 h-full">
				<div className="md:w-1/2">
					<h2 className="text-[#3B82F6] text-xl text-left font-semibold mb-6">
						{' '}
						{task?.createdAt ? new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
					</h2>
					<div className="w-full max-w-570px text-left flex flex-col gap-6 ">
						<h2 className="font-semibold text-xl"> Task Details </h2>
						<p> {task?.description}</p>

						{/* Assignment Status */}
						<div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
							<h3 className="font-semibold text-lg mb-2">Assignment Status</h3>
							{task?.assignedTo ? (
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 bg-green-500 rounded-full"></div>
									<span className="text-green-700 font-medium">Assigned</span>
									<span className="text-gray-600 text-sm">
										{typeof task.assignedTo === 'object' &&
										task.assignedTo?.email
											? `${task.assignedTo?.firstName || ''} ${
													task.assignedTo?.lastName || ''
											  }`.trim() || task.assignedTo?.email
											: typeof task.assignedTo === 'string'
											? task.assignedTo
											: 'Unknown User'}
									</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
									<span className="text-yellow-700 font-medium">
										Not Assigned
									</span>
									<span className="text-gray-600 text-sm">
										Waiting for assignment
									</span>
								</div>
							)}
						</div>
						<div className="bg-gray-100 w-full border border-1"></div>
						<div>
							<h2 className="mb-6"> Attachments</h2>
							<TaskFiles 
								files={task?.files || []} 
								readonly={false}
								taskId={task?._id}
								onRemoveFile={handleRemoveFile}
								onFilesAdded={handleFilesAdded}
								className="mt-4"
							/>
						</div>
					</div>
				</div>
				{task && user && (
					<ChatComponent
						user={user}
						task={task}
						messages={messages}
						onMessagesUpdate={setMessages}
						className="flex-1"
					/>
				)}
			</div>
				</>
			)}
		</div>
	);
};

export default TaskDetailsPage;
