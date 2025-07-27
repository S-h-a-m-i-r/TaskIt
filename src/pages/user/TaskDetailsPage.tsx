import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/icons/ArrowLeft_icon.svg";
import ListItem from "../../components/generalComponents/ListItem";
import deleteIcon from "../../assets/icons/Delete_icon.svg";
import attachment from "../../assets/icons/attachment_icon.svg";
import sendIcon from "../../assets/icons/Send_icon.svg";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import useTaskStore from "../../stores/taskStore";
import useAuthStore from "../../stores/authStore";

const TaskDetailsPage = ({ messages: initialMessages, userId }) => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	const { id: taskId } = useParams(); // this will be '6884a837340501974324fd41'

	const { viewTask } = useTaskStore();
	const { user } = useAuthStore();

	const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

	// const [newMessage, setNewMessage] = useState("");
	const [content, setContent] = useState("");
	const [typing, setTyping] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const socket = useSocket();

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await viewTask(taskId);
				if (response.success) {
					setMessages(response.data.messages);
				} else {
					console.error("Failed to fetch task details:", response.message);
				}
			} catch (error) {
				console.error("Error fetching task details:", error);
			}
		};

		fetchData();
	}, [taskId]);

	useEffect(() => {
		if (!socket || !taskId) return;

		// Join task chat room
		socket.emit("joinTaskChat", taskId);
		console.log("Joined task chat room:", taskId);

		// Listen for new messages
		socket.on("receiveMessage", (message: { sender: string; text: string }) => {
			setMessages((prev) => [...prev, message]);
			console.log("Received message:", message);
		});

		// Listen for typing indicators
		socket.on("typingStarted", ({ userId: typingUserId }: { userId: string }) => {
			console.log("User is typing:", typingUserId);
			return setTyping(typingUserId);
		});

		socket.on("typingStopped", () => {
			setTyping(null);
		});

		// Handle errors
		socket.on("error", (error: unknown) => {
			console.error("Socket error:", error);
			alert(error);
		});

		return () => {
			socket.off("receiveMessage");
			socket.off("typingStarted");
			socket.off("typingStopped");
			socket.off("error");
		};
	}, [socket, taskId]);

	const handleSendMessage = (e: { preventDefault: () => void } | undefined) => {
		console.log("Sending message:", content, e?.currentTarget.value);
		e.preventDefault();
		if (!content.trim()) return;

		socket.emit("sendMessage", { taskId, content });
		setContent("");
		socket.emit("typingStopped", taskId);
	};

	const handleTyping = (e: { target: { value: SetStateAction<string> } }) => {
		setContent(e.target.value);
		if (e.target.value) {
			socket.emit("typingStarted", taskId);
		} else {
			socket.emit("typingStopped", taskId);
		}
	};

	return (
		<div className="p-9 w-full flex flex-col gap-10">
			<div className="flex items-center gap-3">
				<div className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex" onClick={handleGoBack}>
					<img src={backIcon} alt="back" />
				</div>
				<span className="font-semibold text-2xl">
					{" "}
					Book Reading/ TSK-127 <span className="text-[#3B82F6]"> (In Progress)</span>
				</span>
			</div>
			<div className="bg-gray-100 w-full border border-1"></div>
			<div className="flex max-md:flex-col gap-6">
				<div className="md:w-1/2">
					<h2 className="text-[#3B82F6] text-xl text-left font-semibold mb-6"> 20 Dec 2024 </h2>
					<div className="w-full max-w-570px text-left flex flex-col gap-6 ">
						<h2 className="font-semibold text-xl"> Task Details </h2>
						<p>
							{" "}
							The Horizon E-commerce Redesign task is 60% complete and set to finish by January 2025, led by Sarah
							Smith, David Lee, and Jennifer Kim. The Virtual Reality Marketing App has been completed, with 100%
							progress, finishing in December 2024. The Finance Dashboard is a pending task set for early 2025 with no
							progress yet. The Healthcare System Mobile App is 80% complete, aiming to finish by December 2024, with
							Olivia Clark, James Green, and Clara Peterson on the team. The Social Media Analytics Tool will begin in
							February 2025, with Daniel Zhao and Nina Patel working on it.
						</p>
						<div className="bg-gray-100 w-full border border-1"></div>
						<div>
							<h2 className="mb-6"> Attachments</h2>
							<div className="flex flex-col gap-5">
								<ListItem icon={attachment} content="Img343621.png" item={deleteIcon} />
								<ListItem icon={attachment} content="Img343621.png" item={deleteIcon} />
								<ListItem icon={attachment} content="Img343621.png" item={deleteIcon} />
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white flex flex-col justify-between p-4 flex-1 rounded-md">
					<div>
						{" "}
						{/* Messages Container */}
						<div className="text-xl font-bold mb-4">Assistant</div>
						<hr className="mb-4 border-gray-300" />
						<div className="flex flex-col h-screen overflow-hidden">
							{/* Scrollable message list */}
							<div className="flex-1 overflow-y-auto px-4 py-2">
								<div className="space-y-2">
									{messages?.map((message, index) => (
										<div
											key={index}
											className={`p-3 w-fit max-w-[350px] ${
												message?.senderId?._id === user?._id
													? "bg-blue-500 text-white ml-auto text-right rounded-t-lg rounded-l-lg"
													: "bg-gray-200 text-black mr-auto shadow text-left rounded-t-lg rounded-r-lg"
											}`}
										>
											{typing && typing !== userId && (
												<div className="text-sm italic text-gray-500">Someone is typing...</div>
											)}
											<div className="break-words whitespace-pre-wrap">{message.content}</div>
											<div
												className={`text-xs mt-1 text-right ${
													message?.senderId?._id === user?._id ? "text-white" : "text-black"
												}`}
											>
												{new Date(message.createdAt).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</div>
										</div>
									))}

									<div ref={messagesEndRef} />
								</div>
							</div>
							
							
						</div>
					</div>
					{/* {typing && typing !== user?._id && (
								<div className="text-sm italic text-gray-500 px-2">Someone is typing...</div>
							)} */}
					<div className="flex items-center bg-white px-2 py-4 rounded-md shadow">
								<input
									type="text"
									placeholder="Write here"
									className="flex-grow outline-none"
									value={content}
									onChange={handleTyping}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleSendMessage(e);
										}
									}}
								/>
								<button onClick={handleSendMessage} className="text-gray-500 hover:text-gray-700">
									<img src={sendIcon} />
								</button>
							</div>
				</div>
			</div>
		</div>
	);
};

export default TaskDetailsPage;
