import { Notification } from "../types/notification";
import { request } from "./request";
export interface ApiSuccessResponse<T> {
  success: boolean;
  data: T;
}
class NotificationService {
  private baseUrl = "/notifications";

  async getNotifications(): Promise<Notification[]> {
    try {
      const response: any = await request<ApiSuccessResponse<Notification[]>>({
        method: "get",
        url: this.baseUrl,
      });

      return response?.data; // Backend returns { success: true, data: notifications }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      await request({
        method: "patch",
        url: `${this.baseUrl}/${notificationId}/read`,
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  }

  async markAllAsRead(notificationIds: string[]): Promise<void> {
    try {
      await request({
        method: "patch",
        url: `${this.baseUrl}/mark-all-read`,
        data: { notificationIds },
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await request({
        method: "delete",
        url: `${this.baseUrl}/${notificationId}`,
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  }

  async getUnreadCount(): Promise<number> {
    try {
      const response = await request({
        method: "get",
        url: `${this.baseUrl}/unread-count`,
      });
      // Ensure correct typing for the response object
      const count = (response as { data?: { data?: { count?: number } } })?.data
        ?.data?.count;
      return typeof count === "number" ? count : 0;
    } catch (error) {
      console.error("Error fetching unread count:", error);
      throw error;
    }
  }
}

export const notificationService = new NotificationService();
