import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    // Если уже авторизован - редирект на главную
    return <Navigate to="/" replace />;
  }

  return children;
};