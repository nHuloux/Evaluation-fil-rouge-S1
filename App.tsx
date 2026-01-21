import React, { useState, useEffect, useMemo } from 'react';
import { RAW_CSV_DATA } from './constants';
import { parseRubricCSV, generateResultCSV, downloadCSV } from './utils/csvHelper';
import { RubricItem } from './types';
import { RubricSlider } from './components/RubricSlider';
import { ScoreSummary } from './components/ScoreSummary';
import { MizaLogo } from './components/MizaLogo';
import { Download, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [rubricItems, setRubricItems] = useState<RubricItem[]>([]);
  const [groupName, setGroupName] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load rubric data on mount
  useEffect(() => {
    const items = parseRubricCSV(RAW_CSV_DATA);
    setRubricItems(items);
    
    // Initialize scores to 0
    const initialScores: Record<string, number> = {};
    items.forEach(item => initialScores[item.id] = 0);
    setScores(initialScores);
    setIsLoaded(true);
  }, []);

  const handleScoreChange = (id: string, val: number) => {
    setScores(prev => ({
      ...prev,
      [id]: val
    }));
  };

  const handleReset = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser la grille ?")) {
      const initialScores: Record<string, number> = {};
      rubricItems.forEach(item => initialScores[item.id] = 0);
      setScores(initialScores);
      setGroupName('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExport = () => {
    if (!groupName.trim()) {
      alert("Veuillez saisir un nom de groupe avant d'exporter.");
      return;
    }
    const csvContent = generateResultCSV(groupName, rubricItems, scores);
    const filename = `Evaluation_${groupName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.csv`;
    downloadCSV(csvContent, filename);
  };

  const categories = useMemo(() => {
    return Array.from(new Set(rubricItems.map(item => item.category)));
  }, [rubricItems]);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header / Nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
             {/* Logo MIZA constructed with SVG */}
             <MizaLogo />
             
             <div className="hidden md:block h-12 w-px bg-slate-200"></div>
             
             <h1 className="text-xl font-bold text-slate-800 tracking-tight uppercase hidden md:block">
               Notation fil rouge
             </h1>
          </div>

          <div className="w-full md:w-auto flex-1 max-w-md mx-4 flex gap-2">
            <input 
              type="text" 
              placeholder="Nom du Groupe / Étudiants"
              className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 outline-none transition-shadow placeholder:text-slate-400"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="hidden md:block">
            <button 
              onClick={handleReset}
              className="text-slate-500 hover:text-red-600 transition-colors p-2"
              title="Réinitialiser"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Top Summary Dashboard */}
        <section>
          <ScoreSummary items={rubricItems} scores={scores} />
        </section>

        {/* Evaluation Form */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category} className="animate-fade-in">
              <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-slate-200">
                <span className="bg-cyan-700 text-white font-bold px-3 py-1 rounded text-sm shadow-sm">
                   CATÉGORIE
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  {category}
                </h2>
              </div>
              
              <div className="space-y-6">
                {rubricItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <RubricSlider 
                      key={item.id} 
                      item={item} 
                      value={scores[item.id] || 0}
                      onChange={(val) => handleScoreChange(item.id, val)}
                    />
                  ))
                }
              </div>
            </section>
          ))}
        </div>

      </main>

      {/* Floating Bottom Bar for Mobile/Desktop Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg p-4 z-40">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
            <button 
              onClick={handleReset} 
              className="md:hidden text-slate-500 hover:text-red-600 font-medium text-sm flex items-center gap-2"
            >
              <RefreshCw size={18} /> Reset
            </button>

            <div className="text-sm text-slate-500 hidden sm:block">
              Total: <span className="font-bold text-slate-900 text-lg">
                {Object.values(scores).reduce((a: number, b: number) => a + b, 0)}
              </span> / {rubricItems.reduce((a: number, b: RubricItem) => a + b.maxPoints, 0)}
            </div>

            <button
              onClick={handleExport}
              className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-cyan-700/30 flex items-center gap-2 transition-all transform hover:-translate-y-1"
            >
              <Download size={20} />
              <span className="hidden sm:inline">Exporter CSV</span>
              <span className="sm:hidden">Exporter</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default App;