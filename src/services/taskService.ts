import { request } from './request';
import { TaskFile } from '../types/task';

// Define types for task responses
interface Task {
	_id: string;
	title: string;
	description: string;
	status: string;
	createdBy?:
		| string
		| { _id: string; email: string; firstName?: string; lastName?: string; role?: string; userName?: string};
	assignedTo?:
		| string
		| { _id: string; email: string; firstName?: string; lastName?: string; role?: string; userName?: string};
	// Add other task properties as needed
	files?: TaskFile[];
}

interface Message {
	senderId: {
		_id: string;
	};
	content: string;
	createdAt: string;
}

interface GetAllTasksResponse {
	success: boolean;
	tasks: Task[];
	message?: string;
}

interface ViewTaskResponse {
	success: boolean;
	data: {
		task: Task;
		messages: Message[];
	};
	message?: string;
}

interface CreateTaskPayload {
	title: string;
	description: string;
	files?: File[];
}

interface CreateTaskResponse {
	success: boolean;
	task: Task;
	message?: string;
}

interface AssignTaskResponse {
	success: boolean;
	message?: string;
}

export const getAllTaskService = (): Promise<GetAllTasksResponse> => {
	return request<GetAllTasksResponse>({
		method: 'get',
		url: '/tasks',
	});
};

export const viewTaskService = (id: string): Promise<ViewTaskResponse> => {
	return request<ViewTaskResponse>({
		method: 'get',
		url: `/tasks/viewTask/${id}`,
	});
};

export const createTaskService = (
	payload: CreateTaskPayload
): Promise<CreateTaskResponse> => {
	return request<CreateTaskResponse>({
		method: 'post',
		url: '/tasks/createTask',
		data: { ...payload },
	});
};

export const assignTaskService = (
	taskId: string,
	userId: string
): Promise<AssignTaskResponse> => {
	return request<AssignTaskResponse>({
		method: 'patch',
		url: `/tasks/${taskId}/assign`,
		data: { userId },
	});
};

export const deleteTaskService = (
	taskId: string
): Promise<AssignTaskResponse> => {
	return request<AssignTaskResponse>({
		method: 'delete',
		url: `/tasks/deleteTask/${taskId}`,
	});
};

export const reassignTaskService = (
	taskId: string,
	userId: string
): Promise<AssignTaskResponse> => {
	return request<AssignTaskResponse>({
		method: 'patch',
		url: `/tasks/${taskId}/reAssign`,
		data: { userId },
	});
};

export const updateTaskStatusService = (
	taskId: string,
	status: string
): Promise<AssignTaskResponse> => {
	return request<AssignTaskResponse>({
		method: 'put',
		url: `/tasks/updateTask/${taskId}`,
		data: {
			updateData: {
				status,
			},
		},
	});
};