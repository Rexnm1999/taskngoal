import type { SalesRecord } from '../types';
import { createDocument, deleteDocument, subscribeToCollection } from './firestore.service';

export const createSale = async (userId: string, sale: Omit<SalesRecord, 'id' | 'userId' | 'createdAt'>) => {
  if (!userId) return;
  return createDocument(`users/${userId}/sales`, { ...sale, userId });
};

export const deleteSale = async (userId: string, saleId: string) => {
  if (!userId || !saleId) return;
  return deleteDocument(`users/${userId}/sales`, saleId);
};

export const subscribeToSales = (userId: string, callback: (sales: SalesRecord[]) => void) => {
  if (!userId) {
    callback([]);
    return () => {};
  }

  return subscribeToCollection<SalesRecord>(
    `users/${userId}/sales`,
    callback,
    (doc) => ({
      ...doc,
      date: doc.date.toDate(),
    })
  );
};