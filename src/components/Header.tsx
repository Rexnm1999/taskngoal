import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-gray-900">ARFA Goals&Tasks</h1>
          {currentUser && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{currentUser.email}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-1" />
                ログアウト
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};