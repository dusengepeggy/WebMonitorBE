import sql from '../db';

class UserSettingsService {

  static async createOrUpdateUserSettings(userId: string, notifyOnStatusChange: boolean, refreshInterval: number) {
    const result = await sql`
      INSERT INTO user_settings (user_id, notify_on_status_change, refresh_interval)
      VALUES (${userId}, ${notifyOnStatusChange}, ${refreshInterval})
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        notify_on_status_change = EXCLUDED.notify_on_status_change,
        refresh_interval = EXCLUDED.refresh_interval,
        updated_at = NOW()
      RETURNING id, notify_on_status_change, refresh_interval, updated_at;
    `;
    return result[0];
  }


  static async getUserSettingsByUserId(userId: string) {
    const result = await sql`
      SELECT * FROM user_settings WHERE user_id = ${userId};
    `;
    return result[0];
  }

  static async updateUserSettings(userId: string, notifyOnStatusChange: boolean, refreshInterval: number) {
    const result = await sql`
      UPDATE user_settings
      SET notify_on_status_change = ${notifyOnStatusChange}, refresh_interval = ${refreshInterval}, updated_at = NOW()
      WHERE user_id = ${userId}
      RETURNING id, notify_on_status_change, refresh_interval, updated_at;
    `;
    return result[0];
  }


  static async deleteUserSettings(userId: string) {
    const result = await sql`
      DELETE FROM user_settings WHERE user_id = ${userId};
    `;
    return result;
  }
}

export default UserSettingsService;
