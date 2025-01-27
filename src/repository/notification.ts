import sql from '../db';

class NotificationService {

  static async createNotification(userId: string, websiteId: string, type: string, message: string) {
    const result = await sql`
      INSERT INTO notifications (user_id, website_id, type, message)
      VALUES (${userId}, ${websiteId}, ${type}, ${message})
      RETURNING id, type, message, created_at;
    `;
    return result[0];
  }


  static async getNotificationsByUserId(userId: string) {
    const result = await sql`
      SELECT * FROM notifications WHERE user_id = ${userId};
    `;
    return result;
  }


  static async markNotificationAsRead(notificationId: string) {
    const result = await sql`
      UPDATE notifications
      SET is_read = TRUE, updated_at = NOW()
      WHERE id = ${notificationId}
      RETURNING id, is_read, updated_at;
    `;
    return result[0];
  }


  static async deleteNotification(notificationId: string) {
    const result = await sql`
      DELETE FROM notifications WHERE id = ${notificationId};
    `;
    return result;
  }
}

export default NotificationService;
