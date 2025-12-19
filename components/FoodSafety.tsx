
import React, { useState } from 'react';
import { Screen } from '../types';
import { checkFoodSafety } from '../services/geminiService';

interface FoodSafetyProps {
  navigate: (screen: Screen) => void;
}

const FoodSafety: React.FC<FoodSafetyProps> = ({ navigate }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{safe: boolean, explanation: string, warning: string | null} | null>(null);

  const foods = [
    { name: 'Apple', desc: 'Remove seeds & core', status: 'SAFE', color: 'primary' },
    { name: 'Banana', desc: 'High in potassium', status: 'SAFE', color: 'primary' },
    { name: 'Chocolate', desc: 'Contains Theobromine', status: 'TOXIC', color: 'accent-orange' },
    { name: 'Grapes', desc: 'Causes kidney failure', status: 'TOXIC', color: 'accent-orange' },
  ];

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await checkFoodSafety(search);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full pb-32">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-card-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate('HOME')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold dark:text-white">Food Safety Guide</h1>
        <button onClick={() => navigate('FIRST_AID')} className="h-9 px-3 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 font-bold text-xs uppercase tracking-wide">Emergency</button>
      </header>

      <div className="p-4 flex flex-col gap-6">
        <div className="flex gap-2">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-12 flex items-center px-4 gap-2 flex-1 border border-transparent focus-within:border-primary transition-all">
            <span className="material-symbols-outlined text-primary">search</span>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-transparent border-none focus:ring-0 w-full text-sm dark:text-white" 
              placeholder="Check a food (e.g., Avocado)..." 
            />
          </div>
          <button 
            onClick={handleSearch}
            className="size-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-transform"
          >
            {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">check</span>}
          </button>
        </div>

        {result && (
          <div className={`p-6 rounded-3xl border-2 animate-in fade-in slide-in-from-top-4 duration-300 ${result.safe ? 'bg-primary/5 border-primary/20' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`size-12 rounded-full flex items-center justify-center ${result.safe ? 'bg-primary text-white' : 'bg-red-500 text-white'}`}>
                <span className="material-symbols-outlined text-2xl">{result.safe ? 'sentiment_satisfied' : 'sentiment_very_dissatisfied'}</span>
              </div>
              <div>
                <h3 className="text-xl font-black dark:text-white">{search}</h3>
                <p className={`text-xs font-bold uppercase tracking-widest ${result.safe ? 'text-primary' : 'text-red-500'}`}>
                  {result.safe ? 'Generally Safe' : 'DANGEROUS / TOXIC'}
                </p>
              </div>
            </div>
            <p className="text-sm text-text-main dark:text-gray-300 leading-relaxed mb-4">
              {result.explanation}
            </p>
            {result.warning && (
              <div className="flex gap-2 p-3 bg-white dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="material-symbols-outlined text-accent-orange text-sm">warning</span>
                <p className="text-[10px] font-bold text-accent-orange uppercase">{result.warning}</p>
              </div>
            )}
          </div>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" /> Popular Items
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {foods.map((food, i) => (
              <div key={i} className="bg-white dark:bg-card-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-2">
                <div className={`size-11 rounded-full flex items-center justify-center ${food.status === 'SAFE' ? 'bg-primary/10 text-primary' : 'bg-accent-orange/10 text-accent-orange'}`}>
                  <span className="material-symbols-outlined text-2xl">{food.status === 'SAFE' ? 'nutrition' : 'warning'}</span>
                </div>
                <h3 className="font-bold dark:text-white">{food.name}</h3>
                <p className="text-[10px] text-text-muted leading-tight">{food.desc}</p>
                <div className="mt-2 pt-2 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${food.status === 'SAFE' ? 'text-primary bg-primary/10' : 'text-accent-orange bg-accent-orange/10'}`}>
                    {food.status}
                  </span>
                  <span className={`material-symbols-outlined text-sm ${food.status === 'SAFE' ? 'text-primary' : 'text-accent-orange'}`}>
                    {food.status === 'SAFE' ? 'check_circle' : 'error'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodSafety;
