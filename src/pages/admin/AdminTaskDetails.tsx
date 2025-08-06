// ...existing imports...
import { Select, message, Modal } from "antd";
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
	createdBy?: string | { _id: string; email: string; firstName?: string; lastName?: string };
	customerName?: string;
	customerEmail?: string;
	plan?: string;
	credits?: number;
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
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
	const [isReassignModalOpen, setIsReassignModalOpen] = useState<boolean>(false);

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

	// Fetch available users based on current user role
	useEffect(() => {
		const fetchAvailableUsers = async () => {
			try {
				if (user?.role === 'ADMIN') {
					// Admin can see all BASIC and MANAGER users, plus themselves
					await getUsersByRole(['BASIC', 'MANAGER', "ADMIN"]);
				} else if (user?.role === 'MANAGER') {
					// Manager can see all BASIC users, plus themselves
					await getUsersByRole(['BASIC']);
				} else if (user?.role === 'BASIC') {
					// Basic/Customer users can only see themselves
					await getUsersByRole(['BASIC']);
				}
			} catch (error) {
				console.error('Error fetching available users:', error);
				message.error('Error loading users');
			}
		};

		if (user?.role) {
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
			setIsAssignModalOpen(false);
		}
	};

	const handleDeleteTask = async () => {
		if (!task) return;

		try {
			setAssigning(true);
			const response = await deleteTask(task._id);
			
			if (response?.success) {
				message.success('Task deleted successfully!');
				// Navigate based on user role after successful deletion
				if (user?.role === 'ADMIN') {
					navigate('/admin');
				} else if (user?.role === 'MANAGER') {
					navigate('/manager');
				} else {
					navigate('/basic');
				}
			} else {
				message.error(response?.message || 'Failed to delete task');
			}
		} catch (error) {
			console.error('Error deleting task:', error);
			message.error('Failed to delete task. Please try again.');
		} finally {
			setAssigning(false);
			setIsDeleteModalOpen(false);
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
			setIsReassignModalOpen(false);
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

	// Helper function to determine plan type
	const getPlanType = (plan?: string, credits?: number) => {
		if (plan === '10_credits' || credits === 10) {
			return 'Basic';
		}
		return 'Unlimited';
	};

	// Get customer information
	const getCustomerInfo = () => {
		if (task?.customerName && task?.customerEmail) {
			return {
				name: task.customerName,
				email: task.customerEmail,
				plan: getPlanType(task.plan, task.credits)
			};
		}
		
		// Fallback to createdBy if available
		if (task?.createdBy) {
			if (typeof task.createdBy === 'object' && task.createdBy.email) {
				return {
					name: `${task.createdBy.firstName || ''} ${task.createdBy.lastName || ''}`.trim() || 'Unknown',
					email: task.createdBy.email,
					plan: getPlanType(task.plan, task.credits)
				};
			}
		}
		
		return null;
	};

	const customerInfo = getCustomerInfo();

	// Filter available users based on current user role
	const getAvailableUsers = () => {
		if (!users || !user) return [];

		const filteredUsers = [...users];

		// Add current user to the list if they're not already included
		const currentUserInList = users.find((u: { _id: string }) => u._id === user._id);
		if (!currentUserInList && user._id) {
			filteredUsers.push({
				_id: user._id,
				firstName: user.firstName || user.userName || 'Current',
				lastName: user.lastName || 'User',
				email: user.email || '',
				role: user.role || 'BASIC',
				userName: user.userName || user.email || ''
			});
		}

		// Apply role-based filtering
		if (user.role === 'ADMIN') {
			// Admin can see all BASIC and MANAGER users, plus themselves
			return filteredUsers.filter((u: { role: string; _id: string }) => 
				u.role === 'BASIC' || u.role === 'MANAGER' || u._id === user._id
			);
		} else if (user.role === 'MANAGER') {
			// Manager can see all BASIC users, plus themselves
			return filteredUsers.filter((u: { role: string; _id: string }) => 
				u.role === 'BASIC' || u._id === user._id
			);
		} else if (user.role === 'BASIC' || user.role === 'CUSTOMER') {
			// Basic/Customer users can only see themselves
			return filteredUsers.filter((u: { _id: string }) => u._id === user._id);
		}

		return filteredUsers;
	};

	const availableUsers = getAvailableUsers();

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

			{/* Customer Information Section */}
			{customerInfo && (
				<div className="bg-gradient-to-br from-white to-blue-50 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 mb-6 lg:mb-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
							<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<h2 className="text-xl sm:text-2xl font-bold text-gray-800">Customer Information</h2>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Customer Name */}
						<div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm">
							<div className="flex items-center gap-2 mb-3">
								<svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								<label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Customer Name</label>
							</div>
							<p className="text-gray-900 font-medium">{customerInfo.name}</p>
						</div>

						{/* Customer Email */}
						<div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm">
							<div className="flex items-center gap-2 mb-3">
								<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								<label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Email</label>
							</div>
							<p className="text-gray-900 font-medium">{customerInfo.email}</p>
						</div>

						{/* Plan Type */}
						<div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm">
							<div className="flex items-center gap-2 mb-3">
								<svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Plan Type</label>
							</div>
							<div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
								customerInfo.plan === 'Basic' 
									? 'bg-blue-100 text-blue-800' 
									: 'bg-purple-100 text-purple-800'
							}`}>
								<div className={`w-2 h-2 rounded-full ${
									customerInfo.plan === 'Basic' ? 'bg-blue-500' : 'bg-purple-500'
								}`}></div>
								{customerInfo.plan}
							</div>
						</div>
					</div>
				</div>
			)}

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
											title="Delete Task"
											onClick={() => setIsDeleteModalOpen(true)}
											className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
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
											options={availableUsers?.map((user: { firstName: string; lastName: string; email: string; role: string; _id: string }) => ({
												label: `${user?.firstName} ${user?.lastName} (${user?.email}) - ${user?.role}`,
												value: user?._id,
											}))}
										/>
										<div className="flex gap-2">
											<ButtonComponent
												title="Reassign Task"
												onClick={() => setIsReassignModalOpen(true)}
												className={`flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${!selectedUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
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
										options={availableUsers?.map((user: { firstName: string; lastName: string; email: string; role: string; _id: string }) => ({
											label: `${user?.firstName} ${user?.lastName} (${user?.email}) - ${user?.role}`,
											value: user?._id,
										}))}
									/>
									<ButtonComponent
										title="Assign Task"
										onClick={() => setIsAssignModalOpen(true)}
										className={`w-full bg-primary-50 text-white py-2 rounded-md hover:bg-primary-200 ${!selectedUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
									/>
								</div>
							</div>
						)}
					</div>

					{/* Available Users List */}
					<div className="bg-white rounded-lg border border-slate-300 p-4 sm:p-6">
						<h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Available Users</h2>
						<div className="max-h-64 overflow-y-auto space-y-2 pr-2">
							{availableUsers?.length > 0 ? (
								availableUsers.map((user: { firstName: string; lastName: string; email: string; role: string; _id: string }) => (
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

			{/* Delete Confirmation Modal */}
			<Modal
				open={isDeleteModalOpen}
				closable={true}
				cancelText="Cancel"
				okText={assigning ? "Deleting..." : "Delete Task"}
				onCancel={() => setIsDeleteModalOpen(false)}
				onOk={handleDeleteTask}
				centered={true}
				title={
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
							<svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
						</div>
						<span className="text-lg font-semibold text-gray-900">Delete Task</span>
					</div>
				}
				okButtonProps={{
					style: {
						backgroundColor: '#EF4444', // Red-500
						borderColor: '#EF4444',
						color: '#fff',
					},
					disabled: assigning,
				}}
			>
				<div className="py-4">
					<p className="text-gray-700 mb-4">Are you sure you want to delete this task?</p>
					<div className="bg-gray-50 rounded-md p-3 border border-gray-200 mb-4">
						<p className="font-medium text-gray-900">{task?.title}</p>
						<p className="text-sm text-gray-600 mt-1">{task?.description}</p>
					</div>
					<p className="text-sm text-red-600">
						This action cannot be undone. The task and all its associated data will be permanently deleted.
					</p>
				</div>
			</Modal>

			{/* Assign Task Confirmation Modal */}
			<Modal
				open={isAssignModalOpen}
				closable={true}
				cancelText="Cancel"
				okText={assigning ? "Assigning..." : "Assign Task"}
				onCancel={() => setIsAssignModalOpen(false)}
				onOk={handleAssignTask}
				centered={true}
				title={
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
							<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
							</svg>
						</div>
						<span className="text-lg font-semibold text-gray-900">Assign Task</span>
					</div>
				}
				okButtonProps={{
					style: {
						backgroundColor: '#4880FF', // Primary blue
						borderColor: '#4880FF',
						color: '#fff',
					},
					disabled: assigning || !selectedUserId,
				}}
			>
				<div className="py-4">
					<p className="text-gray-700 mb-4">Are you sure you want to assign this task?</p>
					<div className="bg-gray-50 rounded-md p-3 border border-gray-200 mb-4">
						<p className="font-medium text-gray-900">{task?.title}</p>
						<p className="text-sm text-gray-600 mt-1">{task?.description}</p>
					</div>
					{selectedUserId && (
						<div className="bg-blue-50 rounded-md p-3 border border-blue-200">
							<p className="text-sm text-blue-800">
								<strong>Assigning to:</strong> {
									users?.find((user: { _id: string }) => user._id === selectedUserId)?.firstName + ' ' +
									users?.find((user: { _id: string }) => user._id === selectedUserId)?.lastName + 
									' (' + users?.find((user: { _id: string }) => user._id === selectedUserId)?.email + ')'
								}
							</p>
						</div>
					)}
				</div>
			</Modal>

			{/* Reassign Task Confirmation Modal */}
			<Modal
				open={isReassignModalOpen}
				closable={true}
				cancelText="Cancel"
				okText={assigning ? "Reassigning..." : "Reassign Task"}
				onCancel={() => setIsReassignModalOpen(false)}
				onOk={handleReassignTask}
				centered={true}
				title={
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
							<svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
							</svg>
						</div>
						<span className="text-lg font-semibold text-gray-900">Reassign Task</span>
					</div>
				}
				okButtonProps={{
					style: {
						backgroundColor: '#10B981', // Green-500
						borderColor: '#10B981',
						color: '#fff',
					},
					disabled: assigning || !selectedUserId,
				}}
			>
				<div className="py-4">
					<p className="text-gray-700 mb-4">Are you sure you want to reassign this task?</p>
					<div className="bg-gray-50 rounded-md p-3 border border-gray-200 mb-4">
						<p className="font-medium text-gray-900">{task?.title}</p>
						<p className="text-sm text-gray-600 mt-1">{task?.description}</p>
					</div>
					{selectedUserId && (
						<div className="bg-green-50 rounded-md p-3 border border-green-200">
							<p className="text-sm text-green-800">
								<strong>Reassigning to:</strong> {
									users?.find((user: { _id: string }) => user._id === selectedUserId)?.firstName + ' ' +
									users?.find((user: { _id: string }) => user._id === selectedUserId)?.lastName + 
									' (' + users?.find((user: { _id: string }) => user._id === selectedUserId)?.email + ')'
								}
							</p>
						</div>
					)}
					<p className="text-sm text-orange-600 mt-3">
						This will transfer the task from the current assignee to the new user.
					</p>
				</div>
			</Modal>
		</div>
	);
};

export default AdminTaskDetails;