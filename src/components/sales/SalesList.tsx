import React from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import type { SalesRecord } from '../../types';

interface SalesListProps {
  sales: SalesRecord[];
  onDelete: (id: string) => void;
}

export const SalesList: React.FC<SalesListProps> = ({ sales, onDelete }) => {
  const totalAmount = sales.reduce((sum, sale) => sum + sale.amount, 0);

  if (sales.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-4">
        本日の売上はまだありません
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">本日の合計</span>
          <span className="text-xl font-bold">¥{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2">
        {sales.map((sale) => (
          <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md group hover:bg-gray-100 transition-colors">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">¥{sale.amount.toLocaleString()}</span>
                <span className="text-xs text-gray-500">{format(sale.date, 'HH:mm')}</span>
              </div>
              <p className="text-sm text-gray-600">{sale.description}</p>
            </div>
            <button
              onClick={() => onDelete(sale.id)}
              className="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-900 transition-all duration-200"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};