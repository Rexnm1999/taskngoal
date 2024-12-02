import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  onSnapshot, 
  serverTimestamp, 
  DocumentData,
  FirestoreError
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { handleFirebaseError } from './error.service';

export const createDocument = async <T extends DocumentData>(
  collectionPath: string,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
  id?: string
): Promise<string> => {
  try {
    const collectionRef = collection(db, collectionPath);
    const docRef = id ? doc(collectionRef, id) : doc(collectionRef);
    const timestamp = serverTimestamp();
    
    await setDoc(docRef, {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    
    return docRef.id;
  } catch (error) {
    handleFirebaseError(error as FirestoreError, 'document creation');
    return '';
  }
};

export const updateDocument = async <T extends DocumentData>(
  collectionPath: string,
  id: string,
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionPath, id);
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    handleFirebaseError(error as FirestoreError, 'document update');
  }
};

export const deleteDocument = async (
  collectionPath: string,
  id: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionPath, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirebaseError(error as FirestoreError, 'document deletion');
  }
};

export const subscribeToCollection = <T>(
  collectionPath: string,
  callback: (data: T[]) => void,
  transform?: (doc: DocumentData) => Partial<T>
): (() => void) => {
  try {
    const collectionRef = collection(db, collectionPath);
    const q = query(collectionRef);
    
    return onSnapshot(q, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => {
          const baseData = {
            id: doc.id,
            ...doc.data(),
          };
          return transform ? transform(baseData) : baseData as T;
        });
        callback(data as T[]);
      },
      (error) => {
        handleFirebaseError(error, 'collection subscription');
        callback([]);
      }
    );
  } catch (error) {
    handleFirebaseError(error as FirestoreError, 'subscription setup');
    return () => {};
  }
};