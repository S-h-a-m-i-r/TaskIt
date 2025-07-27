import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// 1. Create the context
const SocketContext = createContext(null);

// 2. Context Provider Component
interface SocketProviderProps {
	children: React.ReactNode;
	token: string;
}

export const SocketProvider = ({ children, token }: SocketProviderProps) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		console.log("Initializing socket connection...");
		if (!token) return;
			console.log("Token provided:", token);

		const newSocket = io("http://localhost:5000", {
			auth: { token },
		});
console.log("Socket instance created");
		newSocket.on("connect", () => {
			console.log("Socket connected");
		});

		newSocket.on("error", (error) => {
			console.error("Socket error:", error);
		});

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
			console.log("Socket disconnected");
		};
	}, [token]);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
};

// 3. Custom hook to use socket
export const useSocket = () => useContext(SocketContext);
