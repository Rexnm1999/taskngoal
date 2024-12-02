import React from 'react';
import { Task } from '../../types';
import { CheckSquare, Square, Trash2 } from 'lucide-react';

interface DayTaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const DayTaskList: React.FC<DayTaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        タスクはありません
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-md transition-colors"
          >
            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={() => onToggleTask(task.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                {task.completed ? (
                  <CheckSquare className="h-5 w-5" />
                ) : (
                  <Square className="h-5 w-5" />
                )}
              </button>
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};