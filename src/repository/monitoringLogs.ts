import sql from '../db';

class MonitoringLogService {

  static async createMonitoringLog(websiteId: string, status: string) {
    const result = await sql`
      INSERT INTO monitoring_logs (website_id, status)
      VALUES (${websiteId}, ${status})
      RETURNING id, status, checked_at;
    `;
    return result[0];
  }

  static async getMonitoringLogsByWebsiteId(websiteId: string) {
    const result = await sql`
      SELECT * FROM monitoring_logs WHERE website_id = ${websiteId} ORDER BY checked_at DESC;
    `;
    return result;
  }

  static async getLatestMonitoringLogByWebsiteId(websiteId: string) {
    const result = await sql`
      SELECT * FROM monitoring_logs WHERE website_id = ${websiteId} ORDER BY checked_at DESC LIMIT 1;
    `;
    return result[0];
  }

  static async deleteMonitoringLog(logId: string) {
    const result = await sql`
      DELETE FROM monitoring_logs WHERE id = ${logId};
    `;
    return result;
  }
}

export default MonitoringLogService;
