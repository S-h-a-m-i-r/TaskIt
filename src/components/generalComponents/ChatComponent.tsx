import { useEffect, useRef, useState } from 'react';
import { useSocket } from "../../context/SocketContext";
import sendIcon from "../../assets/icons/Send_icon.svg";
import { Task, Message } from "../../types/task";
import { User } from "../../types";
import useAuthStore from "../../stores/authStore";
import { formatDateForChat, isSameDay } from "../../utils/dateFormatter";

interface ChatComponentProps {
  user: User | null;
  task: Task;
  messages: Message[];
  onMessagesUpdate: (messages: Message[]) => void;
  className?: string;
  assignee?: boolean;
  hideHeader?: boolean;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  user,
  task,
  messages,
  onMessagesUpdate,
  className = "",
  hideHeader = false,
}) => {
  const [content, setContent] = useState("");
  const [typing, setTyping] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();
  const { user: currentUser } = useAuthStore();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket || !task._id) return;

    // Join task chat room
    socket.emit("joinTaskChat", task._id);

    // Listen for new messages
    socket.on("receiveMessage", (message: Message) => {
      onMessagesUpdate([...messages, message]);
    });

    // Listen for typing indicators
    socket.on(
      "typingStarted",
      ({ userId: typingUserId }: { userId: string }) => {
        setTyping(typingUserId);
      }
    );

    socket.on("typingStopped", () => {
      setTyping(null);
    });

    // Handle errors
    socket.on("error", (error: unknown) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typingStarted");
      socket.off("typingStopped");
      socket.off("error");
    };
  }, [socket, task._id, messages, onMessagesUpdate]);

  const handleSendMessage = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!content.trim() || !socket) return;

    socket.emit("sendMessage", { taskId: task._id, content });
    setContent("");
    socket.emit("typingStopped", task._id);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContent(value);
    if (!socket) return;

    if (value) {
      socket.emit("typingStarted", task._id);
    } else {
      socket.emit("typingStopped", task._id);
    }
  };

  const isTaskAssigned = task?.assignedTo;
  const isUserAdminOrManager =
    user && (user?.role === "ADMIN" || user?.role === "MANAGER");

  // Helper function to get first letter of name
  const getFirstLetter = (
    firstName?: string,
    lastName?: string,
    userName?: string
  ) => {
    if (firstName) return firstName.charAt(0).toUpperCase();
    if (lastName) return lastName.charAt(0).toUpperCase();
    if (userName) return userName.charAt(0).toUpperCase();
    return "U";
  };
  return (
    <div
      className={`bg-white h-full flex flex-col justify-between ${className}`}
    >
      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        {!hideHeader && (
          <>
            <div className="text-xl font-bold mb-4 p-4">Client</div>
            <hr className="mb-4 border-gray-300 mx-4" />
          </>
        )}
        <div className="h-full overflow-y-auto px-4 py-2">
          <div
            className={`space-y-2 overflow-y-auto ${className} ? ${className} : h-[500px]`}
          >
            {messages?.map((message, index) => {
              const messageDate = new Date(message.createdAt);
              const prevMessageDate =
                index > 0 ? new Date(messages[index - 1].createdAt) : null;

              // Check if we need to show a date separator
              const shouldShowDateSeparator =
                !prevMessageDate || !isSameDay(messageDate, prevMessageDate);

              return (
                <div key={`${message._id || message.createdAt}-${index}`}>
                  {/* Date Separator */}
                  {shouldShowDateSeparator && (
                    <div className="flex justify-center my-4">
                      <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {formatDateForChat(messageDate)}
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div
                    className={`flex items-end gap-2 max-w-[350px] ${
                      message?.senderId?._id === currentUser?._id
                        ? "ml-auto flex-row-reverse"
                        : "mr-auto"
                    }`}
                  >
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      {message?.senderId?._id === currentUser?._id ? (
                        // Current user profile (sender) - Blue background
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                          <span>
                            {getFirstLetter(
                              currentUser?.firstName,
                              currentUser?.lastName,
                              currentUser?.userName
                            )}
                          </span>
                        </div>
                      ) : (
                        // Other user profile (receiver) - Green background
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-semibold">
                          <span>
                            {getFirstLetter(
                              message?.senderId?.firstName,
                              message?.senderId?.lastName,
                              message?.senderId?.userName
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Message Content */}
                    <div
                      className={`p-3 rounded-lg ${
                        message?.senderId?._id === currentUser?._id
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-gray-200 text-black rounded-bl-md"
                      }`}
                    >
                      {/* Message Text */}
                      <div className=" text-left text-leftbreak-words whitespace-pre-wrap">
                        {message.content}
                      </div>

                      {/* Time */}
                      <div
                        className={`text-xs mt-1 text-right ${
                          message?.senderId?._id === currentUser?._id
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {messageDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator - shown only once at the bottom */}
            {typing && typing !== currentUser?._id && (
              <div className="text-sm italic text-gray-500 px-2 py-1">
                Someone is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      {!isTaskAssigned ||
      (isUserAdminOrManager &&
        typeof task.assignedTo === "object" &&
        task.assignedTo?._id !== user?._id) ? (
        <div className="flex items-center bg-gray-50 px-4 py-3 border-t border-gray-200">
          <input
            type="text"
            placeholder="Unable to send message"
            className="flex-grow outline-none px-3 py-2 border border-gray-300 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
            disabled
            readOnly
          />
          <button
            className="ml-2 p-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
            disabled
          >
            <img src={sendIcon} className="w-4 h-4 opacity-50" alt="Send" />
          </button>
        </div>
      ) : (
        <div className="flex items-center bg-white px-4 py-3 border-t border-gray-200">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow outline-none px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={content}
            onChange={handleTyping}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e);
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-blue-300 text-white rounded-lg hover:bg-blue-400 transition-colors"
            disabled={!content.trim()}
          >
            <img src={sendIcon} alt="Send" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
