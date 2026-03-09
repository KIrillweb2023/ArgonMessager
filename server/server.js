import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Мидлвары
app.use(cors({
  origin: 'http://localhost:5173', // или ваш порт фронтенда
  credentials: true
}));
app.use(express.json());

// Роуты
app.use('/api/auth', authRoutes);

// Проверка сервера
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Включаем WAL режим для SQLite
    await sequelize.query('PRAGMA journal_mode=WAL');
    
    // Синхронизируем модели с БД
    await sequelize.sync({ alter: true });
    console.log('✅ База данных готова');

    app.listen(PORT, () => {
      console.log(`✅ Сервер запущен на порту ${PORT}`);
      console.log(`📍 Локальный адрес: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Ошибка запуска сервера:', error);
    process.exit(1);
  }
};

startServer();