import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/icons/ArrowLeft_icon.svg";
import ListItem from "../../components/generalComponents/ListItem";
import deleteIcon from "../../assets/icons/Delete_icon.svg";
import attachment from "../../assets/icons/attachment_icon.svg";
import sendIcon from "../../assets/icons/Send_icon.svg";
import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import useTaskStore from '../../stores/taskStore';
import useAuthStore from '../../stores/authStore';
import { Socket } from 'socket.io-client';
import { getTaskStatusColors } from '../../utils/taskStatusUtils';

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
	files: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	assignedTo?:
		| string
		| { _id: string; email: string; firstName?: string; lastName?: string };
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
	const [content, setContent] = useState('');
	const [typing, setTyping] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const socket = useSocket() as Socket | null;

	// const scrollToBottom = () => {
	// 	messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	// };

	// useEffect(() => {
	// 	scrollToBottom();
	// }, [messages]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await viewTask(taskId!);
				if (response.success) {
					setMessages(response.data.messages);
					setTask(response.data.task);
				} else {
					console.error('Failed to fetch task details:', response.message);
				}
			} catch (error) {
				console.error('Error fetching task details:', error);
			}
		};

		fetchData();
	}, [taskId, viewTask]);

	useEffect(() => {
		if (!socket || !taskId) return;

		// Join task chat room
		socket.emit('joinTaskChat', taskId);
		console.log('Joined task chat room:', taskId);

		// Listen for new messages
		socket.on('receiveMessage', (message: Message) => {
			setMessages((prev) => [...prev, message]);
		});

		// Listen for typing indicators
		socket.on(
			'typingStarted',
			({ userId: typingUserId }: { userId: string }) => {
				return setTyping(typingUserId);
			}
		);

		socket.on('typingStopped', () => {
			setTyping(null);
		});

		// Handle errors
		socket.on('error', (error: unknown) => {
			console.error('Socket error:', error);
			alert(error);
		});

		return () => {
			socket.off('receiveMessage');
			socket.off('typingStarted');
			socket.off('typingStopped');
			socket.off('error');
		};
	}, [socket, taskId]);

	const handleSendMessage = (e: React.FormEvent | React.MouseEvent) => {
		e.preventDefault();
		if (!content.trim() || !socket) return;

		socket.emit('sendMessage', { taskId, content });
		setContent('');
		socket.emit('typingStopped', taskId);
	};

	const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setContent(value);
		if (!socket) return;

		if (value) {
			socket.emit('typingStarted', taskId);
		} else {
			socket.emit('typingStopped', taskId);
		}
	};
	getTaskStatusColors(task?.status || '');

	return (
		<div className="p-9 w-full flex flex-col gap-10 h-full">
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
			<div className="bg-gray-100 w-full border border-1"></div>
			<div className="flex max-md:flex-col gap-6 h-full">
				<div className="md:w-1/2">
					<h2 className="text-[#3B82F6] text-xl text-left font-semibold mb-6">
						{' '}
						20 Dec 2024{' '}
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
							<div className="flex flex-col gap-5">
								{/* actual files comes here  */}
								<ListItem
									icon={attachment}
									content="Img343621.png"
									item={deleteIcon}
								/>
								<ListItem
									icon={attachment}
									content="Img343621.png"
									item={deleteIcon}
								/>
								<ListItem
									icon={attachment}
									content="Img343621.png"
									item={deleteIcon}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white h-full flex flex-col justify-between p-4 flex-1 rounded-md">
					<div>
						{' '}
						{/* Messages Container */}
						<div className="text-xl font-bold mb-4">Assistant</div>
						<hr className="mb-4 border-gray-300" />
						<div className="flex  overflow-hidden">
							{/* Scrollable message list */}
							<div className="flex-1 overflow-y-auto px-4 py-2">
								<div className="space-y-2">
									{messages?.map((message, index) => (
										<div
											key={index}
											className={`p-3 w-fit max-w-[350px] ${
												message?.senderId?._id === user?._id
													? 'bg-blue-500 text-white ml-auto text-right rounded-t-lg rounded-l-lg'
													: 'bg-gray-200 text-black mr-auto shadow text-left rounded-t-lg rounded-r-lg'
											}`}
										>
											<div className="break-words whitespace-pre-wrap">
												{message.content}
											</div>
											<div
												className={`text-xs mt-1 text-right ${
													message?.senderId?._id === user?._id
														? 'text-white'
														: 'text-black'
												}`}
											>
												{new Date(message.createdAt).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</div>
										</div>
									))}

									{/* Typing indicator - shown only once at the bottom */}
									{typing && typing !== user?._id && (
										<div className="text-sm italic text-gray-500 px-2 py-1">
											Someone is typing...
										</div>
									)}

									<div ref={messagesEndRef} />
								</div>
							</div>
						</div>
					</div>

					{/* Check if task is assigned */}
					{task?.assignedTo ? (
						<div className="flex items-center bg-white px-2 py-4 rounded-md shadow">
							<input
								type="text"
								placeholder="Write here"
								className="flex-grow outline-none"
								value={content}
								onChange={handleTyping}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleSendMessage(e);
									}
								}}
							/>
							<button
								onClick={handleSendMessage}
								className="text-gray-500 hover:text-gray-700"
							>
								<img src={sendIcon} />
							</button>
						</div>
					) : (
						<div className="flex items-center bg-gray-100 px-2 py-4 rounded-md shadow border border-gray-300">
							<input
								type="text"
								placeholder="Task is not assigned yet"
								className="flex-grow outline-none bg-gray-100 text-gray-500 cursor-not-allowed"
								disabled
								readOnly
							/>
							<button className="text-gray-400 cursor-not-allowed" disabled>
								<img src={sendIcon} className="opacity-50" />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TaskDetailsPage;
