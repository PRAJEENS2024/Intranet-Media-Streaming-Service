import express from 'express';
import {
  likeVideo,
  unlikeVideo,
  checkLikeStatus,
  getLikesCount,
  getUserLikedVideos
} from '../controllers/likeController.js';
import {
  recordWatch,
  getWatchHistory,
  deleteWatchEntry,
  clearWatchHistory,
  setContinuePosition,
  getContinueWatchingList,
  removeContinueWatch
} from '../controllers/engagementController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - all require authentication
router.use(authMiddleware);

// Like routes
router.post('/like', likeVideo);
router.post('/unlike', unlikeVideo);
router.get('/like-status/:videoId', checkLikeStatus);
router.get('/likes-count/:videoId', getLikesCount);
router.get('/liked-videos', getUserLikedVideos);

// Watch history routes
router.post('/watch-record', recordWatch);
router.get('/watch-history', getWatchHistory);
router.delete('/watch-entry', deleteWatchEntry);
router.delete('/watch-history', clearWatchHistory);

// Continue watching routes
router.post('/continue-position', setContinuePosition);
router.get('/continue-watching', getContinueWatchingList);
router.delete('/continue-watch', removeContinueWatch);

export default router;
