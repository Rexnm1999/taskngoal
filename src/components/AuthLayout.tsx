import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Login } from './Login';
import App from '../App';

export const AuthLayout: React.FC = () => {
  const { currentUser } = useAuth();

  return currentUser ? <App /> : <Login />;
};