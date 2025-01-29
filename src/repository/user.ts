import sql from '../db';

class UserService {

  static async createUser(email: string, password: string, username: string) {
    const result = await sql`
      INSERT INTO users (email, password, username)
      VALUES (${email}, ${password}, ${username})
      RETURNING id, email, username, created_at, updated_at;
    `;
    return result[0];
  }

   
  static async getUserById(userId: string) {
    const result = await sql`
      SELECT * FROM users WHERE id = ${userId};
    `;
    return result[0];
  }
  static async getUserBEmail(userEmail: string) {
    const result = await sql`
      SELECT * FROM users WHERE email = ${userEmail};
    `;
    return result[0];
  }

  static async updateUser(userId: string, email: string, password: string, profile?: string) {
    const result = await sql`
      UPDATE users
      SET email = ${email}, password = ${password}, profile = ${profile ?? null}, updated_at = NOW()
      WHERE id = ${userId}
      RETURNING id, email, username, updated_at;
    `;
    return result[0];
  }


  static async deleteUser(userId: string) {
    const result = await sql`
      DELETE FROM users WHERE id = ${userId};
    `;
    return result;
  }
}

export default UserService;
