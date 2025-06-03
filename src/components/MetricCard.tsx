
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  color: 'blue' | 'red' | 'green' | 'yellow';
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color]}`}>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  );
};
