import React from 'react';
import { Screen } from '../types';
import Logo from './Logo';

interface SettingsProps {
  navigate: (screen: Screen) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ navigate, isDark, onToggleTheme }) => {
  const handleOpenKeySelector = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio && typeof aistudio.openSelectKey === 'function') {
      await aistudio.openSelectKey();
    } else {
      alert("Seletor de chave não disponível neste ambiente.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark animate-in slide-in-from-right duration-300">
      <header className="p-6 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate('PROFILE')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-black dark:text-white">Configurações</h2>
      </header>

      <div className="p-6 space-y-8 overflow-y-auto no-scrollbar">
        <div className="flex flex-col items-center py-4">
          <Logo size="lg" />
        </div>

        <section>
          <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4 px-2">Visual e Sistema</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-3xl bg-gray-50 dark:bg-card-dark">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">{isDark ? 'dark_mode' : 'light_mode'}</span>
                <span className="text-sm font-bold dark:text-white">Modo Escuro</span>
              </div>
              <button 
                onClick={onToggleTheme}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${isDark ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
              >
                <div className={`size-4 bg-white rounded-full transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            
            <button className="w-full flex items-center justify-between p-4 rounded-3xl bg-gray-50 dark:bg-card-dark">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">language</span>
                <span className="text-sm font-bold dark:text-white">Idioma</span>
              </div>
              <span className="text-xs font-bold text-text-muted">Português (BR)</span>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4 px-2">Inteligência Artificial</h3>
          <div className="space-y-3">
            <button 
              onClick={handleOpenKeySelector}
              className="w-full flex items-center justify-between p-4 rounded-3xl bg-primary/5 border border-primary/20 group hover:bg-primary/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">key</span>
                <div className="text-left">
                  <span className="block text-sm font-bold dark:text-white">Alterar Chave de API</span>
                  <span className="text-[10px] text-primary/60 font-black uppercase">Google AI Studio</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary">sync_alt</span>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4 px-2">Marca e Assets</h3>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('BRAND_KIT')}
              className="w-full flex items-center justify-between p-4 rounded-3xl bg-gray-50 dark:bg-card-dark group hover:border-primary/30 border border-transparent transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">image</span>
                <span className="text-sm font-bold dark:text-white text-left">Exportar Identidade Visual</span>
              </div>
              <span className="material-symbols-outlined text-primary">download</span>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4 px-2">Conta</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-3xl bg-gray-50 dark:bg-card-dark">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">lock</span>
                <span className="text-sm font-bold dark:text-white">Privacidade e Segurança</span>
              </div>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-3xl bg-gray-50 dark:bg-card-dark">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">description</span>
                <span className="text-sm font-bold dark:text-white">Exportar Dados</span>
              </div>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
          </div>
        </section>

        <div className="pt-4 px-2 text-center">
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">UPet v3.1.2 (Stable Deployment)</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
