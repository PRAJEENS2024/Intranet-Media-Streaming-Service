import { query } from '../config/database.js';
import bcrypt from 'bcrypt';

class User {
  static async create(userData) {
    const { username, email, password, full_name, role = 'user' } = userData;

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    try {
      const result = await query(
        `INSERT INTO users (username, email, password_hash, full_name, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, username, email, full_name, role, created_at`,
        [username, email, password_hash, full_name, role]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to create user: ${err.message}`);
    }
  }

  static async findById(id) {
    try {
      const result = await query(
        `SELECT id, username, email, full_name, avatar_url, role, is_active, created_at
         FROM users WHERE id = $1`,
        [id]
      );
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Failed to find user: ${err.message}`);
    }
  }

  static async findByEmail(email) {
    try {
      const result = await query(
        `SELECT id, username, email, password_hash, full_name, role, is_active
         FROM users WHERE email = $1`,
        [email]
      );
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Failed to find user: ${err.message}`);
    }
  }

  static async findByUsername(username) {
    try {
      const result = await query(
        `SELECT id, username, email, full_name, role, is_active, created_at
         FROM users WHERE username = $1`,
        [username]
      );
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Failed to find user: ${err.message}`);
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err) {
      throw new Error('Password verification failed');
    }
  }

  static async getAllUsers() {
    try {
      const result = await query(
        `SELECT id, username, email, full_name, role, is_active, created_at
         FROM users ORDER BY created_at DESC`
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch users: ${err.message}`);
    }
  }

  static async updateUser(id, updateData) {
    const { full_name, avatar_url } = updateData;
    try {
      const result = await query(
        `UPDATE users
         SET full_name = COALESCE($1, full_name),
             avatar_url = COALESCE($2, avatar_url),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $3
         RETURNING id, username, email, full_name, avatar_url, role, created_at`,
        [full_name, avatar_url, id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to update user: ${err.message}`);
    }
  }

  static async deleteUser(id) {
    try {
      const result = await query(
        `DELETE FROM users WHERE id = $1 RETURNING id`,
        [id]
      );
      return result.rows[0] != null;
    } catch (err) {
      throw new Error(`Failed to delete user: ${err.message}`);
    }
  }
}

export default User;
