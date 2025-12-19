
import React, { useState } from 'react';
import { Screen } from '../types';

interface FirstAidProps {
  navigate: (screen: Screen) => void;
}

interface Scenario {
  id: string;
  name: string;
  icon: string;
  color: string;
  time: string;
  steps: string[];
  warning: string;
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
    <div className="flex flex-col h-full pb-32 animate-in fade-in duration-300">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md p-4 pb-2 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate('HOME')} className="size-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10 dark:text-white">Emergência e Socorro</h2>
      </header>

      <div className="p-4 flex flex-col gap-4">
        <a href="tel:193" className="w-full h-14 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 active:scale-95 transition-all">
          <span className="material-symbols-outlined animate-pulse">emergency</span>
          Ligar para Emergência
        </a>

        <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800 h-12 flex items-center px-4 gap-3">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm w-full dark:text-white" placeholder="Buscar sintomas ou guias..." />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          {scenarios.map((s) => (
            <button 
              key={s.id} 
              onClick={() => setSelectedScenario(s)}
              className="bg-white dark:bg-card-dark p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-start text-left gap-3 group active:scale-95 transition-all"
            >
              <div className={`size-14 rounded-full bg-${s.color}-50 dark:bg-${s.color}-900/20 text-${s.color}-600 dark:text-${s.color}-400 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{s.icon}</span>
              </div>
              <div>
                <p className="text-base font-black dark:text-white leading-tight mb-1">{s.name}</p>
                <div className="flex items-center gap-1 text-text-muted">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="text-[10px] font-bold uppercase">{s.time} de leitura</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detalhes do Guia */}
      {selectedScenario && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end animate-in fade-in duration-300">
          <div className="w-full max-w-md mx-auto bg-white dark:bg-background-dark rounded-t-[40px] max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="sticky top-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md p-6 flex items-center justify-between border-b border-gray-50 dark:border-gray-800 z-10">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-xl bg-${selectedScenario.color}-50 dark:bg-${selectedScenario.color}-900/20 text-${selectedScenario.color}-600 flex items-center justify-center`}>
                  <span className="material-symbols-outlined">{selectedScenario.icon}</span>
                </div>
                <h3 className="text-xl font-black dark:text-white">{selectedScenario.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedScenario(null)}
                className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/20 flex gap-3">
                <span className="material-symbols-outlined text-red-500">warning</span>
                <div>
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Aviso Crítico</p>
                  <p className="text-xs font-bold text-red-700 dark:text-red-300 leading-relaxed">
                    {selectedScenario.warning}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-4">Passo a Passo</h4>
                {selectedScenario.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="size-6 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm font-bold dark:text-gray-300 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => {
                    setSelectedScenario(null);
                    navigate('CLINICS');
                  }}
                  className="w-full h-16 rounded-full bg-text-main dark:bg-white text-white dark:text-text-main font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined">map</span>
                  Buscar Clínica Próxima
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstAid;
