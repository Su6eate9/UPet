
import React from 'react';
import { Pet, Screen } from '../types';

interface MyPetsProps {
  pets: Pet[];
  navigate: (screen: Screen) => void;
  onDelete: (id: string) => void;
}

const MyPets: React.FC<MyPetsProps> = ({ pets, navigate, onDelete }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark animate-in slide-in-from-right duration-300">
      <header className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-background-dark z-10">
        <button onClick={() => navigate('PROFILE')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-black dark:text-white">My Pets</h2>
        <button onClick={() => navigate('ONBOARDING')} className="size-10 flex items-center justify-center rounded-full bg-primary text-white">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <div className="p-6 space-y-4">
        {pets.map(pet => (
          <div key={pet.id} className="bg-gray-50 dark:bg-card-dark p-4 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 group">
            <div className="size-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
              <img src={pet.avatar} className="w-full h-full object-cover" alt={pet.name} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold dark:text-white text-lg leading-tight">{pet.name}</h3>
              <p className="text-xs text-text-muted">{pet.breed} • {pet.age}</p>
            </div>
            <button 
              onClick={() => onDelete(pet.id)}
              className="size-10 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPets;
