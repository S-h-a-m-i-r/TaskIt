// ...existing imports...
import { Select, message } from "antd";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../components/generalComponents/ButtonComponent";
import useAuthStore from "../../stores/authStore";
import useTaskStore from "../../stores/taskStore";
import { getTaskStatusColors } from "../../utils/taskStatusUtils";
import useUserStore from "../../stores/userStore";

// Custom loading component with three dots animation
const LoadingDots: React.FC = () => {
	const [dots, setDots] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setDots(prev => prev === 3 ? 1 : prev + 1);
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex items-center gap-2 text-lg font-medium text-gray-700">
			<Loader className="animate-spin w-5 h-5" />
			<span className="min-w-[80px]">Loading{'.'.repeat(dots)}</span>
		</div>
	);
};

interface Task {
	_id: string;
	title: string;
	description: string;
	status: string;
	assignedTo?: string | { _id: string; email: string; firstName?: string; lastName?: string };
	createdAt?: string;
	dueDate?: string;
	messages?: Array<{
		content: string;
		createdAt: string;
	}>;
}

const AdminTaskDetails: React.FC = () => {
	const navigate = useNavigate();
	const { id: taskId } = useParams<{ id: string }>();
	const { user } = useAuthStore();
	const { viewTask, assignTask, deleteTask, reassignTask } = useTaskStore();
	const { users, loading: usersLoading, getUsersByRole } = useUserStore();

	const [task, setTask] = useState<Task | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [assigning, setAssigning] = useState<boolean>(false);
	const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
	const [isReassigning, setIsReassigning] = useState<boolean>(false);

	// Check if user has access (admin, manager, or customer)
	useEffect(() => {
		if (user?.role !== 'ADMIN' && user?.role !== 'MANAGER' && user?.role !== 'CUSTOMER') {
			message.error('Access denied. Admin, Manager, or Customer privileges required.');
			// Redirect based on user role
			if (user?.role === 'ADMIN') {
				navigate('/admin');
			} else if (user?.role === 'MANAGER') {
				navigate('/manager');
			} else {
				navigate('/');
			}
		}
	}, [user, navigate]);

	const handleGoBack = () => {
		if (user?.role === 'ADMIN') {
			navigate('/admin/tasks');
		} else if (user?.role === 'MANAGER') {
			navigate('/manager/tasks');
		} else {
			navigate('/tasks');
		}
	};

	// Fetch task details
	useEffect(() => {
		const fetchTaskDetails = async () => {
			try {
				setLoading(true);
				const response = await viewTask(taskId!);
				if (response?.success) {
					setTask(response?.data?.task);
				} else {
					message.error('Failed to fetch task details');
				}
			} catch (error) {
				console.error('Error fetching task details:', error);
				message.error('Error loading task details');
			} finally {
				setLoading(false);
			}
		};

		if (taskId && (user?.role === 'ADMIN' || user?.role === 'MANAGER' || user?.role === 'CUSTOMER')) {
			fetchTaskDetails();
		}
	}, [taskId, viewTask, user]);

	// Fetch available users (customers and managers only)
	useEffect(() => {
		const fetchAvailableUsers = async () => {
			try {
				// Fetch both customers and managers in a single request
				await getUsersByRole(['CUSTOMER', 'MANAGER']);
			} catch (error) {
				console.error('Error fetching available users:', error);
				message.error('Error loading users');
			}
		};

		if (user?.role === 'ADMIN' || user?.role === 'MANAGER' || user?.role === 'CUSTOMER') {
			fetchAvailableUsers();
		}
	}, [user, getUsersByRole]);

	const handleAssignTask = async () => {
		if (!selectedUserId || !task) return;

		try {
			setAssigning(true);
			const response = await assignTask(task._id, selectedUserId);
			
			if (response?.success) {
				message.success('Task assigned successfully!');
				// Refresh task details
				const taskResponse = await viewTask(taskId!);
				if (taskResponse?.success) {
					setTask(taskResponse?.data?.task);
				}
				setSelectedUserId(undefined); // Reset selection
			} else {
				message.error(response?.message || 'Failed to assign task');
			}
		} catch (error) {
			console.error('Error assigning task:', error);
			message.error('Failed to assign task. Please try again.');
		} finally {
			setAssigning(false);
		}
	};

	const handleDeleteTask = async () => {
		if (!task) return;

		try {
			setAssigning(true);
			const response = await deleteTask(task._id);
			
			if (response?.success) {
				message.success('Task deleted successfully!');
				// Navigate back to tasks list after deletion
				handleGoBack();
			} else {
				message.error(response?.message || 'Failed to delete task');
			}
		} catch (error) {
			console.error('Error deleting task:', error);
			message.error('Failed to delete task. Please try again.');
		} finally {
			setAssigning(false);
		}
	};

	const handleReassignTask = async () => {
		if (!selectedUserId || !task) return;

		try {
			setAssigning(true);
			const response = await reassignTask(task._id, selectedUserId);
			
			if (response?.success) {
				message.success('Task reassigned successfully!');
				// Refresh task details
				const taskResponse = await viewTask(taskId!);
				if (taskResponse?.success) {
					setTask(taskResponse?.data?.task);
				}
				setSelectedUserId(undefined); // Reset selection
				setIsReassigning(false); // Exit reassignment mode
			} else {
				message.error(response?.message || 'Failed to reassign task');
			}
		} catch (error) {
			console.error('Error reassigning task:', error);
			message.error('Failed to reassign task. Please try again.');
		} finally {
			setAssigning(false);
		}
	};

	if (loading || usersLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingDots />
			</div>
		);
	}

	if (!task) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">Task Not Found</h2>
					<ButtonComponent
						title="Go Back"
						onClick={handleGoBack}
						className="bg-primary-50 text-white px-6 py-2 rounded-md hover:bg-primary-200"
					/>
				</div>
			</div>
		);
	}

	const taskColor = getTaskStatusColors(task.status);

	return (
		<div className="p-4 sm:p-6 lg:p-9 w-full">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
				<div className="flex flex-col sm:flex-row sm:items-center gap-4">
					<ButtonComponent
						title="← Back to Tasks"
						onClick={handleGoBack}
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 w-fit"
					/>
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
						{user?.role === 'ADMIN' ? 'Admin' : user?.role === 'MANAGER' ? 'Manager' : 'Customer'} Task Details
					</h1>
				</div>
				<div className={`px-4 py-2 rounded-full text-sm font-medium ${taskColor.background} ${taskColor.text} w-fit`}>
					{task.status}
				</div>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
				{/* Task Details - Left Column */}
				<div className="xl:col-span-2 space-y-6 lg:space-y-8">
					{/* Task Information Card */}
					<div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
								<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
							</div>
							<h2 className="text-xl sm:text-2xl font-bold text-gray-800">Task Information</h2>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Title Section */}
							<div className="md:col-span-2">
								<div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm">
									<div className="flex items-center gap-2 mb-2">
										<svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
										</svg>
										<label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Title</label>
									</div>
									<p className="text-lg font-semibold text-gray-900 leading-relaxed">{task.title}</p>
								</div>
							</div>

							{/* Status Section */}
							<div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm">
								<div className="flex items-center gap-2 mb-3">
									<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</label>
								</div>
								<div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${taskColor.background} ${taskColor.text}`}>
									<div className={`w-2 h-2 rounded-full ${taskColor.text.replace('text-', 'bg-').replace('-700', '-500')}`}></div>
									{task.status}
								</div>
							</div>

							{/* Created Date */}
							{task?.createdAt && (
								<div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm">
									<div className="flex items-center gap-2 mb-3">
										<svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
										<label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Created</label>
									</div>
									<p className="text-gray-900 font-medium">{new Date(task.createdAt).toLocaleDateString('en-US', { 
										year: 'numeric', 
										month: 'long', 
										day: 'numeric' 
									})}</p>
								</div>
							)}

							{/* Due Date */}
							{task?.dueDate && (
								<div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm">
									<div className="flex items-center gap-2 mb-3">
										<svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Due Date</label>
									</div>
									<p className="text-gray-900 font-medium">{new Date(task.dueDate).toLocaleDateString('en-US', { 
										year: 'numeric', 
										month: 'long', 
										day: 'numeric' 
									})}</p>
								</div>
							)}
						</div>

						{/* Description Section */}
						<div className="mt-6">
							<div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm">
								<div className="flex items-center gap-2 mb-3">
									<svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									<label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Description</label>
								</div>
								<p className="text-gray-700 leading-relaxed">{task.description}</p>
							</div>
						</div>
					</div>

					{/* Task Messages/Comments */}
					{task?.messages && task.messages.length > 0 && (
						<div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
									<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-gray-800">Comments & Messages</h2>
								<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
									{task.messages.length}
								</span>
							</div>
							
							<div className="space-y-4">
								{task.messages.map((message: { content: string; createdAt: string }, index: number) => (
									<div key={index} className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm hover:shadow-md transition-all duration-200">
										<div className="flex items-start gap-3">
											<div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
												<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
												</svg>
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-gray-800 text-sm sm:text-base leading-relaxed break-words">{message?.content}</p>
												<div className="flex items-center gap-2 mt-2">
													<svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
													<p className="text-xs text-gray-500">
														{new Date(message?.createdAt).toLocaleString('en-US', {
															year: 'numeric',
															month: 'short',
															day: 'numeric',
															hour: '2-digit',
															minute: '2-digit'
														})}
													</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Assignment Panel - Right Column */}
				<div className="space-y-4 lg:space-y-6">
					<div className="bg-white rounded-lg border border-slate-300 p-4 sm:p-6">
						<h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Assignment</h2>
						{task?.assignedTo ? (
							<div className="space-y-4">
								<div className="p-3 bg-green-50 border border-green-200 rounded-md">
									<p className="text-green-800 font-medium">Currently Assigned</p>
									<p className="text-green-700 text-sm">
										{typeof task?.assignedTo === 'object' && task?.assignedTo?.email 
											? `${task?.assignedTo?.firstName || ''} ${task?.assignedTo?.lastName || ''}`.trim() || task?.assignedTo?.email
											: typeof task?.assignedTo === 'string' 
												? task?.assignedTo 
												: 'Unknown User'
										}
									</p>
								</div>
								
								{!isReassigning ? (
									<div className="space-y-2">
										<ButtonComponent
											title="Reassign Task"
											onClick={() => setIsReassigning(true)}
											className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
										/>
										<ButtonComponent
											title={assigning ? "Deleting..." : "Delete Task"}
											onClick={handleDeleteTask}
											className={`w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 ${assigning ? 'opacity-50 cursor-not-allowed' : ''}`}
										/>
									</div>
								) : (
									<div className="space-y-3">
										<div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
											<p className="text-blue-800 font-medium">Reassign to New User</p>
											<p className="text-blue-700 text-sm">Select a different user to assign this task to</p>
										</div>
										<Select
											placeholder="Select a user"
											value={selectedUserId}
											onChange={(value) => setSelectedUserId(value as string)}
											className="w-full"
											showSearch
											optionFilterProp="children"
											dropdownStyle={{ maxHeight: '200px', overflow: 'auto' }}
											options={users?.map((user: { firstName: string; lastName: string; email: string; role: string; _id: string }) => ({
												label: `${user?.firstName} ${user?.lastName} (${user?.email}) - ${user?.role}`,
												value: user?._id,
											}))}
										/>
										<div className="flex gap-2">
											<ButtonComponent
												title={assigning ? "Reassigning..." : "Reassign Task"}
												onClick={handleReassignTask}
												className={`flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${(!selectedUserId || assigning) ? 'opacity-50 cursor-not-allowed' : ''}`}
											/>
											<ButtonComponent
												title="Cancel"
												onClick={() => {
													setIsReassigning(false);
													setSelectedUserId(undefined);
												}}
												className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
											/>
										</div>
									</div>
								)}
							</div>
						) : (
							<div className="space-y-4">
								<div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
									<p className="text-yellow-800 font-medium">Unassigned</p>
									<p className="text-yellow-700 text-sm">This task is not assigned to anyone</p>
								</div>
								<div className="space-y-3">
									<label className="block text-sm font-medium text-gray-700">
										Assign to User (Customer/Manager)
									</label>
									<Select
										placeholder="Select a user"
										value={selectedUserId}
										onChange={(value) => setSelectedUserId(value as string)}
										className="w-full"
										showSearch
										optionFilterProp="children"
										dropdownStyle={{ maxHeight: '200px', overflow: 'auto' }}
										options={users?.map((user: { firstName: string; lastName: string; email: string; role: string; _id: string }) => ({
											label: `${user?.firstName} ${user?.lastName} (${user?.email}) - ${user?.role}`,
											value: user?._id,
										}))}
									/>
									<ButtonComponent
										title={assigning ? "Assigning..." : "Assign Task"}
										onClick={handleAssignTask}
										className={`w-full bg-primary-50 text-white py-2 rounded-md hover:bg-primary-200 ${(!selectedUserId || assigning) ? 'opacity-50 cursor-not-allowed' : ''}`}
									/>
								</div>
							</div>
						)}
					</div>

					{/* Available Users List */}
					<div className="bg-white rounded-lg border border-slate-300 p-4 sm:p-6">
						<h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Available Users</h2>
						<div className="max-h-64 overflow-y-auto space-y-2 pr-2">
							{users?.length > 0 ? (
								users.map((user: { firstName: string; lastName: string; email: string; role: string; _id: string }) => (
									<div key={user?._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-200 transition-colors border border-slate-300">
										<div className="flex-1 min-w-0">
											<p className="font-medium text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
											<p className="text-sm text-gray-600 truncate">{user?.email}</p>
										</div>
										<span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${
											user?.role === 'MANAGER' 
												? 'bg-blue-100 text-blue-800' 
												: 'bg-green-100 text-green-800'
										}`}>
											{user?.role}
										</span>
									</div>
								))
							) : (
								<p className="text-gray-500 text-center py-4">No users available</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminTaskDetails;