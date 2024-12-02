import React from 'react';
import { SalesForm } from './SalesForm';
import { SalesList } from './SalesList';
import type { SalesRecord } from '../../types';

interface SalesInputProps {
  onSubmit: (date: Date, amount: number, description: string) => void;
  onDelete?: (id: string) => void;
  todaysSales: SalesRecord[];
}

export const SalesInput: React.FC<SalesInputProps> = ({ 
  onSubmit, 
  onDelete = () => {}, 
  todaysSales 
}) => {
  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-4">本日の売上</h2>
      <SalesForm onSubmit={onSubmit} />
      
      {todaysSales.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-medium mb-3">売上履歴</h3>
          <SalesList sales={todaysSales} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};