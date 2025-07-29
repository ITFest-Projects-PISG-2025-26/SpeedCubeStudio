// apps/frontend/src/components/stats/StatCard.tsx
import React from "react";

interface StatCardProps {
  label: string;
  value: string | number | null;
  target?: number | null;
  isTime?: boolean;
  subtitle?: string;
  color?: 'default' | 'success' | 'warning' | 'danger';
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  target, 
  isTime = true, 
  subtitle,
  color = 'default'
}) => {
  const formatTime = (ms: number | null): string => {
    if (ms === null || ms === undefined) return '--';
    return (ms / 1000).toFixed(3) + 's';
  };

  const formatValue = (val: string | number | null): string => {
    if (val === null || val === undefined) return '--';
    if (isTime && typeof val === 'number') return formatTime(val);
    return val.toString();
  };

  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'danger':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getTargetStatus = () => {
    if (!target || !value || typeof value !== 'number') return null;
    
    if (value <= target) {
      return { status: 'achieved', text: 'Target achieved!', color: 'text-green-600 dark:text-green-400' };
    } else {
      const diff = value - target;
      const diffText = `+${formatTime(diff)}`;
      return { status: 'pending', text: diffText, color: 'text-red-600 dark:text-red-400' };
    }
  };

  const targetStatus = getTargetStatus();

  return (
    <div className={`shadow rounded-xl p-4 text-center min-w-32 border ${getColorClasses()}`}>
      <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</h3>
      <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
        {formatValue(value)}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>
      )}
      {target && (
        <div className="mt-2 text-xs">
          <p className="text-gray-500 dark:text-gray-400">
            Target: {formatTime(target)}
          </p>
          {targetStatus && (
            <p className={targetStatus.color}>{targetStatus.text}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
