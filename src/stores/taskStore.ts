import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
	createTaskService,
	getAllTaskService,
	viewTaskService,
	assignTaskService,
	deleteTaskService,
	reassignTaskService,
} from '../services/taskService';
import { Task, Message, CreateTaskPayload, TaskResponse, TaskListResponse } from '../types/task';
import { 
	getUploadUrlService, 
	attachFilesToTaskService, 
	uploadFileToS3,
	FileInfo 
} from '../services/fileService';

interface TaskState {
	tasks: Task[];
	messages: Message[];
	task: Task | null;
	isAuthenticated: boolean;
	loading: boolean;
	getTaskList: () => Promise<TaskListResponse>;
	viewTask: (id: string) => Promise<TaskResponse>;
	createTask: (payload: CreateTaskPayload) => Promise<{
		success: boolean;
		task: Task;
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
	uploadFiles: (files: File[]) => Promise<FileInfo[]>;
	attachFilesToTask: (taskId: string, files: FileInfo[]) => Promise<{
		success: boolean;
		message?: string;
	}>;

	
}

const useTaskStore = create(
	devtools(
		
			(set, get): TaskState => ({
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
						await (get() as TaskState).getTaskList();
					}
				},
				uploadFiles: async (files: File[]) => {
					const uploadedFiles: FileInfo[] = [];
					
					for (const file of files) {
						try {
							// Get presigned URL
							const uploadUrlRes = await getUploadUrlService(
								file.name,
								file.type,
								file.size
							);
							
							if (uploadUrlRes.success) {
								// Upload to S3
								await uploadFileToS3(file, uploadUrlRes.uploadUrl);
								
								// Add to uploaded files list
								uploadedFiles.push({
									fileName: file.name,
									fileSize: file.size,
									fileType: file.type,
									fileKey: uploadUrlRes.fileKey,
								});
							}
						} catch (error) {
							console.error(`Failed to upload file ${file.name}:`, error);
							throw new Error(`Failed to upload file ${file.name}`);
						}
					}
					
					return uploadedFiles;
				},
				attachFilesToTask: async (taskId: string, files: FileInfo[]) => {
					try {
						const res = await attachFilesToTaskService(taskId, files);
						return res;
					} catch (error) {
						console.error('Failed to attach files to task:', error);
						throw error;
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
		{ name: 'TaskStore' }
	)
);

export default useTaskStore;
