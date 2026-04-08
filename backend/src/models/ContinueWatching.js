import { query } from '../config/database.js';

class ContinueWatching {
  static async setPosition(userId, videoId, lastPosition) {
    try {
      const result = await query(
        `INSERT INTO continue_watching (user_id, video_id, last_position, updated_at)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
         ON CONFLICT (user_id, video_id)
         DO UPDATE SET last_position = $3, updated_at = CURRENT_TIMESTAMP
         RETURNING id, user_id, video_id, last_position, updated_at`,
        [userId, videoId, lastPosition]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to set continue position: ${err.message}`);
    }
  }

  static async getPosition(userId, videoId) {
    try {
      const result = await query(
        `SELECT last_position FROM continue_watching
         WHERE user_id = $1 AND video_id = $2`,
        [userId, videoId]
      );
      return result.rows[0]?.last_position || 0;
    } catch (err) {
      throw new Error(`Failed to get continue position: ${err.message}`);
    }
  }

  static async getContinueList(userId, limit = 20) {
    try {
      const result = await query(
        `SELECT v.id, v.title, v.thumbnail_url, v.duration,
                u.username as uploader_name, cw.last_position,
                cw.updated_at
         FROM continue_watching cw
         JOIN videos v ON cw.video_id = v.id
         LEFT JOIN users u ON v.uploader_id = u.id
         WHERE cw.user_id = $1 AND v.is_published = true
         ORDER BY cw.updated_at DESC
         LIMIT $2`,
        [userId, limit]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch continue watching list: ${err.message}`);
    }
  }

  static async removeContinueWatch(userId, videoId) {
    try {
      const result = await query(
        `DELETE FROM continue_watching
         WHERE user_id = $1 AND video_id = $2
         RETURNING id`,
        [userId, videoId]
      );
      return result.rows[0] != null;
    } catch (err) {
      throw new Error(`Failed to remove continue watching: ${err.message}`);
    }
  }
}

export default ContinueWatching;
