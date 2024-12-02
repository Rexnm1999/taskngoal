import React from 'react';
import { ProgressSection } from './dashboard/ProgressSection';
import { TaskSection } from './dashboard/TaskSection';
import { SalesInput } from './sales/SalesInput';
import { SalesTargetSection } from './sales/SalesTargetSection';
import { TaskCalendar } from './calendar/TaskCalendar';
import { AlertBanner } from './common/AlertBanner';
import { useSalesTargets } from '../hooks/useSalesTargets';
import { useSalesManager } from '../hooks/useSalesManager';
import { useTaskManager } from '../hooks/useTaskManager';

export const Dashboard: React.FC = () => {
  const { targets, updateTarget } = useSalesTargets();
  const { tasks, addTask, toggleTask, deleteTask } = useTaskManager();
  const { todaysSales, addSale, deleteSale, error: salesError } = useSalesManager();
  const showTargetAlert = targets.some(target => target.amount === 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showTargetAlert && (
        <AlertBanner message="目標を設定してください" />
      )}

      <ProgressSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SalesTargetSection
            targets={targets}
            onUpdateTarget={updateTarget}
          />
          
          <TaskSection />
        </div>

        <div className="space-y-6">
          <SalesInput
            onSubmit={addSale}
            onDelete={deleteSale}
            todaysSales={todaysSales}
            error={salesError}
          />
          <TaskCalendar
            tasks={tasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </main>
  );
};