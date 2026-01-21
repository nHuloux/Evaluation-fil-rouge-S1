import React from 'react';
import { RubricItem } from '../types';
import { X } from 'lucide-react';

interface RubricGuideProps {
  isOpen: boolean;
  onClose: () => void;
  items: RubricItem[];
}

export const RubricGuide: React.FC<RubricGuideProps> = ({ isOpen, onClose, items }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50 rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Guide de Notation</h2>
            <p className="text-slate-500 text-sm mt-1">Référentiel complet des critères d'évaluation</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 hover:text-red-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable Table */}
        <div className="overflow-auto flex-1 p-6">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 sticky top-0 shadow-sm z-10">
              <tr>
                <th className="p-3 font-bold text-slate-700 border-b-2 border-slate-300 w-1/6">Catégorie</th>
                <th className="p-3 font-bold text-slate-700 border-b-2 border-slate-300 w-1/6">Critère</th>
                <th className="p-3 font-bold text-red-700 border-b-2 border-red-200 bg-red-50/50 w-1/5">Insuffisant (0-33%)</th>
                <th className="p-3 font-bold text-yellow-700 border-b-2 border-yellow-200 bg-yellow-50/50 w-1/5">Moyen (34-66%)</th>
                <th className="p-3 font-bold text-green-700 border-b-2 border-green-200 bg-green-50/50 w-1/5">Excellent (67-100%)</th>
                <th className="p-3 font-bold text-slate-700 border-b-2 border-slate-300 text-center w-16">Max</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 text-slate-600 font-medium align-top">{item.category}</td>
                  <td className="p-3 text-slate-900 font-semibold align-top">
                    {item.criteria}
                    <div className="text-xs text-slate-500 font-normal mt-1">{item.description}</div>
                  </td>
                  <td className="p-3 text-slate-600 align-top bg-red-50/30 border-r border-slate-100">{item.levelLow}</td>
                  <td className="p-3 text-slate-600 align-top bg-yellow-50/30 border-r border-slate-100">{item.levelMid}</td>
                  <td className="p-3 text-slate-600 align-top bg-green-50/30">{item.levelHigh}</td>
                  <td className="p-3 text-slate-900 font-bold text-center align-top">{item.maxPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
          >
            Fermer le guide
          </button>
        </div>
      </div>
    </div>
  );
};