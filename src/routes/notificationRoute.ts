import express from "express";
import {
  createNotification,
  getNotificationsByUserId,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notification.controller";
import { verifyToken } from "../middleware/auth.middleware";

const notificationrouter = express.Router();

notificationrouter.post("/notifications", verifyToken ,createNotification);
notificationrouter.get("/notifications/:userId", verifyToken , getNotificationsByUserId);
notificationrouter.patch("/notifications/:notificationId", verifyToken , markNotificationAsRead);
notificationrouter.delete("/notifications/:notificationId", verifyToken , deleteNotification);

export default notificationrouter;
