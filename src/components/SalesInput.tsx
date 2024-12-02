import React from 'react';
import { SalesForm } from './sales/SalesForm';
import { SalesList } from './sales/SalesList';
import type { SalesRecord } from '../types';

interface SalesInputProps {
  onSubmit: (date: Date, amount: number, description: string) => void;
  onDelete: (id: string) => void;
  todaysSales: SalesRecord[];
  error?: string | null;
}

export const SalesInput: React.FC<SalesInputProps> = ({ 
  onSubmit, 
  onDelete, 
  todaysSales,
  error 
}) => {
  const totalAmount = todaysSales.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <div className="card space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">本日の売上入力</h2>
        <div className="text-right">
          <div className="text-sm text-gray-500">本日の合計</div>
          <div className="text-xl font-bold">¥{totalAmount.toLocaleString()}</div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <SalesForm onSubmit={onSubmit} />
      
      {todaysSales.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-3">売上履歴</h3>
          <SalesList sales={todaysSales} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};