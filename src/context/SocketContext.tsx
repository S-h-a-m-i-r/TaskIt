import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { io, Socket } from 'socket.io-client';

// Define types for the context
interface SocketContextType {
	socket: Socket | null;
	isConnected: boolean;
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
	const [isConnected, setIsConnected] = useState(false);

	const connectSocket = useCallback(() => {
		if (!token) {
			console.log('No token provided, skipping socket connection');
			return;
		}

		console.log('Initializing socket connection...');
		const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
		const newSocket = io(backendUrl, {
			auth: { token },
			transports: ['websocket', 'polling'], // Prefer WebSocket for better performance
			timeout: 20000,
			forceNew: true
		});

		newSocket.on('connect', () => {
			console.log('Socket connected');
			setIsConnected(true);
		});

		newSocket.on('disconnect', () => {
			console.log('Socket disconnected');
			setIsConnected(false);
		});

		newSocket.on('error', (error) => {
			console.error('Socket error:', error);
			setIsConnected(false);
		});

		setSocket(newSocket);

		return newSocket;
	}, [token]);

	useEffect(() => {
		const newSocket = connectSocket();

		return () => {
			if (newSocket) {
				newSocket.disconnect();
				console.log('Socket disconnected');
			}
		};
	}, [connectSocket]);

	// Memoize the context value to prevent unnecessary re-renders
	const contextValue = useMemo(() => ({
		socket,
		isConnected
	}), [socket, isConnected]);

	return (
		<SocketContext.Provider value={contextValue}>
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

// 4. Custom hook to check connection status
export const useSocketConnection = (): boolean => {
	const context = useContext(SocketContext);
	if (context === null) {
		throw new Error('useSocketConnection must be used within a SocketProvider');
	}
	return context.isConnected;
};
