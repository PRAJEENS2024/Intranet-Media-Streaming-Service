import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Video from '../models/Video.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads/videos';
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 5120000000; // 5GB

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    const { title, description, category_id } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!title) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Video title is required' });
    }

    // Get video duration (basic implementation)
    const duration = 0; // Would require ffmpeg in production

    // Create video record
    const videoData = {
      title,
      description: description || '',
      category_id: category_id || null,
      uploader_id: userId,
      file_path: req.file.path,
      file_size: req.file.size,
      duration,
      thumbnail_url: null
    };

    const video = await Video.create(videoData);

    res.status(201).json({
      message: 'Video uploaded successfully',
      video: {
        id: video.id,
        title: video.title,
        file_size: video.file_size,
        is_published: video.is_published
      }
    });
  } catch (err) {
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getVideoMeta = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Increment view count
    await Video.incrementViewCount(id);

    res.json({
      video: {
        id: video.id,
        title: video.title,
        description: video.description,
        duration: video.duration,
        file_size: video.file_size,
        views_count: video.views_count + 1,
        thumbnail_url: video.thumbnail_url,
        uploader_name: video.uploader_name,
        category_name: video.category_name,
        created_at: video.created_at
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Only uploader or admin can delete
    if (video.uploader_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    // Delete file from disk
    if (fs.existsSync(video.file_path)) {
      fs.unlinkSync(video.file_path);
    }

    // Delete record from database
    await Video.deleteVideo(id);

    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const publishVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Only uploader or admin can publish
    if (video.uploader_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const publishedVideo = await Video.publishVideo(id);

    res.json({
      message: 'Video published successfully',
      video: publishedVideo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyVideos = async (req, res) => {
  try {
    const userId = req.user.id;
    const videos = await Video.getUserVideos(userId);

    res.json({ videos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
