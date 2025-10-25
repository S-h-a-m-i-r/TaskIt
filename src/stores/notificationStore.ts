import { create } from "zustand";
import {
  Notification,
  RealtimeNotification,
  NotificationState,
  NotificationActions,
} from "../types/notification";
import { notificationService } from "../services/notificationService";

interface NotificationStore extends NotificationState, NotificationActions {
  // Additional state for toast notifications
  toasts: Array<{
    id: string;
    message: string;
    link?: string;
    type: "info" | "success" | "warning" | "error";
  }>;
  addToast: (toast: {
    message: string;
    link?: string;
    type?: "info" | "success" | "warning" | "error";
  }) => void;
  removeToast: (toastId: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  // Initial state
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  toasts: [],

  // Actions
  addNotification: (realtimeNotification: RealtimeNotification) => {
    const { notifications } = get();

    // Convert realtime notification to our notification format
    const newNotification: Notification = {
      _id: realtimeNotification.id,
      recipient: "", // Will be set by the backend
      sender: realtimeNotification.sender,
      message: realtimeNotification.message,
      link: realtimeNotification.link,
      seen: realtimeNotification.seen,
      createdAt: realtimeNotification.timestamp,
      updatedAt: realtimeNotification.timestamp,
    };

    // Add to notifications list (avoid duplicates)
    const existingIndex = notifications.findIndex(
      (n) => n._id === newNotification._id
    );
    if (existingIndex === -1) {
      set((state) => ({
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + (newNotification.seen ? 0 : 1),
      }));

      // Add toast notification
      get().addToast({
        message: newNotification.message,
        link: newNotification.link,
        type: "info",
      });
    }
  },

  markAsRead: async (notificationId: string) => {
    const { notifications } = get();
    const notification = notifications.find((n) => n._id === notificationId);

    if (notification && !notification.seen) {
      // Optimistically update UI
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n._id === notificationId ? { ...n, seen: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));

      // Call API to mark as read (you'll implement this later)
      try {
        await notificationService.markAsRead(notificationId);
      } catch (error) {
        console.error("Error marking notification as read:", error);
        // Revert optimistic update on error
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n._id === notificationId ? { ...n, seen: false } : n
          ),
          unreadCount: state.unreadCount + 1,
        }));
      }
    }
  },

  markAllAsRead: async () => {
    const { notifications } = get();
    const unreadNotifications = notifications.filter((n) => !n.seen);
    if (unreadNotifications.length === 0) return;

    // Get array of unread notification IDs
    const unreadIds = unreadNotifications.map((n) => n._id);

    // Optimistically update UI
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, seen: true })),
      unreadCount: 0,
    }));

    // Call API to mark all as read with notification IDs
    try {
      await notificationService.markAllAsRead(unreadIds);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      // Revert optimistic update on error
      set((state) => ({
        notifications: state.notifications.map((n) =>
          unreadNotifications.some((unread) => unread._id === n._id)
            ? { ...n, seen: false }
            : n
        ),
        unreadCount: unreadNotifications.length,
      }));
    }
  },

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });

    try {
      const notifications = await notificationService.getNotifications();
      console.log("notifications", notifications);
      const unreadCount = notifications?.filter((n) => !n.seen).length;

      set({
        notifications,
        unreadCount,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch notifications",
        isLoading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  // Toast management
  addToast: (toast) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      message: toast.message,
      link: toast.link,
      type: toast.type || "info",
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      get().removeToast(id);
    }, 3000);
  },

  removeToast: (toastId) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== toastId),
    }));
  },
}));
