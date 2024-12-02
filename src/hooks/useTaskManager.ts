import { useState, useEffect } from 'react';
import { Task } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { createTask, updateTask, deleteTask, subscribeToTasks } from '../services/tasks.service';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    return subscribeToTasks(currentUser.uid, setTasks);
  }, [currentUser]);

  const addTask = async (title: string, date: Date = new Date()) => {
    if (!currentUser || !title.trim()) return;

    try {
      await createTask(currentUser.uid, {
        title,
        completed: false,
        date: date.toISOString(),
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (id: string) => {
    if (!currentUser) return;

    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        await updateTask(currentUser.uid, id, {
          completed: !task.completed
        });
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!currentUser) return;

    try {
      await deleteTask(currentUser.uid, id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask: handleDeleteTask,
  };
};