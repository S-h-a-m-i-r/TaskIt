import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
	createTaskService,
	getAllTaskService,
	viewTaskService,
	assignTaskService,
	deleteTaskService,
	reassignTaskService,
} from '../services/taskService';

// Define types for the store
interface Task {
	_id: string;
	title: string;
	description: string;
	status: string;
	createdAt?: string;
	dueDate?: string;
	assignedTo?: string;
	// Add other task properties as needed
}

interface Message {
	senderId: {
		_id: string;
	};
	content: string;
	createdAt: string;
}

interface CreateTaskPayload {
	title: string;
	description: string;
}

interface TaskState {
	tasks: Task[];
	messages: Message[];
	task: Task | null;
	isAuthenticated: boolean;
	loading: boolean;
	getTaskList: () => Promise<{
		success: boolean;
		tasks: Task[];
		message?: string;
	}>;
	viewTask: (id: string) => Promise<{
		success: boolean;
		data: { task: Task; messages: Message[] };
		message?: string;
	}>;
	createTask: (payload: CreateTaskPayload) => Promise<{
		success: boolean;
		message?: string;
	}>;
	assignTask: (
		taskId: string,
		userId: string
	) => Promise<{
		success: boolean;
		message?: string;
	}>;
	deleteTask: (taskId: string) => Promise<{
		success: boolean;
		message?: string;
	}>;
	reassignTask: (
		taskId: string,
		userId: string
	) => Promise<{
		success: boolean;
		message?: string;
	}>;
}

const useTaskStore = create(
	devtools(
		persist(
			(set): TaskState => ({
				tasks: [],
				messages: [],
				task: null,
				isAuthenticated: false,
				loading: false,

				getTaskList: async () => {
					set({ loading: true });
					try {
						const res = await getAllTaskService();
						const { tasks } = res;
						set({ tasks });
						return res;
					} catch (error) {
						console.error('Failed to fetch task list:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				viewTask: async (id: string) => {
					set({ loading: true });
					try {
						const res = await viewTaskService(id);
						const { task, messages } = res.data;
						set({ task, messages });
						return res;
					} catch (error) {
						console.error('Failed to fetch task list:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				createTask: async (payload: CreateTaskPayload) => {
					set({ loading: true });
					try {
						const res = await createTaskService(payload);
						return res;
					} catch (error) {
						console.error('Failed to create task:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				assignTask: async (taskId: string, userId: string) => {
					set({ loading: true });
					try {
						const res = await assignTaskService(taskId, userId);
						return res;
					} catch (error) {
						console.error('Failed to assign task:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				deleteTask: async (taskId: string) => {
					set({ loading: true });
					try {
						const res = await deleteTaskService(taskId);
						return res;
					} catch (error) {
						console.error('Failed to unassign task:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				reassignTask: async (taskId: string, userId: string) => {
					set({ loading: true });
					try {
						const res = await reassignTaskService(taskId, userId);
						return res;
					} catch (error) {
						console.error('Failed to reassign task:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
			}),

			{
				name: 'task-storage',
				partialize: (state: TaskState) => ({
					tasks: state.tasks,
				}),
			}
		),
		{ name: 'TaskStore' }
	)
);

export default useTaskStore;
