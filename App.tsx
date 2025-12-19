
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

  const activePet = pets.find(p => p.id === activePetId) || pets[0];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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

  const handleUpdatePet = (updatedPet: Pet) => {
    setPets(pets.map(p => p.id === updatedPet.id ? updatedPet : p));
  };

  const handleDeletePet = (id: string) => {
    const remaining = pets.filter(p => p.id !== id);
    if (remaining.length > 0) {
      setPets(remaining);
      setActivePetId(remaining[0].id);
    }
  };

  const handleSaveRecord = (type: ActivityType, amount: number) => {
    setPets(pets.map(p => {
      if (p.id === activePetId) {
        if (type === 'WATER') return { ...p, hydration: { ...p.hydration, current: p.hydration.current + amount } };
        if (type === 'WALK') return { ...p, walks: { ...p.walks, current: p.walks.current + amount } };
      }
      return p;
    }));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME': return <Dashboard activePet={activePet} pets={pets} setActivePet={(p) => setActivePetId(p.id)} navigate={setCurrentScreen} hasNewNotifications={notifications.some(n => !n.read)} />;
      case 'HEALTH': return <HealthProfile activePet={activePet} navigate={setCurrentScreen} onUpdatePet={handleUpdatePet} />;
      case 'INSIGHTS': return <AIInsights navigate={setCurrentScreen} />;
      case 'CLINICS': return <Clinics navigate={setCurrentScreen} />;
      case 'FIRST_AID': return <FirstAid navigate={setCurrentScreen} />;
      case 'FOOD_SAFETY': return <FoodSafety navigate={setCurrentScreen} />;
      case 'ONBOARDING': return <Onboarding onComplete={handleAddPet} onBack={() => setCurrentScreen('HOME')} />;
      case 'ADD_RECORD': return <AddRecord activePet={activePet} navigate={setCurrentScreen} onSave={handleSaveRecord} />;
      case 'CHAT': return <ChatAssistant activePet={activePet} navigate={setCurrentScreen} />;
      case 'SCHEDULE': return <Schedule navigate={setCurrentScreen} />;
      case 'COMMUNITY': return <Community navigate={setCurrentScreen} />;
      case 'PROFILE': return <Profile navigate={setCurrentScreen} onToggleTheme={() => setIsDarkMode(!isDarkMode)} isDark={isDarkMode} />;
      case 'MY_PETS': return <MyPets pets={pets} navigate={setCurrentScreen} onDelete={handleDeletePet} />;
      case 'SUBSCRIPTION': return <Subscription navigate={setCurrentScreen} />;
      case 'NOTIFICATIONS': return <Notifications navigate={setCurrentScreen} />;
      case 'NOTIFICATION_CENTER': return <NotificationCenter notifications={notifications} navigate={setCurrentScreen} markAllAsRead={markAllAsRead} />;
      case 'SETTINGS': return <Settings navigate={setCurrentScreen} isDark={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />;
      case 'BRAND_KIT': return <BrandKit navigate={setCurrentScreen} />;
      default: return <Dashboard activePet={activePet} pets={pets} setActivePet={(p) => setActivePetId(p.id)} navigate={setCurrentScreen} />;
    }
  };

  const showNav = !['ONBOARDING', 'ADD_RECORD', 'CHAT', 'NOTIFICATION_CENTER', 'BRAND_KIT'].includes(currentScreen);

  return (
    <div className="flex flex-col h-dvh bg-background-light dark:bg-background-dark transition-colors duration-500 overflow-hidden">
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        {renderScreen()}
      </main>

      {showNav && (
        <nav className="h-24 bg-white/80 dark:bg-card-dark/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-2 fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto rounded-t-[32px] shadow-2xl pb-safe">
          {[
            { id: 'HOME', icon: 'grid_view' },
            { id: 'SCHEDULE', icon: 'calendar_today' },
            { id: 'CHAT', icon: 'smart_toy', primary: true },
            { id: 'COMMUNITY', icon: 'groups' },
            { id: 'PROFILE', icon: 'person' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setCurrentScreen(item.id as Screen)}
              className={`flex items-center justify-center transition-all duration-300 ${item.primary ? 'size-16 bg-primary text-white rounded-full -mt-10 shadow-xl shadow-primary/30 border-4 border-white dark:border-background-dark active:scale-90' : `size-12 rounded-2xl ${currentScreen === item.id ? 'text-primary bg-primary/5' : 'text-gray-400'}`}`}
            >
              <span className={`material-symbols-outlined ${item.primary ? 'text-3xl' : 'text-2xl'} ${currentScreen === item.id ? 'fill-current' : ''}`}>{item.icon}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default App;
