import { useEffect } from "react";
import { notification } from "antd";
// 1. Removed useContext
// 2. Import the custom 'useSocket' hook instead
// 3. Re-adjusting the path. Assuming 'context' (singular) this time.
import { useSocket } from "../../context/SocketContext";
import useAuthStore from "../../stores/authStore";
import { useNotificationStore } from "../../stores/notificationStore";

// This component is invisible. Its only job is to listen for global socket events.
const GlobalNotificationListener = () => {
  // 3. Use the custom hook to get the socket instance
  const socket = useSocket();
  const { user } = useAuthStore();
  const { fetchNotifications } = useNotificationStore();
  useEffect(() => {
    // Only set up the listener if the socket connection exists
    if (socket) {
      // Define the handler function
      const handleNewNotification = (notificationData: any) => {
        console.log("New notification received:", notificationData);
        // Show Ant Design notification pop-up
        if (notificationData.sender !== user?._id) {
          notification.info({
            message: "New Notification",
            description: notificationData.message,
            placement: "topRight",
          });
          fetchNotifications();
        }

        // Optional: You could also update a Zustand/Redux store here
        // to show a "red dot" on a bell icon, for example.
      };

      // Start listening for the event from the server
      socket.on("newNotification", handleNewNotification);

      // IMPORTANT: Clean up the listener when the component unMmounts
      // or when the socket object changes
      return () => {
        socket.off("newNotification", handleNewNotification);
      };
    }
  }, [socket]); // The dependency array ensures this runs if the socket re-connects

  // This component doesn't render anything to the DOM
  return null;
};

export default GlobalNotificationListener;
