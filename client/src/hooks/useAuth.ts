import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: код, 3: имя, 4: чат
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [timer, setTimer] = useState(0);

  // Загрузка пользователя из localStorage при старте
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      // Если пользователь уже авторизован - сразу редирект в чат
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Таймер для повторной отправки кода
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Шаг 1: Отправка email
  const sendEmail = async (emailValue) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authAPI.requestCode(emailValue);
      setEmail(emailValue);
      setStep(2);
      setTimer(60);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка отправки кода');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Шаг 2: Проверка кода
  const verifyCode = async (code) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authAPI.verifyCode(email, code);
      
      if (response.data.requiresName) {
        // Если нужно имя - переходим на шаг 3
        setStep(3);
      } else {
        // Если имя уже есть - сохраняем токен и редирект в чат
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        // Редирект на главную
        navigate('/', { replace: true });
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Неверный код');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Шаг 3: Установка имени
  const saveName = async (name) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authAPI.setName(email, name);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      // Редирект на главную
      navigate('/', { replace: true });
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка сохранения имени');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Повторная отправка кода
  const resendCode = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authAPI.resendCode(email);
      setTimer(60);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка повторной отправки');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Выход из аккаунта
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setStep(1);
    setEmail('');
    navigate('/authenfication', { replace: true });
  };

  return {
    step,
    email,
    loading,
    error,
    user,
    timer,
    sendEmail,
    verifyCode,
    saveName,
    resendCode,
    logout,
  };
};