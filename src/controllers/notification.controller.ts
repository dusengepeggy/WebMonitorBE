import { Request, Response } from "express";
import NotificationService from "../repository/notification";


export async function createNotification(req: Request, res: Response) {
  try {
    const { userId, websiteId, type, message } = req.body;
    if (!userId || !websiteId || !type || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const notification = await NotificationService.createNotification(userId, websiteId, type, message);
    return res.status(201).json({ message: "Notification created successfully", notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function getNotificationsByUserId(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const notifications = await NotificationService.getNotificationsByUserId(userId);
    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function markNotificationAsRead(req: Request, res: Response) {
  try {
    const { notificationId } = req.params;
    if (!notificationId) {
      return res.status(400).json({ error: "Notification ID is required." });
    }

    const updatedNotification = await NotificationService.markNotificationAsRead(notificationId);
    return res.status(200).json({ message: "Notification marked as read", updatedNotification });
  } catch (error) {
    console.error("Error updating notification:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function deleteNotification(req: Request, res: Response) {
  try {
    const { notificationId } = req.params;
    if (!notificationId) {
      return res.status(400).json({ error: "Notification ID is required." });
    }

    await NotificationService.deleteNotification(notificationId);
    return res.status(200).json({ message: "Notification deleted successfully." });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
