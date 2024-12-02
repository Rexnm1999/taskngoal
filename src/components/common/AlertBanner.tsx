import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AlertBannerProps {
  message: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ message }) => {
  return (
    <div className="bg-gray-50 border-l-2 border-gray-900 p-4 mb-6">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-gray-900" />
        <p className="ml-3 text-sm text-gray-900">{message}</p>
      </div>
    </div>
  );
};