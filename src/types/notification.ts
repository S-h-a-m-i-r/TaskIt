export interface Notification {
  _id: string;
  recipient: string;
  sender?: string;
  message: string;
  link?: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RealtimeNotification {
  id: string;
  message: string;
  link?: string;
  sender?: string;
  timestamp: string;
  seen: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

export interface NotificationActions {
  addNotification: (notification: RealtimeNotification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  fetchNotifications: () => Promise<void>;
  clearError: () => void;
}

export interface ToastNotification {
  id: string;
  message: string;
  link?: string;
  type: "info" | "success" | "warning" | "error";
  duration?: number;
}
