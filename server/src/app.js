
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { body } from "express-validator";
import { configDotenv } from "dotenv";


import authController from "./controllers/authController";
import { sendPinLimiter, verifyPinLimiter, saveNameLimiter } from "./middleware/rateLimitter";


const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Validation rules
const emailValidation = body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Valid email required');

const pinValidation = body('pin')
  .isLength({ min: 6, max: 6 })
  .isNumeric()
  .withMessage('6-digit PIN required');

const nameValidation = body('name')
  .isLength({ min: 2, max: 50 })
  .trim()
  .escape()
  .withMessage('Name must be 2-50 characters');

// Routes
app.post('/api/auth/send-pin',
  sendPinLimiter,
  emailValidation,
  authController.sendPin
);

app.post('/api/auth/verify-pin',
  verifyPinLimiter,
  emailValidation,
  pinValidation,
  authController.verifyPin
);

app.post('/api/auth/save-name',
  saveNameLimiter,
  nameValidation,
  authController.saveName
);

app.post('/api/auth/refresh-token',
  authController.refreshToken
);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  res.status(500).json({ error: 'Internal server error' });
});

export default app;