import React, { useMemo } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { RubricItem } from '../types';

interface ScoreSummaryProps {
  items: RubricItem[];
  scores: Record<string, number>;
}

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({ items, scores }) => {
  
  const totalScore = Object.values(scores).reduce((a: number, b: number) => a + b, 0);
  const maxTotal = items.reduce((a: number, b: RubricItem) => a + b.maxPoints, 0);

  const categoryData = useMemo(() => {
    const categories: string[] = Array.from(new Set(items.map(i => i.category)));
    
    return categories.map((cat: string) => {
      const catItems = items.filter(i => i.category === cat);
      const catScore = catItems.reduce((acc: number, item: RubricItem) => acc + (scores[item.id] || 0), 0);
      const catMax = catItems.reduce((acc: number, item: RubricItem) => acc + item.maxPoints, 0);
      
      // Clean up category name for display (remove numbering/percent)
      const display = cat.replace(/^\d+\.\s*/, '').replace(/\s*\(\d+%\)$/, '');
      
      return {
        category: display,
        fullCategory: cat,
        score: catScore,
        max: catMax,
        percentage: catMax > 0 ? (catScore / catMax) * 100 : 0
      };
    });
  }, [items, scores]);

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border-t-4 border-cyan-600">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        
        {/* Total Score Display */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-cyan-400 uppercase text-sm font-semibold tracking-wider mb-2">Note Globale</h2>
          <div className="flex items-baseline justify-center lg:justify-start gap-1">
             <span className="text-6xl font-black text-white">{totalScore}</span>
             <span className="text-2xl text-slate-500 font-medium">/ {maxTotal}</span>
          </div>
          
          <div className="mt-6 space-y-4">
            {categoryData.map((d) => (
              <div key={d.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300 font-medium">{d.fullCategory}</span>
                  <span className="font-mono text-white">{d.score}/{d.max}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-600 transition-all duration-500"
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="flex-1 h-64 w-full min-w-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={categoryData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Score"
                dataKey="percentage"
                stroke="#0891b2"
                strokeWidth={3}
                fill="#0e7490"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};