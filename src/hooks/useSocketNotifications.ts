import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useNotificationStore } from "../stores/notificationStore";
import { useNotificationPermission } from "./useNotificationPermission";
import { RealtimeNotification } from "../types/notification";

export const useSocketNotifications = () => {
  const socket = useSocket();
  const { addNotification } = useNotificationStore();
  const { showNotification } = useNotificationPermission();

  useEffect(() => {
    if (!socket) return;

    // Listen for new notifications
    const handleNewNotification = (notification: RealtimeNotification) => {
      console.log("🔔 New notification received:", notification);

      // Add to notification store
      addNotification(notification);

      // Show browser notification if permission is granted
      if (notification.message) {
        showNotification("TaskAway", {
          body: notification.message,
          tag: notification.id,
          data: {
            link: notification.link,
            id: notification.id,
          },
        });
      }
    };

    // Listen for chat messages (optional - if you want to show notifications for messages too)
    const handleReceiveMessage = (message: any) => {
      console.log("💬 New message received:", message);

      // You can add message notifications here if needed
      // addNotification({
      //   id: `msg_${message._id}`,
      //   message: `New message in task: ${message.content}`,
      //   link: `/tasks/${message.taskId}`,
      //   timestamp: new Date().toISOString(),
      //   seen: false
      // });
    };

    // Listen for typing indicators (optional)
    const handleTypingStarted = (data: { userId: string }) => {
      console.log("⌨️ User started typing:", data.userId);
    };

    const handleTypingStopped = (data: { userId: string }) => {
      console.log("⌨️ User stopped typing:", data.userId);
    };

    // Listen for socket errors
    const handleError = (error: any) => {
      console.error("❌ Socket error:", error);
    };

    // Listen for connection errors
    const handleConnectError = (error: any) => {
      console.error("❌ Socket connection error:", error);
    };

    // Listen for disconnection
    const handleDisconnect = (reason: string) => {
      console.log("📡 Socket disconnected:", reason);
    };

    // Register event listeners
    socket.on("newNotification", handleNewNotification);
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typingStarted", handleTypingStarted);
    socket.on("typingStopped", handleTypingStopped);
    socket.on("error", handleError);
    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);

    // Cleanup function
    return () => {
      socket.off("newNotification", handleNewNotification);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("typingStarted", handleTypingStarted);
      socket.off("typingStopped", handleTypingStopped);
      socket.off("error", handleError);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket, addNotification, showNotification]);

  // Return socket instance for other uses
  return { socket };
};
