import type { Task } from '../types';
import { createDocument, updateDocument, deleteDocument, subscribeToCollection } from './firestore.service';

export const createTask = async (userId: string, task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
  if (!userId) return;
  return createDocument(`users/${userId}/tasks`, { ...task, userId });
};

export const updateTask = async (userId: string, taskId: string, updates: Partial<Task>) => {
  if (!userId || !taskId) return;
  return updateDocument(`users/${userId}/tasks`, taskId, updates);
};

export const deleteTask = async (userId: string, taskId: string) => {
  if (!userId || !taskId) return;
  return deleteDocument(`users/${userId}/tasks`, taskId);
};

export const subscribeToTasks = (userId: string, callback: (tasks: Task[]) => void) => {
  if (!userId) {
    callback([]);
    return () => {};
  }

  return subscribeToCollection<Task>(
    `users/${userId}/tasks`,
    callback,
    (doc) => ({
      ...doc,
      date: doc.date ? new Date(doc.date) : new Date(),
    })
  );
};