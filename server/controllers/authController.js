import User from '../models/User.js';
import generateCode from '../utils/generateCode.js';
import sendVerificationCode from '../utils/emailService.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Шаг 1: Отправка кода на email
export const requestCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email обязателен' });
    }

    // Генерируем 6-значный код
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // +10 минут

    // Ищем пользователя
    let user = await User.findOne({ where: { email } });
    
    if (user) {
      // Обновляем код у существующего
      await user.update({
        verificationCode: code,
        verificationCodeExpires: expiresAt,
        isVerified: false
      });
    } else {
      // Создаем нового
      user = await User.create({
        email,
        verificationCode: code,
        verificationCodeExpires: expiresAt
      });
    }

    // Отправляем код на почту
    const emailSent = await sendVerificationCode(email, code);
    
    if (!emailSent) {
      return res.status(500).json({ message: 'Ошибка отправки email' });
    }

    res.json({ 
      message: 'Код отправлен на почту',
      email: email 
    });

  } catch (error) {
    console.error('Ошибка requestCode:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Шаг 2: Проверка кода
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email и код обязательны' });
    }

    if (code.length !== 6) {
      return res.status(400).json({ message: 'Код должен быть 6-значным' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Проверяем код
    if (user.verificationCode !== code) {
      return res.status(400).json({ message: 'Неверный код' });
    }

    // Проверяем срок действия
    if (new Date() > new Date(user.verificationCodeExpires)) {
      return res.status(400).json({ message: 'Код истек' });
    }

    // Код верный - подтверждаем email
    await user.update({ isVerified: true });

    // Если у пользователя уже есть имя - сразу логиним
    if (user.name) {
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      return res.json({
        message: 'Успешный вход',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    }

    // Если имени нет - просим ввести
    res.json({
      message: 'Email подтвержден',
      email: user.email,
      requiresName: true
    });

  } catch (error) {
    console.error('Ошибка verifyCode:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Шаг 3: Установка имени
export const setName = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: 'Email и имя обязательны' });
    }

    if (name.length < 2 || name.length > 30) {
      return res.status(400).json({ message: 'Имя должно быть от 2 до 30 символов' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Email не подтвержден' });
    }

    // Обновляем имя
    await user.update({ name });

    // Создаем токен
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Регистрация завершена',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Ошибка setName:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Повторная отправка кода
export const resendCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email обязателен' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Генерируем новый код
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await user.update({
      verificationCode: code,
      verificationCodeExpires: expiresAt
    });

    const emailSent = await sendVerificationCode(email, code);
    
    if (!emailSent) {
      return res.status(500).json({ message: 'Ошибка отправки email' });
    }

    res.json({ message: 'Новый код отправлен на почту' });

  } catch (error) {
    console.error('Ошибка resendCode:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Проверка токена
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['verificationCode', 'verificationCodeExpires'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Ошибка checkAuth:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};