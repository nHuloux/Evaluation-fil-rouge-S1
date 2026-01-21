import React, { useMemo } from 'react';
import { RubricItem, ScoreLevel } from '../types';

interface RubricSliderProps {
  item: RubricItem;
  value: number;
  onChange: (value: number) => void;
}

export const RubricSlider: React.FC<RubricSliderProps> = ({ item, value, onChange }) => {
  
  const level: ScoreLevel = useMemo(() => {
    const ratio = value / item.maxPoints;
    if (ratio <= 0.33) return 'low';
    if (ratio <= 0.66) return 'mid';
    return 'high';
  }, [value, item.maxPoints]);

  const getDescription = () => {
    switch (level) {
      case 'low': return item.levelLow;
      case 'mid': return item.levelMid;
      case 'high': return item.levelHigh;
    }
  };

  const getColorClass = () => {
    switch (level) {
      case 'low': return 'border-red-200 bg-red-50 text-red-800';
      case 'mid': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'high': return 'border-green-200 bg-green-50 text-green-800';
    }
  };

  const getSliderColor = () => {
     switch (level) {
      case 'low': return 'accent-red-600';
      case 'mid': return 'accent-yellow-600';
      case 'high': return 'accent-green-600';
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{item.criteria}</h3>
          <p className="text-sm text-slate-500 mt-1">{item.description}</p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">{value}</span>
            <span className="text-slate-400 text-sm font-medium">/ {item.maxPoints} pts</span>
        </div>
      </div>

      <div className="relative pt-2 pb-6">
        <input
          type="range"
          min="0"
          max={item.maxPoints}
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer ${getSliderColor()}`}
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">
            <span>Insuffisant</span>
            <span>Moyen</span>
            <span>Excellent</span>
        </div>
      </div>

      <div className={`p-4 rounded-lg border text-sm transition-colors duration-300 ${getColorClass()}`}>
        <span className="font-bold mr-2 uppercase text-xs tracking-wide opacity-80">
          {level === 'low' ? 'Niveau Insuffisant' : level === 'mid' ? 'Niveau Moyen' : 'Niveau Excellent'} :
        </span>
        {getDescription()}
      </div>
    </div>
  );
};