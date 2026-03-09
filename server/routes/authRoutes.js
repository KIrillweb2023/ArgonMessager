import express from 'express';
import {
  requestCode,
  verifyCode,
  setName,
  resendCode,
  checkAuth
} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Публичные роуты (без токена)
router.post('/request-code', requestCode);
router.post('/verify-code', verifyCode);
router.post('/set-name', setName);
router.post('/resend-code', resendCode);

// Защищенные роуты (с токеном)
router.get('/check', authMiddleware, checkAuth);

export default router;