import { useState, useEffect } from 'react';
import { SalesRecord } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { createSale, deleteSale, subscribeToSales } from '../services/sales.service';
import { startOfDay, endOfDay } from 'date-fns';

export const useSalesManager = () => {
  const [todaysSales, setTodaysSales] = useState<SalesRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    return subscribeToSales(currentUser.uid, (sales) => {
      const today = startOfDay(new Date());
      const tomorrow = endOfDay(today);
      
      const filteredSales = sales
        .filter(sale => sale.date >= today && sale.date <= tomorrow)
        .sort((a, b) => b.date.getTime() - a.date.getTime());
      
      setTodaysSales(filteredSales);
    });
  }, [currentUser]);

  const addSale = async (date: Date, amount: number, description: string) => {
    if (!currentUser) return;
    setError(null);

    try {
      await createSale(currentUser.uid, {
        date,
        amount,
        description: description.trim(),
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : '売上の追加に失敗しました');
      throw error;
    }
  };

  const removeSale = async (id: string) => {
    if (!currentUser || !id) return;
    setError(null);

    try {
      await deleteSale(currentUser.uid, id);
    } catch (error) {
      setError(error instanceof Error ? error.message : '売上の削除に失敗しました');
      throw error;
    }
  };

  return {
    todaysSales,
    error,
    addSale,
    deleteSale: removeSale,
  };
};