
import React from 'react';
import { Screen } from '../types';
import Logo from './Logo';

interface SubscriptionProps {
  navigate: (screen: Screen) => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ navigate }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark animate-in slide-in-from-bottom duration-500">
      <header className="p-6 flex items-center justify-between">
        <button onClick={() => navigate('PROFILE')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">close</span>
        </button>
        <Logo size="sm" />
        <div className="w-10" />
      </header>

      <div className="p-6 flex-1 overflow-y-auto no-scrollbar space-y-6">
        <div className="bg-gradient-to-br from-amber-400 to-accent-orange p-8 rounded-[40px] text-white shadow-2xl shadow-accent-orange/30 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 size-48 bg-white/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center">
            <span className="material-symbols-outlined text-5xl mb-4">verified_user</span>
            <h3 className="text-3xl font-black mb-2">UPet Pro</h3>
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-6">Unlimited Care & Insights</p>
            <div className="text-4xl font-black mb-1">$9.99<span className="text-lg font-bold opacity-60">/mo</span></div>
          </div>
        </div>

        <div className="space-y-4 px-2">
          <h4 className="font-bold dark:text-white text-lg">Pro Features:</h4>
          {[
            { icon: 'auto_awesome', label: 'Advanced UPet AI Diagnostics' },
            { icon: 'group_add', label: 'Up to 10 Pets Profiles' },
            { icon: 'support_agent', label: '24/7 Priority UPet Vet Chat' },
            { icon: 'cloud_upload', label: 'Unlimited Medical Records Cloud' },
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">{feat.icon}</span>
              </div>
              <span className="text-sm font-bold dark:text-gray-300">{feat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <button className="w-full h-16 rounded-full bg-accent-orange text-white font-black text-lg shadow-xl shadow-accent-orange/20 active:scale-95 transition-all">
          Upgrade Now
        </button>
        <p className="text-center text-[10px] text-text-muted mt-4">Cancel anytime. UPet Terms apply.</p>
      </div>
    </div>
  );
};

export default Subscription;
