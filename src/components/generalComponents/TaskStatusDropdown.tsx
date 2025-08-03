import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { updateTaskStatusService } from '../../services/taskService';
import { getTaskStatusBadgeClasses } from '../../utils/taskStatusUtils';

interface TaskStatusDropdownProps {
	taskId: string;
	currentStatus: string;
	onStatusChange?: (newStatus: string) => void;
}

const TaskStatusDropdown: React.FC<TaskStatusDropdownProps> = ({
	taskId,
	currentStatus,
	onStatusChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const statusOptions = [
		{ value: 'inProgress', label: 'In Progress' },
		{ value: 'Submitted', label: 'Submitted' },
		{ value: 'Completed', label: 'Completed' },
		{ value: 'Task Closed', label: 'Task Closed' },
	];

	const handleStatusSelect = (status: string) => {
		setSelectedStatus(status);
		setShowModal(true);
		setIsOpen(false);
	};

	const handleConfirmStatusChange = async () => {
		setIsLoading(true);
		
		try {
			const response = await updateTaskStatusService(taskId, selectedStatus);

			if (!response.success) {
				console.error('Failed to update task status');
                return;
			}
			
			// Call the callback to notify parent component of the change
			onStatusChange?.(selectedStatus);
		} catch (error) {
			console.error('Error updating task status:', error);
		} finally {
			setIsLoading(false);
			setShowModal(false);
		}
	};

	const handleCancelStatusChange = () => {
		setShowModal(false);
		setSelectedStatus('');
	};

	return (
		<>
			<div className="relative" ref={dropdownRef}>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<span className={getTaskStatusBadgeClasses(currentStatus)}>
						{currentStatus}
					</span>
					<svg
						className={`w-4 h-4 transition-transform ${
							isOpen ? 'rotate-180' : ''
						}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				{isOpen && (
					<div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
						<div className="py-1">
							{statusOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => handleStatusSelect(option.value)}
									className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-300"
								>
									{option.label}
								</button>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Confirmation Modal */}
			<Modal
				open={showModal}
				title="Confirm Status Change"
				onCancel={handleCancelStatusChange}
				onOk={handleConfirmStatusChange}
				confirmLoading={isLoading}
				okText={isLoading ? 'Updating...' : 'Yes, Update'}
				cancelText="Cancel"
				centered={true}
				closable={true}
				maskClosable={true}
				okButtonProps={{
					style: {
						backgroundColor: '#3B82F6', // Blue-500
						borderColor: '#3B82F6',
						color: '#fff',
					},
				}}
			>
				<p className="text-gray-600">
					Are you sure you want to change the task status to{' '}
					<span className="font-medium">{selectedStatus}</span>?
				</p>
			</Modal>
		</>
	);
};

export default TaskStatusDropdown; 