
import React, { useState, useEffect } from 'react';
import { Pet, Screen } from '../types';
import { getPetInsight } from '../services/geminiService';

interface DashboardProps {
  activePet: Pet;
  pets: Pet[];
  setActivePet: (pet: Pet) => void;
  navigate: (screen: Screen) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activePet, pets, setActivePet, navigate }) => {
  const [insight, setInsight] = useState<string>("Analisando as atividades do seu pet...");
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const activitySummary = `${activePet.name} caminhou ${activePet.walks.current} min de uma meta de ${activePet.walks.goal}, e bebeu ${activePet.hydration.current}ml de água.`;
      const aiResponse = await getPetInsight(activePet.name, activitySummary);
      setInsight(aiResponse);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, [activePet.id]);

  return (
    <div className="flex flex-col h-full pb-24 animate-in fade-in duration-500">
      <header className="flex items-center justify-between p-6 pb-2">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-12 ring-2 ring-white dark:ring-card-dark shadow-sm"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150')` }}
            />
            <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-white dark:border-card-dark" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold leading-tight tracking-tight text-text-main dark:text-white">
              Olá, Jéssica! 🐾
            </h2>
            <p className="text-xs font-medium text-text-muted dark:text-gray-400">Bom dia</p>
          </div>
        </div>
        <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-card-dark shadow-sm text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2.5 size-2 bg-accent-orange rounded-full" />
        </button>
      </header>

      <section className="w-full overflow-x-auto px-6 py-4 no-scrollbar">
        <div className="flex items-start gap-5 min-w-min">
          {pets.map(pet => (
            <div 
              key={pet.id} 
              onClick={() => setActivePet(pet)}
              className={`group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${activePet.id === pet.id ? 'opacity-100 scale-105' : 'opacity-60 scale-95'}`}
            >
              <div className={`relative p-1 rounded-full border-2 ${activePet.id === pet.id ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent'}`}>
                <div 
                  className="size-16 bg-center bg-no-repeat bg-cover rounded-full"
                  style={{ backgroundImage: `url('${pet.avatar}')` }}
                />
              </div>
              <p className={`text-sm ${activePet.id === pet.id ? 'font-black' : 'font-medium'} text-text-main dark:text-white`}>{pet.name}</p>
            </div>
          ))}
          <div onClick={() => navigate('ONBOARDING')} className="group flex flex-col items-center gap-2 cursor-pointer">
            <div className="relative p-1 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="size-16 rounded-full bg-gray-100 dark:bg-card-dark flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined !text-3xl">add</span>
              </div>
            </div>
            <p className="text-sm font-medium text-text-main dark:text-gray-400">Novo</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-2">
        <div className="flex flex-col gap-4 rounded-3xl bg-white dark:bg-card-dark p-5 shadow-sm border border-gray-100 dark:border-none relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 size-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-3">
                <div className="size-11 rounded-full bg-accent-orange-light dark:bg-accent-orange/20 text-accent-orange flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">assignment_ind</span>
                </div>
                <div>
                  <h3 className="font-bold text-text-main dark:text-white text-base">Complete o Perfil de {activePet.name}</h3>
                  <p className="text-sm text-text-muted dark:text-gray-400 mt-0.5">Faltam 2 etapas</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-extrabold text-primary">50%</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-4">
              <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
              <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
              <div className="h-1.5 flex-1 bg-gray-200 dark:bg-gray-600 relative overflow-hidden rounded-full">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-primary/40"></div>
              </div>
              <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-text-muted dark:text-gray-400">Próximo: <span className="text-text-main dark:text-white">Histórico de Vacinas</span></p>
              <button onClick={() => navigate('HEALTH')} className="flex items-center justify-center rounded-xl py-2 px-4 bg-text-main dark:bg-white text-white dark:text-text-main text-xs font-black transition-transform active:scale-95 shadow-lg shadow-gray-200 dark:shadow-none">
                Continuar
                <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-4">
        <h3 className="text-text-main dark:text-white text-lg font-bold mb-3">Ações Rápidas</h3>
        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => navigate('ADD_RECORD')} className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95">
            <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
              <span className="material-symbols-outlined">directions_run</span>
            </div>
            <span className="text-[10px] font-black uppercase text-text-main dark:text-gray-300">Passeio</span>
          </button>
          <button onClick={() => navigate('ADD_RECORD')} className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95">
            <div className="size-10 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <span className="text-[10px] font-black uppercase text-text-main dark:text-gray-300">Refeição</span>
          </button>
          <button onClick={() => navigate('FIRST_AID')} className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95">
            <div className="size-10 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center">
              <span className="material-symbols-outlined">pets</span>
            </div>
            <span className="text-[10px] font-black uppercase text-text-main dark:text-gray-300">Emergência</span>
          </button>
        </div>
      </section>

      <section className="px-6 py-2 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-text-main dark:text-white text-xl font-bold">Métricas de Saúde</h2>
          <button onClick={() => navigate('INSIGHTS')} className="text-primary hover:text-primary-dark text-sm font-bold">Ver Detalhes</button>
        </div>
        <div className="bg-white dark:bg-card-dark rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-none flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
            <div>
              <p className="text-sm text-text-muted dark:text-gray-400 font-medium">Pontuação de Bem-estar</p>
              <p className="text-2xl font-black text-text-main dark:text-white mt-1">
                {activePet.wellnessScore}
                <span className="text-sm align-top text-gray-400 font-medium">%</span>
              </p>
            </div>
            <div className="size-12 rounded-full bg-green-50 dark:bg-green-900/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">trending_up</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-400 text-lg">water_drop</span>
                <span className="text-sm font-bold text-text-main dark:text-gray-200">Hidratação</span>
              </div>
              <span className="text-xs font-medium text-text-muted dark:text-gray-400">
                {activePet.hydration.current}ml / {activePet.hydration.goal}ml
              </span>
            </div>
            <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-400 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min(100, (activePet.hydration.current / activePet.hydration.goal) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">sprint</span>
                <span className="text-sm font-bold text-text-main dark:text-gray-200">Caminhadas</span>
              </div>
              <span className="text-xs font-medium text-text-muted dark:text-gray-400">
                {activePet.walks.current}m / {activePet.walks.goal}m
              </span>
            </div>
            <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min(100, (activePet.walks.current / (activePet.walks.goal || 1)) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-2 bg-gradient-to-br from-primary/10 to-transparent p-4 rounded-2xl flex gap-3 items-start border border-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform">
              <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
            </div>
            <span className={`material-symbols-outlined text-primary shrink-0 mt-0.5 ${loadingInsight ? 'animate-spin' : ''}`}>
              {loadingInsight ? 'progress_activity' : 'lightbulb'}
            </span>
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">IA Smart Insight</p>
              <p className="text-sm text-text-main dark:text-gray-300 leading-relaxed font-medium">
                {insight}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
