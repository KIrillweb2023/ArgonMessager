
import { User } from '../models/User';
import emailService from '../services/emailService';
import { Op } from "sequelize";
import { validationResult } from 'express-validator';
import { configDotenv } from 'dotenv';


class AuthController {
  // Отправка PIN на email
  async sendPin(req, res) {
    try {
      // Валидация
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      // Генерация PIN
      const pinCode = emailService.generatePinCode();
      
      // Установка времени истечения
      const pinExpires = new Date();
      pinExpires.setMinutes(pinExpires.getMinutes() + parseInt(process.env.PIN_EXPIRY_MINUTES));

      // Поиск или создание пользователя
      let user = await User.findOne({ where: { email: normalizedEmail } });
      
      const userData = {
        pinCode,
        pinExpires,
        isVerified: false,
        loginAttempts: 0,
        lockUntil: null
      };

      if (user) {
        // Проверка блокировки
        if (user.isLocked()) {
          const lockTime = Math.ceil((user.lockUntil - new Date()) / 60000);
          return res.status(423).json({ 
            error: `Account is locked. Try again in ${lockTime} minutes.` 
          });
        }
        
        await user.update(userData);
      } else {
        user = await User.create({
          email: normalizedEmail,
          ...userData
        });
      }

      // Отправка PIN
      await emailService.sendPinEmail(normalizedEmail, pinCode);

      // Маскируем email для ответа
      const maskedEmail = normalizedEmail.replace(/(.{2})(.*)(?=@)/, 
        (_, first, rest) => first + '*'.repeat(rest.length)
      );

      res.json({ 
        success: true, 
        message: `Verification code sent to ${maskedEmail}`,
        userId: user.id
      });

    } catch (error) {
      console.error('Send PIN error:', error);
      res.status(500).json({ error: 'Authentication service unavailable' });
    }
  }

  // Проверка PIN
  async verifyPin(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, pin } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      // Поиск пользователя с неистекшим PIN
      const user = await User.findOne({ 
        where: { 
          email: normalizedEmail,
          pinExpires: { [Op.gt]: new Date() }
        } 
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid or expired verification code' });
      }

      // Проверка блокировки
      if (user.isLocked()) {
        const lockTime = Math.ceil((user.lockUntil - new Date()) / 60000);
        return res.status(423).json({ 
          error: `Too many attempts. Try again in ${lockTime} minutes.` 
        });
      }

      // Проверка PIN
      const isValid = await user.validatePin(pin);

      if (!isValid) {
        await user.incrementLoginAttempts();
        return res.status(401).json({ error: 'Invalid verification code' });
      }

      // Сброс попыток входа
      await user.resetLoginAttempts();

      // Если имя уже есть - сразу логиним
      if (user.name) {
        await user.update({ 
          isVerified: true,
          lastLogin: new Date(),
          pinCode: null,
          pinExpires: null
        });

        const token = this.generateToken(user);
        
        return res.json({
          success: true,
          requiresName: false,
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        });
      }

      // Имя еще не введено
      res.json({
        success: true,
        requiresName: true,
        userId: user.id,
        message: 'Verification successful. Please complete your registration.'
      });

    } catch (error) {
      console.error('Verify PIN error:', error);
      res.status(500).json({ error: 'Verification service unavailable' });
    }
  }

  // Сохранение имени
  async saveName(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userId, name } = req.body;
      const sanitizedName = name.trim().replace(/<[^>]*>/g, ''); // Защита от XSS

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.isLocked()) {
        return res.status(423).json({ error: 'Account is temporarily locked' });
      }

      // Обновление пользователя
      await user.update({
        name: sanitizedName,
        isVerified: true,
        lastLogin: new Date(),
        pinCode: null,
        pinExpires: null,
        loginAttempts: 0,
        lockUntil: null
      });

      const token = this.generateToken(user);

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });

    } catch (error) {
      console.error('Save name error:', error);
      res.status(500).json({ error: 'Registration service unavailable' });
    }
  }

  // Генерация JWT токена
  generateToken(user) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: process.env.JWT_EXPIRES_IN,
        issuer: 'secure-messenger',
        audience: 'messenger-client'
      }
    );
  }

  // Обновление токена
  async refreshToken(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(401).json({ error: 'Token required' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: true
      });

      const user = await User.findByPk(decoded.id);

      if (!user || !user.isVerified) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const newToken = this.generateToken(user);

      res.json({
        success: true,
        token: newToken
      });

    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
}

export default new AuthController();