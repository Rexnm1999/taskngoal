import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns';
import { Period } from '../types';

export const getCurrentPeriods = (): Period[] => {
  const now = new Date();
  const currentQuarter = Math.floor(now.getMonth() / 3);
  
  return [
    {
      startDate: startOfYear(now),
      endDate: endOfYear(now),
      type: 'yearly',
      label: `${now.getFullYear()}年`,
    },
    {
      startDate: startOfQuarter(now),
      endDate: endOfQuarter(now),
      type: 'quarterly',
      label: `第${currentQuarter + 1}四半期`,
    },
    {
      startDate: startOfMonth(now),
      endDate: endOfMonth(now),
      type: 'monthly',
      label: `${now.getMonth() + 1}月`,
    },
    {
      startDate: startOfWeek(now, { weekStartsOn: 1 }),
      endDate: endOfWeek(now, { weekStartsOn: 1 }),
      type: 'weekly',
      label: '今週',
    },
  ];
};

export const isToday = (date: string): boolean => {
  const today = new Date();
  const compareDate = new Date(date);
  return (
    today.getDate() === compareDate.getDate() &&
    today.getMonth() === compareDate.getMonth() &&
    today.getFullYear() === compareDate.getFullYear()
  );
};

export const isTomorrow = (date: string): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const compareDate = new Date(date);
  return (
    tomorrow.getDate() === compareDate.getDate() &&
    tomorrow.getMonth() === compareDate.getMonth() &&
    tomorrow.getFullYear() === compareDate.getFullYear()
  );
};

export const getCurrentQuarter = (date: Date = new Date()): number => {
  return Math.floor(date.getMonth() / 3);
};