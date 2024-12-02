import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const createUserDocument = async (userId: string, email: string | null) => {
  if (!userId) return;
  
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const timestamp = serverTimestamp();
    
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email,
        userId,
        createdAt: timestamp,
        lastLogin: timestamp
      });
    } else {
      await setDoc(userRef, {
        lastLogin: timestamp
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error managing user document:', error);
    // Don't throw to prevent blocking auth flow
  }
};