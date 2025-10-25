import React from "react";
import { useNotificationStore } from "../../stores/notificationStore";
import ToastNotification from "./ToastNotification";

const ToastContainer: React.FC = () => {
  const { toasts } = useNotificationStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="transform transition-all duration-300 ease-in-out"
          style={{
            transform: `translateY(${index * 10}px)`,
            zIndex: 1000 - index,
          }}
        >
          <ToastNotification
            id={toast.id}
            message={toast.message}
            link={toast.link}
            type={toast.type}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
