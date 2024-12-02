import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressCircleProps {
  value: number;
  title: string;
  currentAmount: number;
  targetAmount: number;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value = 0,
  title = '',
  currentAmount = 0,
  targetAmount = 0,
}) => {
  const safeValue = isNaN(value) ? 0 : Math.max(0, Math.min(100, value));
  const safeCurrentAmount = isNaN(currentAmount) ? 0 : currentAmount;
  const safeTargetAmount = isNaN(targetAmount) ? 0 : targetAmount;

  return (
    <div className="card">
      <div className="w-24 h-24 mx-auto">
        <CircularProgressbar
          value={safeValue}
          text={`${Math.round(safeValue)}%`}
          styles={buildStyles({
            pathColor: safeValue >= 100 ? '#111827' : '#374151',
            textColor: '#111827',
            trailColor: '#F3F4F6',
            textSize: '20px',
            pathTransitionDuration: 0.5,
          })}
        />
      </div>
      <div className="text-center mt-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-500">
            目標: <span className="font-medium text-gray-900">¥{safeTargetAmount.toLocaleString()}</span>
          </p>
          <p className="text-sm text-gray-500">
            実績: <span className="font-medium text-gray-900">¥{safeCurrentAmount.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};