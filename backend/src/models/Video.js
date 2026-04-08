import { query } from '../config/database.js';

class Video {
  static async create(videoData) {
    const {
      title,
      description,
      category_id,
      uploader_id,
      file_path,
      file_size,
      duration,
      thumbnail_url
    } = videoData;

    try {
      const result = await query(
        `INSERT INTO videos (
          title, description, category_id, uploader_id,
          file_path, file_size, duration, thumbnail_url
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, title, description, category_id, uploader_id,
                  file_path, file_size, duration, thumbnail_url,
                  views_count, is_published, created_at, updated_at`,
        [
          title, description, category_id, uploader_id,
          file_path, file_size, duration, thumbnail_url
        ]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to create video: ${err.message}`);
    }
  }

  static async findById(id) {
    try {
      const result = await query(
        `SELECT v.*, u.username as uploader_name, c.name as category_name
         FROM videos v
         LEFT JOIN users u ON v.uploader_id = u.id
         LEFT JOIN categories c ON v.category_id = c.id
         WHERE v.id = $1`,
        [id]
      );
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Failed to find video: ${err.message}`);
    }
  }

  static async getPublishedVideos(limit = 20, offset = 0) {
    try {
      const result = await query(
        `SELECT v.id, v.title, v.description, v.thumbnail_url, v.duration,
                v.views_count, v.created_at, u.username as uploader_name,
                c.name as category_name
         FROM videos v
         LEFT JOIN users u ON v.uploader_id = u.id
         LEFT JOIN categories c ON v.category_id = c.id
         WHERE v.is_published = true
         ORDER BY v.created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch videos: ${err.message}`);
    }
  }

  static async getVideosByCategory(categoryId, limit = 20, offset = 0) {
    try {
      const result = await query(
        `SELECT v.id, v.title, v.description, v.thumbnail_url, v.duration,
                v.views_count, v.created_at, u.username as uploader_name
         FROM videos v
         LEFT JOIN users u ON v.uploader_id = u.id
         WHERE v.category_id = $1 AND v.is_published = true
         ORDER BY v.created_at DESC
         LIMIT $2 OFFSET $3`,
        [categoryId, limit, offset]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch videos by category: ${err.message}`);
    }
  }

  static async searchVideos(searchTerm, limit = 20, offset = 0) {
    try {
      const result = await query(
        `SELECT v.id, v.title, v.description, v.thumbnail_url, v.duration,
                v.views_count, v.created_at, u.username as uploader_name
         FROM videos v
         LEFT JOIN users u ON v.uploader_id = u.id
         WHERE v.is_published = true AND
               (v.title ILIKE $1 OR v.description ILIKE $1)
         ORDER BY v.views_count DESC, v.created_at DESC
         LIMIT $2 OFFSET $3`,
        [`%${searchTerm}%`, limit, offset]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to search videos: ${err.message}`);
    }
  }

  static async incrementViewCount(videoId) {
    try {
      const result = await query(
        `UPDATE videos SET views_count = views_count + 1
         WHERE id = $1 RETURNING views_count`,
        [videoId]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to increment view count: ${err.message}`);
    }
  }

  static async publishVideo(videoId) {
    try {
      const result = await query(
        `UPDATE videos SET is_published = true, updated_at = CURRENT_TIMESTAMP
         WHERE id = $1 RETURNING *`,
        [videoId]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to publish video: ${err.message}`);
    }
  }

  static async getUserVideos(userId) {
    try {
      const result = await query(
        `SELECT * FROM videos WHERE uploader_id = $1 ORDER BY created_at DESC`,
        [userId]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch user videos: ${err.message}`);
    }
  }

  static async deleteVideo(videoId) {
    try {
      const result = await query(
        `DELETE FROM videos WHERE id = $1 RETURNING id`,
        [videoId]
      );
      return result.rows[0] != null;
    } catch (err) {
      throw new Error(`Failed to delete video: ${err.message}`);
    }
  }

  static async updateVideo(videoId, updateData) {
    const { title, description, category_id, thumbnail_url } = updateData;
    try {
      const result = await query(
        `UPDATE videos
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             category_id = COALESCE($3, category_id),
             thumbnail_url = COALESCE($4, thumbnail_url),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $5
         RETURNING *`,
        [title, description, category_id, thumbnail_url, videoId]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to update video: ${err.message}`);
    }
  }
}

export default Video;
