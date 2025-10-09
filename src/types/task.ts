export interface TaskFile {
	filename: string;
	fileSize: number;
	fileType: string;
	fileKey: string;
	uploadedAt: string;
}

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
	files?: TaskFile[];
	updatedAt?: string;
	isRecurring?: boolean;
	recurrencePattern?: string;
	recurrenceEndDate?: string;
	recurringSettings?: {
		pattern: "Daily" | "Weekly" | "Monthly" | "Yearly";
		dailyInterval?: number;
		weeklyInterval?: number;
		weeklyDays?: string[];
		monthlyInterval?: number;
		monthlyDayOfWeek?: "first" | "second" | "third" | "fourth" | "last";
		monthlyDay?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
		monthlyDayOfMonth?: number;
		startDate: string;
		endType: "endBy" | "endAfter" | "noEnd";
		endDate?: string;
		endAfterCount?: number;
	};
	__v?: number;
	messages?: Array<{
		content: string;
		createdAt: string;
	}>;
}

export interface Message {
  _id?: string;
  senderId: {
    _id: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
  };
  content: string;
  createdAt: string;
}

export interface CreateTaskPayload {
	title: string;
	description: string;
	files?: File[];
	isRecurring?: boolean;
	recurrencePattern?: "Daily" | "Weekly" | "Monthly" | "Yearly";
	recurrenceEndDate?: Date | null;
	recurringSettings?: {
		pattern: "Daily" | "Weekly" | "Monthly" | "Yearly";
		dailyInterval?: number;
		weeklyInterval?: number;
		weeklyDays?: string[];
		monthlyInterval?: number;
		yearlyInterval?: number;
		monthlyDayOfWeek?: "first" | "second" | "third" | "fourth" | "last";
		monthlyDay?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
		monthlyDayOfMonth?: number;
		startDate: Date;
		endType: "endBy" | "endAfter" | "noEnd";
		endDate?: Date;
		endAfterCount?: number;
	};
	dueDate?: Date;
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
