
import React, { useState, useEffect } from 'react';
import { Pet, Screen } from '../types';
import { getPetInsight } from '../services/geminiService';

interface DashboardProps {
  activePet: Pet;
  pets: Pet[];
  setActivePet: (pet: Pet) => void;
  navigate: (screen: Screen) => void;
  hasNewNotifications?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ activePet, pets, setActivePet, navigate, hasNewNotifications }) => {
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
    <div className="flex flex-col min-h-full pb-24 animate-in fade-in duration-500">
      <header className="flex items-center justify-between p-6 md:px-10 pb-2">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-12 md:size-14 ring-2 ring-white dark:ring-card-dark shadow-sm"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150')` }}
            />
            <div className="absolute bottom-0 right-0 size-3 md:size-4 bg-primary rounded-full border-2 border-white dark:border-card-dark" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-extrabold leading-tight tracking-tight text-text-main dark:text-white">
              Olá, Jéssica! 🐾
            </h2>
            <p className="text-xs md:text-sm font-medium text-text-muted dark:text-gray-400">Bom dia</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('NOTIFICATION_CENTER')}
          className="flex items-center justify-center size-10 md:size-12 rounded-full bg-white dark:bg-card-dark shadow-sm text-text-main dark:text-white active:bg-gray-100 transition-colors relative"
        >
          <span className="material-symbols-outlined md:text-3xl">notifications</span>
          {hasNewNotifications && (
            <span className="absolute top-2 right-2.5 size-2.5 bg-accent-orange rounded-full border-2 border-white dark:border-card-dark animate-pulse" />
          )}
        </button>
      </header>

      <section className="w-full overflow-x-auto px-6 md:px-10 py-4 no-scrollbar snap-x snap-mandatory">
        <div className="flex items-start gap-5 min-w-max pr-6">
          {pets.map(pet => (
            <div 
              key={pet.id} 
              onClick={() => setActivePet(pet)}
              className={`group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 snap-center ${activePet.id === pet.id ? 'opacity-100 scale-105' : 'opacity-60 scale-95'}`}
            >
              <div className={`relative p-1 rounded-full border-2 ${activePet.id === pet.id ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent'}`}>
                <div 
                  className="size-16 md:size-20 bg-center bg-no-repeat bg-cover rounded-full"
                  style={{ backgroundImage: `url('${pet.avatar}')` }}
                />
              </div>
              <p className={`text-[11px] md:text-xs ${activePet.id === pet.id ? 'font-black text-primary' : 'font-medium text-text-main dark:text-white'} text-center`}>{pet.name}</p>
            </div>
          ))}
          <div onClick={() => navigate('ONBOARDING')} className="group flex flex-col items-center gap-2 cursor-pointer snap-center">
            <div className="relative p-1 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="size-16 md:size-20 rounded-full bg-gray-100 dark:bg-card-dark flex items-center justify-center text-gray-400 dark:text-gray-500 active:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined !text-3xl">add</span>
              </div>
            </div>
            <p className="text-[11px] font-medium text-text-main dark:text-gray-400">Novo</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-6 md:px-10 py-2">
        <section className="md:h-full">
          <div className="flex flex-col gap-4 rounded-[32px] bg-white dark:bg-card-dark p-6 shadow-sm border border-gray-100 dark:border-none relative overflow-hidden group h-full">
            <div className="absolute -right-10 -top-10 size-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-all"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-3">
                    <div className="size-11 rounded-2xl bg-accent-orange-light dark:bg-accent-orange/20 text-accent-orange flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">assignment_ind</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-text-main dark:text-white text-base md:text-lg leading-tight">Perfil de {activePet.name}</h3>
                      <p className="text-xs text-text-muted dark:text-gray-400 mt-1">Faltam 2 etapas importantes</p>
                    </div>
                  </div>
                  <span className="text-lg font-extrabold text-primary">50%</span>
                </div>
                <div className="flex items-center gap-1.5 mb-5">
                  <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-gray-200 dark:bg-gray-600 relative overflow-hidden rounded-full">
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-primary/40"></div>
                  </div>
                  <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 mt-4">
                <p className="text-[11px] md:text-sm font-semibold text-text-muted dark:text-gray-400">Próximo: <span className="text-text-main dark:text-white">Vacinas</span></p>
                <button onClick={() => navigate('HEALTH')} className="flex items-center justify-center rounded-xl py-2 px-6 bg-text-main dark:bg-white text-white dark:text-text-main text-xs md:text-sm font-black active:scale-95 shadow-lg transition-transform">
                  Continuar
                  <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="md:h-full">
          <div className="bg-white dark:bg-card-dark rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-none h-full flex flex-col justify-between">
            <h3 className="text-text-main dark:text-white text-base md:text-lg font-bold mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <button onClick={() => navigate('ADD_RECORD')} className="flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-background-dark/50 p-4 rounded-3xl shadow-sm active:scale-95 transition-all">
                <div className="size-11 md:size-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
                  <span className="material-symbols-outlined md:text-3xl">directions_run</span>
                </div>
                <span className="text-[10px] md:text-[11px] font-black uppercase text-text-main dark:text-gray-300">Passeio</span>
              </button>
              <button onClick={() => navigate('ADD_RECORD')} className="flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-background-dark/50 p-4 rounded-3xl shadow-sm active:scale-95 transition-all">
                <div className="size-11 md:size-14 rounded-2xl bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                  <span className="material-symbols-outlined md:text-3xl">restaurant</span>
                </div>
                <span className="text-[10px] md:text-[11px] font-black uppercase text-text-main dark:text-gray-300">Refeição</span>
              </button>
              <button onClick={() => navigate('FIRST_AID')} className="flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-background-dark/50 p-4 rounded-3xl shadow-sm active:scale-95 transition-all">
                <div className="size-11 md:size-14 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center">
                  <span className="material-symbols-outlined md:text-3xl">pets</span>
                </div>
                <span className="text-[10px] md:text-[11px] font-black uppercase text-text-main dark:text-gray-300">Socorro</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <section className="px-6 md:px-10 py-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-text-main dark:text-white text-xl md:text-2xl font-bold">Saúde e Bem-estar</h2>
          <button onClick={() => navigate('INSIGHTS')} className="text-primary active:opacity-70 text-sm md:text-base font-bold">Ver Tudo</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-card-dark rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-none flex flex-col md:col-span-1">
            <p className="text-xs text-text-muted dark:text-gray-400 font-bold uppercase tracking-widest">Score de Saúde</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-4xl md:text-5xl font-black text-text-main dark:text-white">
                {activePet.wellnessScore}
                <span className="text-base align-top text-gray-400 font-medium ml-0.5">%</span>
              </p>
              <div className="size-16 rounded-2xl bg-green-50 dark:bg-green-900/20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">trending_up</span>
              </div>
            </div>
            <p className="text-xs text-green-500 font-bold mt-4">+5% desde a última semana</p>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-none flex flex-col justify-center gap-7 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-blue-400 text-xl">water_drop</span>
                    <span className="text-sm font-black text-text-main dark:text-gray-200">Hidratação</span>
                  </div>
                  <span className="text-xs font-bold text-text-muted dark:text-gray-400">
                    {activePet.hydration.current}/{activePet.hydration.goal}ml
                  </span>
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-blue-400 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${Math.min(100, (activePet.hydration.current / activePet.hydration.goal) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-xl">sprint</span>
                    <span className="text-sm font-black text-text-main dark:text-gray-200">Exercício</span>
                  </div>
                  <span className="text-xs font-bold text-text-muted dark:text-gray-400">
                    {activePet.walks.current}/{activePet.walks.goal}m
                  </span>
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${Math.min(100, (activePet.walks.current / (activePet.walks.goal || 1)) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-transparent p-5 rounded-3xl flex gap-4 items-start border border-primary/10 relative overflow-hidden">
              <span className={`material-symbols-outlined text-primary shrink-0 mt-0.5 ${loadingInsight ? 'animate-spin' : ''}`}>
                {loadingInsight ? 'progress_activity' : 'auto_awesome'}
              </span>
              <div>
                <p className="text-[10px] md:text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-1.5">IA Smart Insight</p>
                <p className="text-sm md:text-base text-text-main dark:text-gray-300 leading-relaxed font-semibold">
                  {insight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
