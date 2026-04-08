import { query } from '../config/database.js';

class WatchHistory {
  static async recordWatch(userId, videoId, durationWatched = 0) {
    try {
      const result = await query(
        `INSERT INTO watch_history (user_id, video_id, duration_watched, watched_at)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
         ON CONFLICT (user_id, video_id) 
         DO UPDATE SET duration_watched = $3, watched_at = CURRENT_TIMESTAMP
         RETURNING id, user_id, video_id, duration_watched, watched_at`,
        [userId, videoId, durationWatched]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to record watch: ${err.message}`);
    }
  }

  static async getWatchHistory(userId, limit = 20, offset = 0) {
    try {
      const result = await query(
        `SELECT v.id, v.title, v.thumbnail_url, v.duration,
                v.views_count, v.created_at, u.username as uploader_name,
                wh.duration_watched, wh.watched_at
         FROM watch_history wh
         JOIN videos v ON wh.video_id = v.id
         LEFT JOIN users u ON v.uploader_id = u.id
         WHERE wh.user_id = $1 AND v.is_published = true
         ORDER BY wh.watched_at DESC
         LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch watch history: ${err.message}`);
    }
  }

  static async deleteWatchHistory(userId, videoId) {
    try {
      const result = await query(
        `DELETE FROM watch_history
         WHERE user_id = $1 AND video_id = $2
         RETURNING id`,
        [userId, videoId]
      );
      return result.rows[0] != null;
    } catch (err) {
      throw new Error(`Failed to delete watch history: ${err.message}`);
    }
  }

  static async clearAllHistory(userId) {
    try {
      const result = await query(
        `DELETE FROM watch_history WHERE user_id = $1`,
        [userId]
      );
      return result.rowCount;
    } catch (err) {
      throw new Error(`Failed to clear watch history: ${err.message}`);
    }
  }

  static async getLastWatchedVideos(userId, limit = 10) {
    try {
      const result = await query(
        `SELECT v.id, v.title, v.thumbnail_url, v.duration,
                u.username as uploader_name, wh.duration_watched,
                wh.watched_at
         FROM watch_history wh
         JOIN videos v ON wh.video_id = v.id
         LEFT JOIN users u ON v.uploader_id = u.id
         WHERE wh.user_id = $1 AND v.is_published = true
         ORDER BY wh.watched_at DESC
         LIMIT $2`,
        [userId, limit]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch recent watches: ${err.message}`);
    }
  }
}

export default WatchHistory;
