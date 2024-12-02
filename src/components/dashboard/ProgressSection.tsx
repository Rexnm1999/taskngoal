import React from 'react';
import { ProgressCircle } from '../progress/ProgressCircle';
import { getCurrentPeriods } from '../../utils/dateUtils';
import { useSalesTargets } from '../../hooks/useSalesTargets';
import { useSalesProgress } from '../../hooks/useSalesProgress';

export const ProgressSection: React.FC = () => {
  const { targets } = useSalesTargets();
  const { progress } = useSalesProgress();
  const periods = getCurrentPeriods();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {periods.map((period) => {
        const target = targets.find(t => t.period === period.type);
        const currentAmount = progress[period.type] || 0;
        const targetAmount = target?.amount || 0;
        
        return (
          <ProgressCircle
            key={period.type}
            value={targetAmount > 0 ? Math.round((currentAmount / targetAmount) * 100) : 0}
            title={period.label}
            currentAmount={currentAmount}
            targetAmount={targetAmount}
          />
        );
      })}
    </div>
  );
};