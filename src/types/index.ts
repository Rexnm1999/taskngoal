export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  userId: string;
  createdAt: Date;
}

export interface SalesTarget {
  id: string;
  period: 'yearly' | 'quarterly' | 'monthly' | 'weekly';
  amount: number;
  startDate: Date;
  endDate: Date;
  userId: string;
}

export interface SalesRecord {
  id: string;
  amount: number;
  description: string;
  date: Date;
  userId: string;
  createdAt: Date;
}

export interface Period {
  startDate: Date;
  endDate: Date;
  type: 'yearly' | 'quarterly' | 'monthly' | 'weekly';
  label: string;
}