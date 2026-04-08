import { query } from '../config/database.js';

class Like {
  static async create(userId, videoId) {
    try {
      const result = await query(
        `INSERT INTO video_likes (user_id, video_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, video_id) DO NOTHING
         RETURNING id, user_id, video_id, created_at`,
        [userId, videoId]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to like video: ${err.message}`);
    }
  }

  static async remove(userId, videoId) {
    try {
      const result = await query(
        `DELETE FROM video_likes
         WHERE user_id = $1 AND video_id = $2
         RETURNING id`,
        [userId, videoId]
      );
      return result.rows[0] != null;
    } catch (err) {
      throw new Error(`Failed to unlike video: ${err.message}`);
    }
  }

  static async isLiked(userId, videoId) {
    try {
      const result = await query(
        `SELECT id FROM video_likes
         WHERE user_id = $1 AND video_id = $2`,
        [userId, videoId]
      );
      return result.rows.length > 0;
    } catch (err) {
      throw new Error(`Failed to check like status: ${err.message}`);
    }
  }

  static async getLikesCount(videoId) {
    try {
      const result = await query(
        `SELECT COUNT(*)::int as count FROM video_likes WHERE video_id = $1`,
        [videoId]
      );
      return result.rows[0].count;
    } catch (err) {
      throw new Error(`Failed to get likes count: ${err.message}`);
    }
  }

  static async getUserLikedVideos(userId, limit = 20, offset = 0) {
    try {
      const result = await query(
        `SELECT v.id, v.title, v.thumbnail_url, v.duration,
                v.views_count, v.created_at, u.username as uploader_name
         FROM video_likes vl
         JOIN videos v ON vl.video_id = v.id
         LEFT JOIN users u ON v.uploader_id = u.id
         WHERE vl.user_id = $1 AND v.is_published = true
         ORDER BY vl.created_at DESC
         LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch liked videos: ${err.message}`);
    }
  }
}

export default Like;
