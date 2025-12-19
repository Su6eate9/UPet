
import React, { useState } from 'react';
import { Pet, Screen, ActivityType } from '../types';

interface AddRecordProps {
  activePet: Pet;
  navigate: (screen: Screen) => void;
  onSave: (type: ActivityType, amount: number) => void;
}

const AddRecord: React.FC<AddRecordProps> = ({ activePet, navigate, onSave }) => {
  const [type, setType] = useState<ActivityType>('WALK');
  const [value, setValue] = useState('20');
  const [isSaving, setIsSaving] = useState(false);

  const activities: { id: ActivityType, label: string, icon: string, unit: string, color: string }[] = [
    { id: 'WALK', label: 'Passeio', icon: 'directions_run', unit: 'min', color: 'blue' },
    { id: 'FOOD', label: 'Comida', icon: 'restaurant', unit: 'g', color: 'green' },
    { id: 'WATER', label: 'Água', icon: 'water_drop', unit: 'ml', color: 'cyan' },
    { id: 'MEDS', label: 'Remédio', icon: 'pill', unit: 'dose', color: 'purple' },
  ];

  const currentActivity = activities.find(a => a.id === type)!;

  const handleSave = () => {
    setIsSaving(true);
    onSave(type, parseInt(value));
    
    setTimeout(() => {
      setIsSaving(false);
      navigate('HOME');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark animate-in slide-in-from-bottom duration-500">
      <header className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate('HOME')} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-xl font-black dark:text-white tracking-tight">Atividade de {activePet.name}</h2>
        <div className="w-10" />
      </header>

      <div className="p-6 flex flex-col gap-8 flex-1">
        <div className="grid grid-cols-4 gap-3">
          {activities.map(a => (
            <button 
              key={a.id}
              onClick={() => setType(a.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${type === a.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-transparent bg-gray-50 dark:bg-card-dark'}`}
            >
              <div className={`size-12 rounded-full flex items-center justify-center transition-all ${type === a.id ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-white dark:bg-gray-800 text-gray-400'}`}>
                <span className="material-symbols-outlined text-2xl">{a.icon}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${type === a.id ? 'text-primary' : 'text-gray-400'}`}>{a.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center py-10 bg-gray-50 dark:bg-card-dark rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-inner">
          <p className="text-sm font-black text-text-muted dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Quantidade</p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setValue(Math.max(0, parseInt(value) - 5).toString())}
              className="size-14 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center active:scale-90 transition-transform dark:text-white hover:bg-white dark:hover:bg-gray-800"
            >
              <span className="material-symbols-outlined text-3xl">remove</span>
            </button>
            <div className="flex flex-col items-center">
              <input 
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-32 text-center bg-transparent border-none text-6xl font-black focus:ring-0 dark:text-white"
              />
              <span className="text-lg font-black text-primary uppercase">{currentActivity.unit}</span>
            </div>
            <button 
              onClick={() => setValue((parseInt(value) + 5).toString())}
              className="size-14 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center active:scale-90 transition-transform dark:text-white hover:bg-white dark:hover:bg-gray-800"
            >
              <span className="material-symbols-outlined text-3xl">add</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-black dark:text-gray-500 uppercase tracking-widest ml-1">Notas (Opcional)</label>
          <textarea 
            placeholder="Alguma observação importante..."
            className="w-full h-24 bg-gray-50 dark:bg-card-dark border-none rounded-3xl p-4 focus:ring-2 ring-primary/20 dark:text-white resize-none shadow-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-t from-white dark:from-background-dark via-white dark:via-background-dark to-transparent">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`w-full h-16 rounded-full bg-primary text-white font-black text-lg shadow-2xl shadow-primary/30 flex items-center justify-center transition-all ${isSaving ? 'scale-95 opacity-80' : 'hover:scale-105 active:scale-95'}`}
        >
          {isSaving ? (
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Salvando Atividade...
            </div>
          ) : 'Finalizar e Salvar'}
        </button>
      </div>
    </div>
  );
};

export default AddRecord;
