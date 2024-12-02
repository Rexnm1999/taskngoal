import { useState, useEffect } from 'react';
import { SalesTarget } from '../types';
import { getCurrentPeriods } from '../utils/dateUtils';
import { useAuth } from '../contexts/AuthContext';
import { updateSalesTarget, subscribeToSalesTargets } from '../services/targets.service';

export const useSalesTargets = () => {
  const [targets, setTargets] = useState<SalesTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const periods = getCurrentPeriods();

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToSalesTargets(currentUser.uid, (newTargets) => {
      setTargets(newTargets);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const updateTarget = async (period: SalesTarget['period'], amount: number) => {
    if (!currentUser || amount < 0) return;

    const targetPeriod = periods.find(p => p.type === period);
    if (!targetPeriod) return;

    try {
      await updateSalesTarget(currentUser.uid, {
        period,
        amount,
        startDate: targetPeriod.startDate,
        endDate: targetPeriod.endDate,
        userId: currentUser.uid,
      });
    } catch (error) {
      console.error('Error updating target:', error);
    }
  };

  return { targets, loading, updateTarget };
};