import React, { useEffect } from "react";
import { useSocketNotifications } from "../../hooks/useSocketNotifications";
import { useNotificationPermission } from "../../hooks/useNotificationPermission";
import ToastContainer from "./ToastContainer";

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  // Initialize Socket.IO notifications
  useSocketNotifications();

  // Initialize notification permissions
  const { permission, requestPermission } = useNotificationPermission();

  // Request notification permission on app load
  useEffect(() => {
    if (permission === "default") {
      // Show a subtle prompt to enable notifications
      console.log("Requesting notification permission...");
      requestPermission();
    }
  }, [permission, requestPermission]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default NotificationProvider;
