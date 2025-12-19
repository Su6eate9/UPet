
import React, { useState } from 'react';
import { Screen, AppNotification } from '../types';

interface NotificationCenterProps {
  navigate: (screen: Screen) => void;
  notifications: AppNotification[];
  markAllAsRead: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ navigate, notifications, markAllAsRead }) => {
  const [filter, setFilter] = useState<'ALL' | 'HEALTH' | 'ACTIVITY' | 'SOCIAL'>('ALL');

  const filteredNotifications = notifications.filter(n => 
    filter === 'ALL' || n.type === filter
  );

  const getTypeStyles = (type: AppNotification['type']) => {
    switch (type) {
      case 'HEALTH': return { icon: 'medical_services', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' };
      case 'ACTIVITY': return { icon: 'directions_run', color: 'text-primary', bg: 'bg-primary/10' };
      case 'SOCIAL': return { icon: 'favorite', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20' };
      default: return { icon: 'info', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-card-dark/80 backdrop-blur-md p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('HOME')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-2xl font-black dark:text-white">Notificações</h1>
          </div>
          <button 
            onClick={markAllAsRead}
            className="text-xs font-black text-primary uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Lidas
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'ALL', label: 'Tudo' },
            { id: 'HEALTH', label: 'Saúde' },
            { id: 'ACTIVITY', label: 'Atividade' },
            { id: 'SOCIAL', label: 'Social' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap border-2 ${
                filter === f.id 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-text-muted'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 p-6 space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => {
            const styles = getTypeStyles(n.type);
            return (
              <div 
                key={n.id} 
                className={`p-4 rounded-3xl flex gap-4 border transition-all ${
                  n.read 
                    ? 'bg-white/50 dark:bg-card-dark/50 border-transparent' 
                    : 'bg-white dark:bg-card-dark border-primary/20 shadow-sm'
                }`}
              >
                <div className={`size-12 rounded-2xl shrink-0 flex items-center justify-center ${styles.bg} ${styles.color}`}>
                  <span className="material-symbols-outlined text-2xl">{styles.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-sm font-black leading-tight ${n.read ? 'text-gray-500' : 'dark:text-white'}`}>{n.title}</h3>
                    {!n.read && <div className="size-2 bg-accent-orange rounded-full mt-1" />}
                  </div>
                  <p className="text-xs text-text-muted dark:text-gray-400 mb-2 leading-snug">{n.description}</p>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{n.time}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
            <span className="material-symbols-outlined text-6xl mb-4">notifications_off</span>
            <p className="font-bold">Nenhuma notificação por aqui.</p>
          </div>
        )}
      </div>

      <div className="p-6">
        <button 
          onClick={() => navigate('NOTIFICATIONS')}
          className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 font-black text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">settings</span>
          Configurações de Alertas
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;
