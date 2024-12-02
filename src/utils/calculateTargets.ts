import { SalesTarget } from '../types';

export const calculateQuarterlyTargets = (yearlyAmount: number): number[] => {
  return [
    Math.round(yearlyAmount * 0.10), // Q1: 10%
    Math.round(yearlyAmount * 0.20), // Q2: 20%
    Math.round(yearlyAmount * 0.30), // Q3: 30%
    Math.round(yearlyAmount * 0.40), // Q4: 40%
  ];
};

export const calculateMonthlyTargets = (quarterlyAmount: number): number[] => {
  return [
    Math.round(quarterlyAmount * 0.167), // Month 1: 16.7%
    Math.round(quarterlyAmount * 0.333), // Month 2: 33.3%
    Math.round(quarterlyAmount * 0.500), // Month 3: 50.0%
  ];
};

export const getQuarterIndex = (date: Date): number => {
  return Math.floor(date.getMonth() / 3);
};

export const getMonthIndexInQuarter = (date: Date): number => {
  return date.getMonth() % 3;
};

export const getQuarterlyAmount = (yearlyAmount: number, quarterIndex: number): number => {
  const percentages = [0.10, 0.20, 0.30, 0.40];
  return Math.round(yearlyAmount * percentages[quarterIndex]);
};

export const getMonthlyAmount = (quarterlyAmount: number, monthIndex: number): number => {
  const percentages = [0.167, 0.333, 0.500];
  return Math.round(quarterlyAmount * percentages[monthIndex]);
};