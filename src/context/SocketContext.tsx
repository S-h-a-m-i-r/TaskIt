import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client';

// Define types for the context
interface SocketContextType {
	socket: Socket | null;
}

// 1. Create the context
const SocketContext = createContext<SocketContextType | null>(null);

// 2. Context Provider Component
interface SocketProviderProps {
	children: React.ReactNode;
	token?: string | null;
}

export const SocketProvider = ({ children, token }: SocketProviderProps) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		console.log('Initializing socket connection...');
		if (!token) {
			console.log('No token provided, skipping socket connection');
			return;
		}
		const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
		const newSocket = io(backendUrl, {
			auth: { token },
		});
		console.log('backendUrl', backendUrl);
		console.log('token', token);
		console.log('newSocket', newSocket);
		console.log('Socket instance created');
		newSocket.on('connect', () => {
			console.log('Socket connected');
		});

		newSocket.on('error', (error) => {
			console.error('Socket error:', error);
		});

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
			console.log('Socket disconnected');
		};
	}, [token]);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

// 3. Custom hook to use socket
export const useSocket = (): Socket | null => {
	const context = useContext(SocketContext);
	if (context === null) {
		throw new Error('useSocket must be used within a SocketProvider');
	}
	return context.socket;
};
