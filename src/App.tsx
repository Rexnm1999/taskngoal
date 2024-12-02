import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
    </div>
  );
};

export default App;