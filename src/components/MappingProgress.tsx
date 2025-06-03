
import React from 'react';

interface MappingProgressProps {
  total: number;
  confirmed: number;
  needsReview: number;
}

export const MappingProgress: React.FC<MappingProgressProps> = ({ 
  total, 
  confirmed, 
  needsReview 
}) => {
  const confirmedPercent = total > 0 ? (confirmed / total) * 100 : 0;
  const reviewPercent = total > 0 ? (needsReview / total) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 text-green-700">Skills Mapping Progress</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Total Skills: {total}</span>
          <span>Confirmed: {confirmed}</span>
          <span>Needs Review: {needsReview}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-l-full" 
            style={{ width: `${confirmedPercent}%` }}
          ></div>
          <div 
            className="bg-yellow-500 h-3 rounded-r-full relative -top-3" 
            style={{ width: `${reviewPercent}%`, marginLeft: `${confirmedPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Confirmed ({confirmedPercent.toFixed(1)}%)</span>
          <span>Needs Review ({reviewPercent.toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  );
};
