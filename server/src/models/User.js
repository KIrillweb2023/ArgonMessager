
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 50]
    }
  },
  pinCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pinExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lockUntil: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ]
});

// Хеширование пин-кода перед сохранением
User.beforeSave(async (user) => {
  if (user.changed('pinCode') && user.pinCode) {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS));
    user.pinCode = await bcrypt.hash(user.pinCode, salt);
  }
});

// Метод для проверки пин-кода
User.prototype.validatePin = async function(pin) {
  return bcrypt.compare(pin, this.pinCode);
};

// Метод для проверки блокировки
User.prototype.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > new Date());
};

// Метод для увеличения попыток входа
User.prototype.incrementLoginAttempts = async function() {
  const updates = { loginAttempts: this.loginAttempts + 1 };
  
  // Блокируем аккаунт после MAX_LOGIN_ATTEMPTS
  if (this.loginAttempts + 1 >= parseInt(process.env.MAX_LOGIN_ATTEMPTS)) {
    updates.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // Блокировка на 30 минут
  }
  
  await this.update(updates);
};

// Сброс попыток входа
User.prototype.resetLoginAttempts = async function() {
  await this.update({
    loginAttempts: 0,
    lockUntil: null
  });
};

export {User}