import Like from '../models/Like.js';

export const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.body;
    const userId = req.user.id;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const like = await Like.create(userId, videoId);

    res.status(201).json({
      message: 'Video liked successfully',
      like: like ? { id: like.id } : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const unlikeVideo = async (req, res) => {
  try {
    const { videoId } = req.body;
    const userId = req.user.id;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const removed = await Like.remove(userId, videoId);

    if (!removed) {
      return res.status(404).json({ error: 'Like not found' });
    }

    res.json({ message: 'Video unliked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkLikeStatus = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const isLiked = await Like.isLiked(userId, videoId);

    res.json({ isLiked });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLikesCount = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const count = await Like.getLikesCount(videoId);

    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserLikedVideos = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const videos = await Like.getUserLikedVideos(userId, parseInt(limit), offset);

    res.json({
      videos,
      page: parseInt(page),
      limit: parseInt(limit),
      count: videos.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
