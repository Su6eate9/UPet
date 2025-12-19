
import React, { useState, useEffect } from 'react';
import { Screen, Pet, ActivityType, AppNotification } from './types';
import Dashboard from './components/Dashboard';
import HealthProfile from './components/HealthProfile';
import Clinics from './components/Clinics';
import FirstAid from './components/FirstAid';
import FoodSafety from './components/FoodSafety';
import AIInsights from './components/AIInsights';
import Onboarding from './components/Onboarding';
import Community from './components/Community';
import Profile from './components/Profile';
import AddRecord from './components/AddRecord';
import ChatAssistant from './components/ChatAssistant';
import Schedule from './components/Schedule';
import MyPets from './components/MyPets';
import Subscription from './components/Subscription';
import Notifications from './components/Notifications';
import NotificationCenter from './components/NotificationCenter';
import Settings from './components/Settings';
import BrandKit from './components/BrandKit';
import Logo from './components/Logo';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: '1', title: 'Meta Atingida! 🏆', description: 'Rex completou a meta de caminhada de hoje.', type: 'ACTIVITY', time: '5 min atrás', read: false },
  { id: '2', title: 'Alerta de Hidratação 💧', description: 'Luna não bebeu água nas últimas 4 horas.', type: 'HEALTH', time: '1 hora atrás', read: false },
  { id: '3', title: 'Novo Comentário ❤️', description: 'Sarah M. comentou na foto do Buster.', type: 'SOCIAL', time: '2 horas atrás', read: true },
  { id: '4', title: 'Vacinação Próxima 💉', description: 'Reforço de Raiva vence em 7 dias.', type: 'HEALTH', time: '1 dia atrás', read: true },
];

