import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен невалидный или истек
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Перенаправляем на страницу авторизации
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Функция для проверки токена при загрузке
export const checkAuthToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await API.get('/auth/check');
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return true;
    }
    return false;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return false;
  }
};

export const authAPI = {
  requestCode: (email) => API.post('/auth/request-code', { email }),
  verifyCode: (email, code) => API.post('/auth/verify-code', { email, code }),
  setName: (email, name) => API.post('/auth/set-name', { email, name }),
  resendCode: (email) => API.post('/auth/resend-code', { email }),
  checkAuth: () => API.get('/auth/check'),
};

export default API;