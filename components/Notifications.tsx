
import React, { useState } from 'react';
import { Screen } from '../types';

interface NotificationsProps {
  navigate: (screen: Screen) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ navigate }) => {
  const [notifs, setNotifs] = useState({
    meds: true,
    food: true,
    walk: false,
    community: true,
    news: false
  });

  const toggle = (key: keyof typeof notifs) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const items = [
    { key: 'meds', icon: 'pill', label: 'Medicine Reminders', desc: 'Alerts for scheduled treatments' },
    { key: 'food', icon: 'restaurant', label: 'Feeding Alerts', desc: 'When it is time for lunch' },
    { key: 'walk', icon: 'directions_run', label: 'Walking Prompt', desc: 'Nudges to keep pet active' },
    { key: 'community', icon: 'groups', label: 'Community Activity', desc: 'Likes and comments on posts' },
    { key: 'news', icon: 'newspaper', label: 'App News & Tips', desc: 'Occasional health advice' },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark animate-in slide-in-from-right duration-300">
      <header className="p-6 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate('PROFILE')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-black dark:text-white">Notifications</h2>
      </header>

      <div className="p-6 space-y-4">
        {items.map(item => (
          <div key={item.key} className="flex items-center justify-between p-4 rounded-3xl bg-gray-50 dark:bg-card-dark border border-transparent hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white">{item.label}</p>
                <p className="text-[10px] text-text-muted">{item.desc}</p>
              </div>
            </div>
            <button 
              onClick={() => toggle(item.key as any)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${notifs[item.key as keyof typeof notifs] ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
            >
              <div className={`size-4 bg-white rounded-full transition-transform ${notifs[item.key as keyof typeof notifs] ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
