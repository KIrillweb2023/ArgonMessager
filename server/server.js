
import app from './src/app';
import { sequelize } from './src/config/database';
import { configDotenv } from 'dotenv';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Проверка подключения к БД
    await sequelize.authenticate();
    console.log('✓ Database connected successfully');

    // Синхронизация моделей (только для разработки!)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✓ Models synchronized');
    }

    // Запуск сервера
    const server = app.listen(PORT, () => {
      console.log(`✓ Auth server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ Security features enabled`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        sequelize.close();
        console.log('Server closed');
      });
    });

  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();