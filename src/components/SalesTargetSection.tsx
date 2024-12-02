import React, { useEffect } from 'react';
import { SalesTarget } from '../types';
import { 
  getQuarterlyAmount,
  getMonthlyAmount,
  getQuarterIndex,
  getMonthIndexInQuarter 
} from '../utils/calculateTargets';
import { getCurrentQuarter } from '../utils/dateUtils';

interface SalesTargetSectionProps {
  targets: SalesTarget[];
  onUpdateTarget: (type: SalesTarget['period'], amount: number) => void;
}

export const SalesTargetSection: React.FC<SalesTargetSectionProps> = ({
  targets,
  onUpdateTarget,
}) => {
  const yearlyTarget = targets.find(t => t.period === 'yearly')?.amount || 0;
  const weeklyTarget = targets.find(t => t.period === 'weekly')?.amount || 0;
  const currentQuarter = getCurrentQuarter();

  useEffect(() => {
    if (yearlyTarget > 0) {
      // Update quarterly targets
      targets
        .filter(t => t.period === 'quarterly')
        .forEach(target => {
          const quarterIndex = getQuarterIndex(target.startDate);
          const quarterlyAmount = getQuarterlyAmount(yearlyTarget, quarterIndex);
          
          if (target.amount !== quarterlyAmount) {
            onUpdateTarget('quarterly', quarterlyAmount);
            
            // Update monthly targets for this quarter
            targets
              .filter(t => t.period === 'monthly')
              .filter(t => getQuarterIndex(t.startDate) === quarterIndex)
              .forEach(monthTarget => {
                const monthIndex = getMonthIndexInQuarter(monthTarget.startDate);
                const monthlyAmount = getMonthlyAmount(quarterlyAmount, monthIndex);
                if (monthTarget.amount !== monthlyAmount) {
                  onUpdateTarget('monthly', monthlyAmount);
                }
              });
          }
        });
    }
  }, [yearlyTarget, targets, onUpdateTarget]);

  const handleTargetChange = (period: SalesTarget['period'], value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const amount = numericValue === '' ? 0 : parseInt(numericValue, 10);
    if (!isNaN(amount)) {
      onUpdateTarget(period, amount);
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
  };

  const getQuarterLabel = (index: number) => {
    const quarterMap = {
      0: '第1四半期',
      1: '第2四半期',
      2: '第3四半期',
      3: '第4四半期'
    };
    return quarterMap[index as keyof typeof quarterMap];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">売上目標</h2>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <label className="block font-medium mb-2">年間目標</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">¥</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatAmount(yearlyTarget)}
              onChange={(e) => handleTargetChange('yearly', e.target.value)}
              className="w-full p-2 pl-8 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              placeholder="0"
            />
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">四半期目標（自動計算）</h3>
          <div className="space-y-2">
            {targets
              .filter(t => t.period === 'quarterly')
              .sort((a, b) => getQuarterIndex(a.startDate) - getQuarterIndex(b.startDate))
              .map((target) => {
                const quarterIndex = getQuarterIndex(target.startDate);
                return (
                  <div key={target.id} className="flex justify-between items-center">
                    <span>
                      {getQuarterLabel(quarterIndex)}
                      <span className="text-sm text-gray-500 ml-2">
                        ({(quarterIndex + 1) * 10}%)
                      </span>
                    </span>
                    <span>¥{target.amount.toLocaleString()}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">月間目標（自動計算）</h3>
          <div className="space-y-2">
            {targets
              .filter(t => t.period === 'monthly')
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
              .map((target) => {
                const quarterIndex = getQuarterIndex(target.startDate);
                const monthIndex = getMonthIndexInQuarter(target.startDate);
                const percentages = ['16.7%', '33.3%', '50.0%'];
                return (
                  <div key={target.id} className="flex justify-between items-center">
                    <span>
                      {target.startDate.getMonth() + 1}月
                      <span className="text-sm text-gray-500 ml-2">
                        ({getQuarterLabel(quarterIndex)}の{percentages[monthIndex]})
                      </span>
                    </span>
                    <span>¥{target.amount.toLocaleString()}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <label className="block font-medium mb-2">今週の目標</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">¥</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatAmount(weeklyTarget)}
              onChange={(e) => handleTargetChange('weekly', e.target.value)}
              className="w-full p-2 pl-8 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};