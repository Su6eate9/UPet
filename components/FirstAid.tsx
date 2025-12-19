
import React, { useState } from 'react';
import { Screen } from '../types';

interface Scenario {
  id: string;
  name: string;
  icon: string;
  color: string;
  time: string;
  steps: string[];
  warning: string;
}

interface FirstAidProps {
  navigate: (screen: Screen) => void;
}

const FirstAid: React.FC<FirstAidProps> = ({ navigate }) => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const scenarios: Scenario[] = [
    { 
      id: 'cpr', 
      name: 'RCP (Reanimação)', 
      icon: 'monitor_heart', 
      color: 'red', 
      time: '2 min',
      steps: [
        'Verifique se o animal está respirando e se há batimentos cardíacos.',
        'Deite o pet de lado (lado direito para cima).',
        'Comprima o tórax (atrás do cotovelo) 100-120 vezes por minuto.',
        'Faça 2 sopros curtos no nariz a cada 30 compressões.',
        'Continue até chegar ao veterinário.'
      ],
      warning: 'Não realize RCP se o coração ainda estiver batendo.'
    },
    { 
      id: 'choking', 
      name: 'Engasgo', 
      icon: 'sick', 
      color: 'orange', 
      time: '1 min',
      steps: [
        'Abra a boca e veja se há algum objeto visível que possa ser removido com segurança.',
        'Se não conseguir remover, levante as patas traseiras (cão pequeno) ou use a manobra de Heimlich.',
        'Aplique pressão firme logo abaixo das costelas, empurrando para cima.',
        'Verifique a boca novamente após cada tentativa.'
      ],
      warning: 'Cuidado para não ser mordido por reflexo do animal.'
    },
    { 
      id: 'poison', 
      name: 'Envenenamento', 
      icon: 'science', 
      color: 'purple', 
      time: '3 min',
      steps: [
        'Identifique o que foi ingerido e guarde a embalagem.',
        'Não induza o vômito a menos que instruído explicitamente por um profissional.',
        'Lave a boca com água corrente se o veneno for corrosivo.',
        'Leve o pet imediatamente ao hospital veterinário.'
      ],
      warning: 'Leite ou azeite NÃO anulam venenos.'
    },
    { 
      id: 'heat', 
      name: 'Intermação (Calor)', 
      icon: 'thermostat', 
      color: 'yellow', 
      time: '2 min',
      steps: [
        'Mova o pet para um local fresco e ventilado imediatamente.',
        'Coloque toalhas molhadas com água fresca (não gelada) no pescoço e axilas.',
        'Ofereça água fresca, mas não force a ingestão.',
        'Use um ventilador para ajudar a baixar a temperatura.'
      ],
      warning: 'Nunca use água gelada ou gelo, pois pode causar choque térmico.'
    },
    { 
      id: 'bleed', 
      name: 'Sangramento', 
      icon: 'healing', 
      color: 'pink', 
      time: '2 min',
      steps: [
        'Aplique pressão direta sobre a ferida com um pano limpo ou gaze.',
        'Se o sangue atravessar o pano, coloque outro por cima sem remover o primeiro.',
        'Se for em um membro, tente mantê-lo elevado.',
        'Mantenha a pressão constante até o atendimento.'
      ],
      warning: 'Não use torniquetes a menos que seja um sangramento arterial severo.'
    },
    { 
      id: 'seizure', 
      name: 'Convulsões', 
      icon: 'bolt', 
      color: 'blue', 
      time: '4 min',
      steps: [
        'Afaste móveis ou objetos próximos para evitar que o pet se machuque.',
        'Não coloque as mãos na boca do animal nem tente segurar a língua.',
        'Cronometre o tempo da convulsão.',
        'Mantenha o ambiente escuro e silencioso após o término.'
      ],
      warning: 'A maioria das convulsões dura menos de 2 minutos.'
    },
  ];

  return (
    <div className="flex flex-col min-h-full pb-32 animate-in fade-in duration-300">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-6 md:px-10 pb-2 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate('HOME')} className="size-11 flex items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <h2 className="text-xl font-black flex-1 text-center pr-11 dark:text-white tracking-tight">Emergência e Socorro</h2>
      </header>

      <div className="p-6 md:px-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <a href="tel:193" className="w-full h-16 rounded-3xl bg-red-600 active:bg-red-700 text-white font-black text-xl flex items-center justify-center gap-4 shadow-xl shadow-red-600/30 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined text-3xl animate-pulse">emergency</span>
            Ligar para Emergência
          </a>
          
          <button 
            onClick={() => navigate('CLINICS')}
            className="w-full h-14 rounded-3xl bg-white dark:bg-card-dark text-primary border-2 border-primary/20 font-black text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-2xl">local_hospital</span>
            Encontrar Clínicas 24h Próximas
          </button>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 h-16 flex items-center px-6 gap-4 focus-within:border-primary focus-within:ring-4 ring-primary/10 transition-all">
          <span className="material-symbols-outlined text-gray-400 text-2xl">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-base w-full dark:text-white font-medium" placeholder="Buscar sintomas ou guias..." />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-2">
          {scenarios.map((s) => (
            <button 
              key={s.id} 
              onClick={() => setSelectedScenario(s)}
              className="bg-white dark:bg-card-dark p-6 md:p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-5 group active:scale-95 hover:border-primary transition-all"
            >
              <div className={`size-16 md:size-20 rounded-3xl bg-${s.color}-50 dark:bg-${s.color}-900/20 text-${s.color}-600 dark:text-${s.color}-400 flex items-center justify-center`}>
                <span className="material-symbols-outlined text-4xl md:text-5xl">{s.icon}</span>
              </div>
              <div>
                <p className="text-lg font-black dark:text-white leading-tight mb-2">{s.name}</p>
                <div className="flex items-center justify-center gap-1.5 text-text-muted">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span className="text-[11px] font-black uppercase tracking-widest">{s.time}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedScenario && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-300">
          <div className="w-full max-w-2xl md:max-w-3xl bg-white dark:bg-background-dark rounded-t-[40px] md:rounded-b-[40px] md:mb-10 h-dvh md:h-auto md:max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl animate-in slide-in-from-bottom duration-500 flex flex-col">
            <div className="sticky top-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md p-6 md:px-10 flex items-center justify-between border-b border-gray-50 dark:border-gray-800 z-10 shrink-0">
              <div className="flex items-center gap-4">
                <div className={`size-12 md:size-14 rounded-2xl bg-${selectedScenario.color}-50 dark:bg-${selectedScenario.color}-900/20 text-${selectedScenario.color}-600 flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-3xl">{selectedScenario.icon}</span>
                </div>
                <h3 className="text-2xl font-black dark:text-white">{selectedScenario.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedScenario(null)}
                className="size-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>

            <div className="p-8 md:p-12 space-y-10 flex-1">
              <div className="bg-red-50 dark:bg-red-900/10 p-6 md:p-8 rounded-[32px] border border-red-100 dark:border-red-900/20 flex gap-6">
                <span className="material-symbols-outlined text-red-500 text-4xl shrink-0">warning</span>
                <div>
                  <p className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-2">Aviso Crítico</p>
                  <p className="text-lg font-bold text-red-700 dark:text-red-300 leading-relaxed italic">
                    "{selectedScenario.warning}"
                  </p>
                </div>
              </div>

              <div className="space-y-6 md:grid md:grid-cols-1 md:gap-x-10 pb-10">
                <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.25em] mb-2 md:col-span-full pl-1">Protocolo de Socorro Passo a Passo</h4>
                {selectedScenario.steps.map((step, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="size-9 rounded-full bg-primary text-white text-base font-black flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-primary/20">
                      {index + 1}
                    </div>
                    <p className="text-lg font-bold dark:text-gray-200 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:px-12 bg-gradient-to-t from-white dark:from-background-dark via-white dark:via-background-dark pt-10 sticky bottom-0 border-t border-gray-50 dark:border-gray-800 shrink-0">
              <button 
                onClick={() => {
                  setSelectedScenario(null);
                  navigate('CLINICS');
                }}
                className="w-full h-16 rounded-full bg-text-main dark:bg-white text-white dark:text-text-main font-black text-xl flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] transition-all mb-safe"
              >
                <span className="material-symbols-outlined text-3xl">map</span>
                Buscar Clínica Próxima no Mapa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstAid;
