import type { SalesTarget } from '../types';
import { createDocument, subscribeToCollection } from './firestore.service';

export const updateSalesTarget = async (userId: string, target: Omit<SalesTarget, 'id' | 'userId'>) => {
  if (!userId) return;
  return createDocument(
    `users/${userId}/salesTargets`,
    { ...target, userId },
    target.period
  );
};

export const subscribeToSalesTargets = (userId: string, callback: (targets: SalesTarget[]) => void) => {
  if (!userId) {
    callback([]);
    return () => {};
  }

  return subscribeToCollection<SalesTarget>(
    `users/${userId}/salesTargets`,
    callback,
    (doc) => ({
      ...doc,
      startDate: doc.startDate.toDate(),
      endDate: doc.endDate.toDate(),
    })
  );
};