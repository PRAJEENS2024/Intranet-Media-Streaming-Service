import express from 'express';
import {
  uploadVideo,
  getVideoMeta,
  deleteVideo,
  publishVideo,
  getMyVideos
} from '../controllers/videoController.js';
import {
  streamVideo,
  getVideoInfo,
  getVideoBrowse
} from '../controllers/streamController.js';
import { videoUpload } from '../middleware/upload.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes - browsing
router.get('/browse', getVideoBrowse);
router.get('/info/:id', getVideoInfo);
router.get('/stream/:id', streamVideo);

// Protected routes - upload and management
router.post('/upload', authMiddleware, adminMiddleware, videoUpload.single('video'), uploadVideo);
router.get('/my-videos', authMiddleware, getMyVideos);
router.post('/:id/publish', authMiddleware, publishVideo);
router.delete('/:id', authMiddleware, deleteVideo);

export default router;
