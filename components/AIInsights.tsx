
import React from 'react';
import { Screen } from '../types';

interface AIInsightsProps {
  navigate: (screen: Screen) => void;
}

const AIInsights: React.FC<AIInsightsProps> = ({ navigate }) => {
  return (
    <div className="flex flex-col h-full pb-32">
      <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark backdrop-blur-md p-4 pb-2 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate('HOME')} className="size-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10 dark:text-white">AI Insights</h2>
      </div>

      <div className="flex-1 flex flex-col p-6 gap-6">
        <div className="flex justify-center w-full">
          <div className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-primary/15 dark:bg-primary/10 border border-primary/20 pl-3 pr-4 shadow-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
            <p className="text-slate-700 dark:text-slate-300 text-xs font-semibold">System Active: Monitoring 12 Health Metrics</p>
          </div>
        </div>

        <div>
          <h2 className="text-slate-900 dark:text-white tracking-tight text-2xl font-extrabold leading-tight">Automations Working for You</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">3 new updates based on recent activity</p>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-card-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <span className="material-symbols-outlined">notification_important</span>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">Smart Vaccination Reminder</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">Rabies booster due in 7 days</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/20 mb-4">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-red-700 dark:text-red-300">Urgency Level</span>
              <span className="text-red-700 dark:text-red-300">High</span>
            </div>
            <div className="h-2 w-full bg-red-200 dark:bg-red-800/40 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-[85%] rounded-full" />
            </div>
          </div>
          <button className="w-full h-11 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:brightness-105 transition-all">
            Find Clinics
          </button>
        </div>

        <div className="rounded-2xl bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-xl">monitor_weight</span>
                <p className="text-slate-900 dark:text-white text-base font-bold">Weight Monitoring</p>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Active pet is <span className="text-accent-orange font-bold">0.5kg</span> above breed average</p>
            </div>
            <div className="bg-accent-orange-light dark:bg-accent-orange/20 text-accent-orange px-2 py-1 rounded text-[10px] font-bold uppercase">
              Insight
            </div>
          </div>
          <div className="h-32 w-full relative mb-4">
            <svg className="w-full h-full" viewBox="0 0 300 120">
              <path d="M0,100 C50,100 80,50 150,45 S250,40 300,35" fill="none" stroke="#13ec5b" strokeWidth="3" strokeLinecap="round" />
              <circle cx="150" cy="45" r="4" fill="#13ec5b" stroke="white" strokeWidth="2" />
              <circle cx="300" cy="35" r="4" fill="#13ec5b" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <button className="w-full h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-white font-bold text-sm">
            Update Weight
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
