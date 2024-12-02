import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { Task } from '../types';
import { Plus, X, CheckSquare, Square, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { DayTaskList } from './calendar/DayTaskList';

interface TaskCalendarProps {
  tasks: Task[];
  onAddTask: (title: string, date: Date) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskCalendar: React.FC<TaskCalendarProps> = ({ 
  tasks, 
  onAddTask,
  onToggleTask,
  onDeleteTask
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);
  const { currentUser } = useAuth();

  const handleDateClick = (date: Date) => {
    if (currentUser) {
      setSelectedDate(date);
      setShowTaskInput(true);
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() && selectedDate && currentUser) {
      onAddTask(newTaskTitle.trim(), selectedDate);
      setNewTaskTitle('');
    }
  };

  const getTileContent = ({ date }: { date: Date }) => {
    const dayTasks = tasks.filter(
      task => format(new Date(task.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    if (dayTasks.length === 0) return null;

    const completedTasks = dayTasks.filter(task => task.completed).length;

    return (
      <div className="text-xs mt-1">
        <span className="bg-gray-100 text-gray-800 px-1 rounded">
          {completedTasks}/{dayTasks.length}
        </span>
      </div>
    );
  };

  const getSelectedDayTasks = () => {
    if (!selectedDate) return [];
    return tasks.filter(
      task => format(new Date(task.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    ).sort((a, b) => {
      // Completed tasks go to the bottom
      if (a.completed === b.completed) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.completed ? 1 : -1;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">タスクカレンダー</h2>
      <div className="calendar-container mb-4">
        <Calendar
          onChange={handleDateClick}
          value={selectedDate}
          tileContent={getTileContent}
          className="rounded-lg border-none shadow-sm"
          locale="ja-JP"
        />
      </div>

      {showTaskInput && selectedDate && (
        <div className="mt-4 border rounded-lg divide-y">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">
                {format(selectedDate, 'yyyy年MM月dd日')}のタスク
              </h3>
              <button
                onClick={() => setShowTaskInput(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="新しいタスクを入力"
                className="flex-1 p-2 border rounded-md"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTask();
                  }
                }}
              />
              <button
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim()}
                className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-300"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <DayTaskList
            tasks={getSelectedDayTasks()}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      )}
    </div>
  );
};