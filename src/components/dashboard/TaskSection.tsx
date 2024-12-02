import React from 'react';
import { TaskList } from '../tasks/TaskList';
import { useTaskManager } from '../../hooks/useTaskManager';
import { addDays } from 'date-fns';

export const TaskSection: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskManager();

  const getTodayTasks = () => tasks.filter(task => 
    new Date(task.date).toDateString() === new Date().toDateString()
  );

  const getTomorrowTasks = () => tasks.filter(task => 
    new Date(task.date).toDateString() === addDays(new Date(), 1).toDateString()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TaskList
        title="今日のタスク"
        tasks={getTodayTasks()}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onAddTask={addTask}
      />
      <TaskList
        title="明日のタスク"
        tasks={getTomorrowTasks()}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onAddTask={(title) => addTask(title, addDays(new Date(), 1))}
      />
    </div>
  );
};