import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Video from '../models/Video.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const streamVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // Get video metadata
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    if (!video.is_published) {
      return res.status(403).json({ error: 'Video is not published' });
    }

    const filePath = video.file_path;

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Video file not found' });
    }

    // Get file stats
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    // Parse Range header
    const range = req.headers.range;

    if (range) {
      // Handle range request
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Validate range
      if (start >= fileSize || end >= fileSize || start > end) {
        res.status(416).set('Content-Range', `bytes */${fileSize}`).send();
        return;
      }

      const chunksize = end - start + 1;

      res.status(206);
      res.set({
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=3600'
      });

      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(res);
    } else {
      // Full file request
      res.set({
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=3600'
      });

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    }
  } catch (err) {
    console.error('Stream error:', err);
    res.status(500).json({ error: 'Failed to stream video' });
  }
};

export const getVideoInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    if (!video.is_published) {
      return res.status(403).json({ error: 'Video is not published' });
    }

    res.json({
      video: {
        id: video.id,
        title: video.title,
        description: video.description,
        duration: video.duration,
        file_size: video.file_size,
        views_count: video.views_count,
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

export const getVideoBrowse = async (req, res) => {
  try {
    const { category_id, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let videos;

    if (search) {
      videos = await Video.searchVideos(search, parseInt(limit), offset);
    } else if (category_id) {
      videos = await Video.getVideosByCategory(category_id, parseInt(limit), offset);
    } else {
      videos = await Video.getPublishedVideos(parseInt(limit), offset);
    }

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
