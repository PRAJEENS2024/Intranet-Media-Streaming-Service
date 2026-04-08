import { query } from '../config/database.js';

class Category {
  static async create(name, description) {
    try {
      const result = await query(
        `INSERT INTO categories (name, description)
         VALUES ($1, $2)
         RETURNING id, name, description, created_at`,
        [name, description]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to create category: ${err.message}`);
    }
  }

  static async findById(id) {
    try {
      const result = await query(
        `SELECT id, name, description, created_at
         FROM categories WHERE id = $1`,
        [id]
      );
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Failed to find category: ${err.message}`);
    }
  }

  static async getAllCategories() {
    try {
      const result = await query(
        `SELECT id, name, description, created_at
         FROM categories ORDER BY name ASC`
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch categories: ${err.message}`);
    }
  }

  static async updateCategory(id, name, description) {
    try {
      const result = await query(
        `UPDATE categories
         SET name = COALESCE($1, name),
             description = COALESCE($2, description)
         WHERE id = $3
         RETURNING id, name, description, created_at`,
        [name, description, id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to update category: ${err.message}`);
    }
  }

  static async deleteCategory(id) {
    try {
      const result = await query(
        `DELETE FROM categories WHERE id = $1 RETURNING id`,
        [id]
      );
      return result.rows[0] != null;
    } catch (err) {
      throw new Error(`Failed to delete category: ${err.message}`);
    }
  }

  static async getCategoriesWithVideoCount() {
    try {
      const result = await query(
        `SELECT c.id, c.name, c.description, COUNT(v.id)::int as video_count, c.created_at
         FROM categories c
         LEFT JOIN videos v ON c.id = v.category_id AND v.is_published = true
         GROUP BY c.id, c.name, c.description, c.created_at
         ORDER BY c.name ASC`
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch categories with video count: ${err.message}`);
    }
  }
}

export default Category;
