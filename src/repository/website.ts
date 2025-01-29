import sql from '../db';

class WebsiteService {
  
  static async createWebsite(userId: string, name: string, url: string) {
    const result = await sql`
      INSERT INTO websites (user_id, name, url, status)
      VALUES (${userId}, ${name}, ${url}, 'offline')
      RETURNING id, name, url, created_at, updated_at;
    `;
    return result[0];
  }

  
  static async getWebsitesByUserId(userId: string) {
    const result = await sql`
      SELECT * FROM websites WHERE user_id = ${userId};
    `;
    return result;
  }

  static async getWebsiteById(websiteId: string) {
    const result = await sql`
      SELECT * FROM websites WHERE id = ${websiteId};
    `;
    return result[0];
  }

  static async updateWebsite(websiteId: string,name:string|null, url: string, status: string) {
    const result = await sql`
      UPDATE websites
      SET url = ${url}, status = ${status},name =${name} ,updated_at = NOW()
      WHERE id = ${websiteId}
      RETURNING id, name, url, status, updated_at;
    `;
    return result[0];
  }


  static async deleteWebsite(websiteId: string) {
    const result = await sql`
      DELETE FROM websites WHERE id = ${websiteId};
    `;
    return result;
  }
}

export default WebsiteService;
