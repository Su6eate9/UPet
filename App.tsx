
import React, { useState, useEffect } from 'react';
import { Screen, Pet, ActivityType } from './types';
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
import Settings from './components/Settings';

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

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return <Dashboard activePet={activePet} pets={pets} setActivePet={(p) => setActivePetId(p.id)} navigate={setCurrentScreen} />;
      case 'HEALTH':
        return <HealthProfile activePet={activePet} navigate={setCurrentScreen} />;
      case 'INSIGHTS':
        return <AIInsights navigate={setCurrentScreen} />;
      case 'CLINICS':
        return <Clinics navigate={setCurrentScreen} />;
      case 'FIRST_AID':
        return <FirstAid navigate={setCurrentScreen} />;
      case 'FOOD_SAFETY':
        return <FoodSafety navigate={setCurrentScreen} />;
      case 'COMMUNITY':
        return <Community navigate={setCurrentScreen} />;
      case 'PROFILE':
        return <Profile navigate={setCurrentScreen} onToggleTheme={() => setIsDarkMode(!isDarkMode)} isDark={isDarkMode} />;
      case 'ADD_RECORD':
        return <AddRecord activePet={activePet} navigate={setCurrentScreen} onSave={updatePetActivity} />;
      case 'CHAT':
        return <ChatAssistant activePet={activePet} navigate={setCurrentScreen} />;
      case 'SCHEDULE':
        return <Schedule navigate={setCurrentScreen} />;
      case 'MY_PETS':
        return <MyPets pets={pets} navigate={setCurrentScreen} onDelete={handleDeletePet} />;
      case 'SUBSCRIPTION':
        return <Subscription navigate={setCurrentScreen} />;
      case 'NOTIFICATIONS':
        return <Notifications navigate={setCurrentScreen} />;
      case 'SETTINGS':
        return <Settings navigate={setCurrentScreen} isDark={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />;
      case 'ONBOARDING':
        return <Onboarding onComplete={handleAddPet} onBack={() => setCurrentScreen('HOME')} />;
      default:
        return <Dashboard activePet={activePet} pets={pets} setActivePet={(p) => setActivePetId(p.id)} navigate={setCurrentScreen} />;
    }
  };

  const showNav = !['ONBOARDING', 'ADD_RECORD', 'CHAT', 'SUBSCRIPTION', 'MY_PETS', 'NOTIFICATIONS', 'SETTINGS'].includes(currentScreen);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark relative shadow-2xl overflow-hidden flex flex-col">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {renderScreen()}
      </main>

      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-card-dark/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 px-2 h-[88px] flex items-start justify-between z-50 rounded-t-[32px] shadow-[0_-8px_20px_rgba(0,0,0,0.05)] transition-colors">
          <button onClick={() => setCurrentScreen('HOME')} className={`flex flex-col items-center gap-1 w-12 transition-all ${currentScreen === 'HOME' ? 'text-primary scale-110' : 'text-gray-400'}`}>
            <span className={`material-symbols-outlined text-[26px] ${currentScreen === 'HOME' ? 'fill-current' : ''}`}>home</span>
            <span className="text-[9px] font-bold">Home</span>
          </button>
          <button onClick={() => setCurrentScreen('SCHEDULE')} className={`flex flex-col items-center gap-1 w-12 transition-all ${currentScreen === 'SCHEDULE' ? 'text-primary scale-110' : 'text-gray-400'}`}>
            <span className={`material-symbols-outlined text-[26px] ${currentScreen === 'SCHEDULE' ? 'fill-current' : ''}`}>calendar_today</span>
            <span className="text-[9px] font-bold">Agenda</span>
          </button>
          
          <div className="relative -top-7">
            <button onClick={() => setCurrentScreen('ADD_RECORD')} className="size-16 rounded-full bg-primary text-white shadow-xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border-4 border-white dark:border-background-dark">
              <span className="material-symbols-outlined text-4xl">add</span>
            </button>
          </div>

          <button onClick={() => setCurrentScreen('COMMUNITY')} className={`flex flex-col items-center gap-1 w-12 transition-all ${currentScreen === 'COMMUNITY' ? 'text-primary scale-110' : 'text-gray-400'}`}>
            <span className={`material-symbols-outlined text-[26px] ${currentScreen === 'COMMUNITY' ? 'fill-current' : ''}`}>groups</span>
            <span className="text-[9px] font-bold">Social</span>
          </button>
          <button onClick={() => setCurrentScreen('PROFILE')} className={`flex flex-col items-center gap-1 w-12 transition-all ${currentScreen === 'PROFILE' ? 'text-primary scale-110' : 'text-gray-400'}`}>
            <span className={`material-symbols-outlined text-[26px] ${currentScreen === 'PROFILE' ? 'fill-current' : ''}`}>person</span>
            <span className="text-[9px] font-bold">Profile</span>
          </button>
        </nav>
      )}

      {currentScreen === 'HOME' && (
        <button 
          onClick={() => setCurrentScreen('CHAT')}
          className="fixed bottom-24 right-6 size-14 rounded-full bg-text-main dark:bg-white text-white dark:text-text-main shadow-2xl flex items-center justify-center z-40 animate-bounce hover:animate-none active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined">smart_toy</span>
        </button>
      )}
    </div>
  );
};

export default App;
