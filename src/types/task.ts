export interface Task {
	_id: string;
	title: string;
	description: string;
	status: string;
	createdBy?: string | { _id: string; email: string; firstName?: string; lastName?: string; role?: string; userName?: string };
	assignedTo?: string | { _id: string; email: string; firstName?: string; lastName?: string; role?: string; userName?: string };
	createdAt?: string;
	dueDate?: string;
	customerName?: string;
	customerEmail?: string;
	plan?: string;
	credits?: number;
	creditCost?: number;
	files?: string[];
	updatedAt?: string;
	__v?: number;
	messages?: Array<{
		content: string;
		createdAt: string;
	}>;
}

export interface Message {
	senderId: {
		_id: string;
	};
	content: string;
	createdAt: string;
}

export interface CreateTaskPayload {
	title: string;
	description: string;
}

export interface TaskResponse {
	success: boolean;
	data: { task: Task; messages: Message[] };
	message?: string;
}

export interface TaskListResponse {
	success: boolean;
	tasks: Task[];
	message?: string;
}
