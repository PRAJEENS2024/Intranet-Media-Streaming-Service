import WatchHistory from '../models/WatchHistory.js';
import ContinueWatching from '../models/ContinueWatching.js';

export const recordWatch = async (req, res) => {
  try {
    const { videoId, durationWatched } = req.body;
    const userId = req.user.id;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const watch = await WatchHistory.recordWatch(userId, videoId, durationWatched || 0);

    res.status(201).json({
      message: 'Watch recorded successfully',
      watch
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWatchHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const history = await WatchHistory.getWatchHistory(userId, parseInt(limit), offset);

    res.json({
      history,
      page: parseInt(page),
      limit: parseInt(limit),
      count: history.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteWatchEntry = async (req, res) => {
  try {
    const { videoId } = req.body;
    const userId = req.user.id;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const deleted = await WatchHistory.deleteWatchHistory(userId, videoId);

    if (!deleted) {
      return res.status(404).json({ error: 'Watch entry not found' });
    }

    res.json({ message: 'Watch entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearWatchHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const count = await WatchHistory.clearAllHistory(userId);

    res.json({
      message: 'Watch history cleared successfully',
      deletedCount: count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setContinuePosition = async (req, res) => {
  try {
    const { videoId, lastPosition } = req.body;
    const userId = req.user.id;

    if (!videoId || lastPosition === undefined) {
      return res.status(400).json({ error: 'Video ID and position are required' });
    }

    const position = await ContinueWatching.setPosition(userId, videoId, lastPosition);

    res.json({
      message: 'Continue position saved',
      position: position.last_position
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getContinueWatchingList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 20 } = req.query;

    const videos = await ContinueWatching.getContinueList(userId, parseInt(limit));

    res.json({ videos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeContinueWatch = async (req, res) => {
  try {
    const { videoId } = req.body;
    const userId = req.user.id;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const removed = await ContinueWatching.removeContinueWatch(userId, videoId);

    if (!removed) {
      return res.status(404).json({ error: 'Continue watch entry not found' });
    }

    res.json({ message: 'Continue watch entry removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
