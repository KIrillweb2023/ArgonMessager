import rateLimit from 'express-rate-limit';

// Ограничитель для отправки PIN
const sendPinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 3, // максимум 3 запроса
  message: { error: 'Too many PIN requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Ограничитель для верификации PIN
const verifyPinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many verification attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Ограничитель для сохранения имени
const saveNameLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: 10,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

export {
  sendPinLimiter,
  verifyPinLimiter,
  saveNameLimiter
};