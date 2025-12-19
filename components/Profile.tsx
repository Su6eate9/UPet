
import React from 'react';
import { Screen } from '../types';

interface ProfileProps {
  navigate: (screen: Screen) => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

const Profile: React.FC<ProfileProps> = ({ navigate, onToggleTheme, isDark }) => {
  const menuItems: { icon: string, label: string, target: Screen }[] = [
    { icon: 'pets', label: 'Meus Pets', target: 'MY_PETS' },
    { icon: 'notifications_active', label: 'Notificações', target: 'NOTIFICATIONS' },
    { icon: 'verified_user', label: 'Assinatura Pro', target: 'SUBSCRIPTION' },
    { icon: 'help', label: 'Suporte e Ajuda', target: 'PROFILE' },
    { icon: 'settings', label: 'Configurações', target: 'SETTINGS' },
  ];

  const badges = [
    { icon: 'water_drop', label: 'Hidratador', color: 'blue', level: 'Mestre' },
    { icon: 'directions_run', label: 'Caminhante', color: 'green', level: 'Elite' },
    { icon: 'pill', label: 'Enfermeiro', color: 'purple', level: 'Novato' },
    { icon: 'star', label: 'Super Pet', color: 'orange', level: 'MVP' },
  ];

  return (
    <div className="flex flex-col h-full pb-32 animate-in fade-in duration-500">
      <header className="p-8 flex flex-col items-center gap-4 bg-white dark:bg-background-dark">
        <div className="relative">
          <div className="size-32 rounded-full p-1 bg-gradient-to-tr from-primary to-blue-400">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
              className="w-full h-full rounded-full object-cover border-4 border-white dark:border-background-dark shadow-xl" 
              alt="Profile" 
            />
          </div>
          <button className="absolute bottom-1 right-1 size-10 rounded-full bg-primary text-white border-4 border-white dark:border-background-dark flex items-center justify-center shadow-lg active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-xl">edit</span>
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black dark:text-white">Jéssica Pearson</h2>
          <p className="text-sm font-bold text-text-muted uppercase tracking-widest mt-1">Especialista em Cuidado Pet</p>
        </div>
      </header>

      <div className="px-6 space-y-6">
        <div className="bg-white dark:bg-card-dark rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-xs font-bold text-text-muted dark:text-gray-500 uppercase tracking-widest mb-4">Conquistas</h3>
          <div className="grid grid-cols-4 gap-4">
            {badges.map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-1 group">
                <div className={`size-12 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-500 group-hover:text-primary transition-colors shadow-inner`}>
                  <span className="material-symbols-outlined text-2xl">{b.icon}</span>
                </div>
                <span className="text-[8px] font-black uppercase text-gray-400">{b.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
          {menuItems.map((item, i) => (
            <button 
              key={i} 
              onClick={() => navigate(item.target)}
              className={`w-full p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${i < menuItems.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}
            >
              <div className="size-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-text-muted">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <span className="flex-1 text-left font-bold text-sm dark:text-white">{item.label}</span>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="w-full p-5 rounded-3xl border-2 border-red-50 dark:border-red-900/20 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          Sair da Conta
        </button>
      </div>
    </div>
  );
};

export default Profile;
