import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  getAllUsers
} from '../controllers/authController.js';
import {
  validateRegister,
  validateLogin,
  handleValidationErrors
} from '../utils/validators.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

// Admin routes
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

export default router;
