import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../../stores/notificationStore";
import NotificationIcon from "../../assets/icons/Notification_icon.svg";
import { ArrowLeft, Bell } from "lucide-react";

const AdminNotifications: React.FC = () => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
  } = useNotificationStore();

  const handleGoBack = () => {
    navigate("/admin");
  };

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = (notification: any) => {
    if (!notification.seen) {
      markAsRead(notification._id);
    }

    if (notification.link) {
      navigate(notification.link);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Notifications
            </h1>
          </div>
        </div>

        {/* Mark all as read button */}
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            Mark all as read ({unreadCount})
          </button>
        )}
      </div>

      <div className="bg-gray-200 w-full h-px"></div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-500">Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-12">
          <img
            src={NotificationIcon}
            alt="No notifications"
            className="w-16 h-16 opacity-50 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No notifications yet
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            You'll see notifications here when tasks are created, assigned, or
            when you receive messages.
          </p>
        </div>
      ) : (
        /* Notifications list */
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleNotificationClick(notification)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                !notification.seen
                  ? "bg-blue-50 border-blue-200 border-l-4 border-l-blue-500"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTime(notification.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.seen && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                  {notification.link && (
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
