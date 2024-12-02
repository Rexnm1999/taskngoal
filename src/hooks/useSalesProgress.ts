import { useState, useEffect } from 'react';
import { SalesRecord, Period } from '../types';
import { getCurrentPeriods } from '../utils/dateUtils';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToSales } from '../services/sales.service';

export const useSalesProgress = () => {
  const [progress, setProgress] = useState<Record<Period['type'], number>>({
    yearly: 0,
    quarterly: 0,
    monthly: 0,
    weekly: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setProgress({
        yearly: 0,
        quarterly: 0,
        monthly: 0,
        weekly: 0,
      });
      setLoading(false);
      return;
    }

    const periods = getCurrentPeriods();

    try {
      const unsubscribe = subscribeToSales(currentUser.uid, (sales) => {
        try {
          const newProgress = periods.reduce((acc, period) => {
            const periodSales = sales.filter(
              sale => sale.date >= period.startDate && sale.date <= period.endDate
            );
            const totalAmount = periodSales.reduce((sum, sale) => sum + (sale.amount || 0), 0);
            
            return {
              ...acc,
              [period.type]: totalAmount,
            };
          }, {} as Record<Period['type'], number>);

          setProgress(newProgress);
          setError(null);
        } catch (err) {
          console.error('Error processing sales data:', err);
          setError('売上データの処理に失敗しました');
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up sales listener:', err);
      setError('売上データの監視に失敗しました');
      setLoading(false);
    }
  }, [currentUser]);

  return { progress, loading, error };
};