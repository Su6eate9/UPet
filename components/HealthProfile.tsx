
import React from 'react';
import { Pet, Screen } from '../types';

interface HealthProfileProps {
  activePet: Pet;
  navigate: (screen: Screen) => void;
}

const HealthProfile: React.FC<HealthProfileProps> = ({ activePet, navigate }) => {
  return (
    <div className="flex flex-col h-full pb-32">
      <div className="sticky top-0 z-50 bg-background-light/90 dark:bg-card-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
        <button onClick={() => navigate('HOME')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        {/* Fix: Changed 'class' to 'className' to resolve React attribute error */}
        <h1 className="text-lg font-bold tracking-tight">Health Profile</h1>
        <button className="text-base font-bold text-primary">Edit</button>
      </div>

      <div className="flex flex-col items-center pt-8 pb-6 px-4">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-emerald-200 shadow-lg">
            <div 
              className="w-full h-full rounded-full bg-cover bg-center border-4 border-white dark:border-card-dark"
              style={{ backgroundImage: `url('${activePet.avatar}')` }}
            />
          </div>
          <div className="absolute bottom-0 right-1 bg-white dark:bg-card-dark p-1.5 rounded-full shadow-md border border-gray-100 dark:border-gray-700">
            <span className="material-symbols-outlined text-primary block" style={{ fontSize: '20px' }}>pets</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-1 dark:text-white">{activePet.name}</h2>
        <p className="text-text-muted text-sm font-medium mb-4">{activePet.breed}</p>
        
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-card-dark px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>cake</span>
            <span className="text-sm font-semibold dark:text-white">{activePet.age}</span>
          </div>
          <div className="bg-white dark:bg-card-dark px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>scale</span>
            <span className="text-sm font-semibold dark:text-white">{activePet.weight} kg</span>
          </div>
          <div className="bg-white dark:bg-card-dark px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>transgender</span>
            <span className="text-sm font-semibold dark:text-white">{activePet.gender}</span>
          </div>
        </div>
      </div>

      <div className="px-4 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>add_circle</span>
            </div>
            <span className="text-xs font-semibold dark:text-white">Log Visit</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>share</span>
            </div>
            <span className="text-xs font-semibold dark:text-white">Share</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>edit_document</span>
            </div>
            <span className="text-xs font-semibold dark:text-white">Records</span>
          </button>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold dark:text-white">Vaccinations</h3>
          <button className="text-sm font-semibold text-primary">See All</button>
        </div>
        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          {[
            { name: 'Rabies', due: 'Dec 2024', status: 'Active', color: 'primary' },
            { name: 'Distemper', due: 'Expires in 7 days', status: 'Renew', color: 'accent-orange' },
            { name: 'Bordetella', due: 'Jan 2025', status: 'Active', color: 'primary' }
          ].map((v, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 ${i < 2 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-${v.color}/10 flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-${v.color}`} style={{ fontSize: '20px' }}>{v.status === 'Renew' ? 'warning' : 'check_circle'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold truncate dark:text-white">{v.name}</p>
                <p className={`text-xs ${v.status === 'Renew' ? 'text-accent-orange' : 'text-text-muted'} truncate`}>{v.due}</p>
              </div>
              <div className={`shrink-0 px-2.5 py-1 bg-${v.color}/10 rounded text-[10px] font-bold text-${v.color} uppercase tracking-wide`}>
                {v.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mb-8">
        <h3 className="text-lg font-bold mb-3 dark:text-white">Medical History</h3>
        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
          <div className="relative pl-2">
            <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-gray-100 dark:bg-gray-700" />
            <div className="relative flex gap-4 mb-6">
              <div className="relative z-10 w-4 h-4 rounded-full bg-primary border-2 border-white dark:border-card-dark mt-1 shrink-0" />
              <div className="flex-1">
                <span className="text-xs font-semibold text-text-muted block mb-0.5">Oct 12, 2024</span>
                <h4 className="text-sm font-bold dark:text-white">Annual Wellness Checkup</h4>
                <p className="text-xs text-text-muted mt-1">Dr. Smith • Healthy weight, teeth clean.</p>
              </div>
            </div>
            <div className="relative flex gap-4">
              <div className="relative z-10 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-card-dark mt-1 shrink-0" />
              <div className="flex-1">
                <span className="text-xs font-semibold text-text-muted block mb-0.5">Sept 05, 2024</span>
                <h4 className="text-sm font-bold dark:text-white">Skin Allergy Treatment</h4>
                <p className="text-xs text-text-muted mt-1">Prescribed Apoquel 5mg.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthProfile;
