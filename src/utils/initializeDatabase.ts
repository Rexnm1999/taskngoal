import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getCurrentPeriods } from './dateUtils';

export const initializeUserData = async (userId: string) => {
  if (!userId) return;

  try {
    const timestamp = serverTimestamp();
    const periods = getCurrentPeriods();

    // Initialize sales targets
    for (const period of periods) {
      const targetRef = doc(db, `users/${userId}/salesTargets/${period.type}`);
      await setDoc(targetRef, {
        period: period.type,
        amount: 0,
        startDate: period.startDate,
        endDate: period.endDate,
        userId,
        createdAt: timestamp,
        updatedAt: timestamp,
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
};