const INITIAL_PETS: Pet[] = [
  {
    id: '1',
    name: 'Rex',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '4 yrs',
    weight: 28,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200',
    wellnessScore: 85,
    hydration: { current: 750, goal: 1000 },
    walks: { current: 45, goal: 60 }
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Siamese',
    age: '2 yrs',
    weight: 4.5,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=200',
    wellnessScore: 92,
    hydration: { current: 200, goal: 300 },
    walks: { current: 0, goal: 0 }
  }
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [activePetId, setActivePetId] = useState<string>(INITIAL_PETS[0].id);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [needsApiKey, setNeedsApiKey] = useState(false);

  const activePet = pets.find(p => p.id === activePetId) || pets[0];

  useEffect(() => {
    const checkKey = async () => {
      // Verifica se existe chave no ambiente ou se o usuário já selecionou uma
      const hasKey = process.env.API_KEY && process.env.API_KEY !== "";
      if (!hasKey) {
        const aistudio = (window as any).aistudio;
        if (aistudio && typeof aistudio.hasSelectedApiKey === 'function') {
          const selected = await aistudio.hasSelectedApiKey();
          if (!selected) setNeedsApiKey(true);
        }
      }
    };
    checkKey();

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleConnectKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio && typeof aistudio.openSelectKey === 'function') {
      await aistudio.openSelectKey();
      setNeedsApiKey(false); // Prossegue imediatamente conforme as diretrizes
    }
  };

  const handleAddPet = (newPetData: any) => {
    const newPet: Pet = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPetData.name,
      species: newPetData.species,
      breed: newPetData.breed || 'Mixed Breed',
      age: '0 yrs',
      weight: newPetData.weight,
      gender: 'Male',
      avatar: `https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200`,
      wellnessScore: 100,
      hydration: { current: 0, goal: 500 },
      walks: { current: 0, goal: 30 }
    };
    setPets([...pets, newPet]);
    setActivePetId(newPet.id);
    setCurrentScreen('HOME');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDeletePet = (id: string) => {
    const filtered = pets.filter(p => p.id !== id);
    if (filtered.length === 0) {
      setPets(INITIAL_PETS);
      setActivePetId(INITIAL_PETS[0].id);
    } else {
      setPets(filtered);
      if (activePetId === id) setActivePetId(filtered[0].id);
    }
  };

  const updatePet = (updatedPet: Pet) => {
    setPets(prev => prev.map(p => p.id === updatedPet.id ? updatedPet : p));
  };

  const updatePetActivity = (type: ActivityType, amount: number) => {
    setPets(prevPets => prevPets.map(p => {
      if (p.id === activePetId) {
        if (type === 'WATER') {
          return { ...p, hydration: { ...p.hydration, current: p.hydration.current + amount } };
        }
        if (type === 'WALK') {
          return { ...p, walks: { ...p.walks, current: p.walks.current + amount } };
        }
      }
      return p;
    }));
  };

  if (needsApiKey) {
    return (
      <div className="w-full h-dvh flex flex-col items-center justify-center p-8 bg-background-light dark:bg-background-dark text-center animate-in fade-in duration-500">
        <Logo size="lg" className="mb-12" />
        <div className="bg-white dark:bg-card-dark p-10 rounded-[48px] shadow-2xl border border-gray-100 dark:border-gray-800 max-w-sm w-full">
          <div className="size-24 rounded-[32px] bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-6xl">smart_toy</span>
          </div>
          <h1 className="text-3xl font-black mb-4 dark:text-white tracking-tight">UPet Talk AI</h1>
          <p className="text-sm text-text-muted dark:text-gray-400 mb-10 leading-relaxed font-medium">
            Para ativar as funções inteligentes de diagnóstico e chat veterinário, conecte sua chave do Google Gemini.
          </p>
          <button 
            onClick={handleConnectKey}
            className="w-full h-16 rounded-full bg-primary text-white font-black text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">api</span>
            Ativar IA Grátis
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-8 text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
          >
            Sobre faturamento do Google
          </a>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME': return <Dashboard activePet={activePet} pets={pets} setActivePet={(p) => setActivePetId(p.id)} navigate={setCurrentScreen} hasNewNotifications={notifications.some(n => !n.read)} />;
      case 'HEALTH': return <HealthProfile activePet={activePet} navigate={setCurrentScreen} onUpdatePet={updatePet} />;
      case 'INSIGHTS': return <AIInsights navigate={setCurrentScreen} />;
      case 'CLINICS': return <Clinics navigate={setCurrentScreen} />;
      case 'FIRST_AID': return <FirstAid navigate={setCurrentScreen} />;
      case 'FOOD_SAFETY': return <FoodSafety navigate={setCurrentScreen} />;
      case 'COMMUNITY': return <Community navigate={setCurrentScreen} />;
      case 'PROFILE': return <Profile navigate={setCurrentScreen} onToggleTheme={() => setIsDarkMode(!isDarkMode)} isDark={isDarkMode} />;
      case 'ADD_RECORD': return <AddRecord activePet={activePet} navigate={setCurrentScreen} onSave={updatePetActivity} />;
      case 'CHAT': return <ChatAssistant activePet={activePet} navigate={setCurrentScreen} />;
      case 'SCHEDULE': return <Schedule navigate={setCurrentScreen} />;
      case 'MY_PETS': return <MyPets pets={pets} navigate={setCurrentScreen} onDelete={handleDeletePet} />;
      case 'SUBSCRIPTION': return <Subscription navigate={setCurrentScreen} />;
      case 'NOTIFICATIONS': return <Notifications navigate={setCurrentScreen} />;
      case 'NOTIFICATION_CENTER': return <NotificationCenter navigate={setCurrentScreen} notifications={notifications} markAllAsRead={markAllAsRead} />;
      case 'SETTINGS': return <Settings navigate={setCurrentScreen} isDark={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />;
      case 'BRAND_KIT': return <BrandKit navigate={setCurrentScreen} />;
      case 'ONBOARDING': return <Onboarding onComplete={handleAddPet} onBack={() => setCurrentScreen('HOME')} />;
      default: return <Dashboard activePet={activePet} pets={pets} setActivePet={(p) => setActivePetId(p.id)} navigate={setCurrentScreen} hasNewNotifications={notifications.some(n => !n.read)} />;
    }
  };

  const showNav = !['ONBOARDING', 'ADD_RECORD', 'CHAT', 'SUBSCRIPTION', 'MY_PETS', 'NOTIFICATIONS', 'NOTIFICATION_CENTER', 'SETTINGS', 'BRAND_KIT'].includes(currentScreen);

  return (
    <div className="w-full h-dvh max-w-md md:max-w-4xl mx-auto bg-background-light dark:bg-background-dark relative md:shadow-2xl flex flex-col overflow-hidden transition-all duration-300">
      <div className="pt-safe bg-background-light dark:bg-background-dark shrink-0" />
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        {renderScreen()}
      </main>
      {showNav && (
        <nav className="shrink-0 bg-white/95 dark:bg-card-dark/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 px-4 md:px-12 flex items-start justify-between z-50 rounded-t-[32px] shadow-[0_-8px_20px_rgba(0,0,0,0.05)] transition-colors h-[88px] pb-safe pt-2">
          <button onClick={() => setCurrentScreen('HOME')} className={`flex flex-col items-center gap-1 w-16 transition-all ${currentScreen === 'HOME' ? 'text-primary' : 'text-gray-400'}`}>
            <span className={`material-symbols-outlined text-[28px] ${currentScreen === 'HOME' ? 'fill-current' : ''}`}>home</span>
            <span className="text-[10px] font-bold">Início</span>
          </button>
          <button onClick={() => setCurrentScreen('SCHEDULE')} className={`flex flex-col items-center gap-1 w-16 transition-all ${currentScreen === 'SCHEDULE' ? 'text-primary' : 'text-gray-400'}`}>
            <span className={`material-symbols-outlined text-[28px] ${currentScreen === 'SCHEDULE' ? 'fill-current' : ''}`}>calendar_today</span>
            <span className="text-[10px] font-bold">Agenda</span>
          </button>
          <div className="relative -top-7">
            <button onClick={() => setCurrentScreen('ADD_RECORD')} className="size-16 md:size-20 rounded-full bg-primary text-white shadow-xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 border-4 border-white dark:border-background-dark transition-all">
              <span className="material-symbols-outlined text-4xl">add</span>
            </button>
          </div>
          <button onClick={() => setCurrentScreen('COMMUNITY')} className={`flex flex-col items-center gap-1 w-16 transition-all ${currentScreen === 'COMMUNITY' ? 'text-primary' : 'text-gray-400'}`}>
            <span className={`material-symbols-outlined text-[28px] ${currentScreen === 'COMMUNITY' ? 'fill-current' : ''}`}>groups</span>
            <span className="text-[10px] font-bold">Social</span>
          </button>
          <button onClick={() => setCurrentScreen('PROFILE')} className={`flex flex-col items-center gap-1 w-16 transition-all ${currentScreen === 'PROFILE' ? 'text-primary' : 'text-gray-400'}`}>
            <span className={`material-symbols-outlined text-[28px] ${currentScreen === 'PROFILE' ? 'fill-current' : ''}`}>person</span>
            <span className="text-[10px] font-bold">Perfil</span>
          </button>
        </nav>
      )}
      {currentScreen === 'HOME' && (
        <button 
          onClick={() => setCurrentScreen('CHAT')}
          className="fixed bottom-28 md:bottom-32 right-6 md:right-12 size-14 md:size-16 rounded-full bg-text-main dark:bg-white text-white dark:text-text-main shadow-2xl flex items-center justify-center z-40 animate-bounce active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
        </button>
      )}
    </div>
  );
};

export default App;
