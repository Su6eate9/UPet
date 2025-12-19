
import React, { useState } from 'react';
import { Screen, Task } from '../types';

interface ScheduleProps {
  navigate: (screen: Screen) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ navigate }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', time: '08:00', task: 'Refeição Manhã', category: 'Alimentação', completed: true, icon: 'restaurant' },
    { id: '2', time: '10:30', task: 'Passeio Diário', category: 'Atividade', completed: true, icon: 'directions_run' },
    { id: '3', time: '14:00', task: 'Vitamina', category: 'Saúde', completed: false, icon: 'pill' },
    { id: '4', time: '19:00', task: 'Refeição Noite', category: 'Alimentação', completed: false, icon: 'restaurant' },
    { id: '5', time: '21:00', task: 'Limpeza de Dentes', category: 'Higiene', completed: false, icon: 'dentistry' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ task: '', time: '12:00', category: 'Geral', icon: 'event' });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
    if (!newTask.task) return;
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      ...newTask,
      completed: false
    };
    setTasks([...tasks].sort((a, b) => a.time.localeCompare(b.time)));
    setTasks(prev => [...prev, task].sort((a, b) => a.time.localeCompare(b.time)));
    setIsModalOpen(false);
    setNewTask({ task: '', time: '12:00', category: 'Geral', icon: 'event' });
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = new Date().getDay();

  return (
    <div className="flex flex-col h-full pb-32 animate-in fade-in duration-500">
      <header className="p-6 bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black dark:text-white">Agenda de Cuidados</h1>
          <button className="size-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
            <span className="material-symbols-outlined">calendar_month</span>
          </button>
        </div>
        
        <div className="flex justify-between items-center px-2">
          {days.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{day}</span>
              <div className={`size-11 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500 ${i === today ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-110' : 'bg-gray-50 dark:bg-card-dark text-gray-500'}`}>
                {new Date().getDate() - (today - i)}
              </div>
            </div>
          ))}
        </div>
      </header>

      <div className="p-6 space-y-4">
        <div className="flex flex-col gap-4 bg-primary/10 p-5 rounded-3xl border border-primary/10">
          <div className="flex items-center justify-between">
            <h2 className="font-black dark:text-white text-base">Progresso de Hoje</h2>
            <span className="text-sm font-black text-primary">{completedCount}/{tasks.length} Concluído</span>
          </div>
          <div className="h-3 w-full bg-white dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {tasks.map((t) => (
            <div 
              key={t.id} 
              onClick={() => toggleTask(t.id)}
              className={`flex items-center gap-4 p-4 rounded-3xl border cursor-pointer transition-all duration-300 ${t.completed ? 'bg-gray-50/50 dark:bg-card-dark/30 border-transparent opacity-60' : 'bg-white dark:bg-card-dark border-gray-100 dark:border-gray-800 shadow-sm'}`}
            >
              <div className="text-[11px] font-black text-gray-400 w-12">{t.time}</div>
              <div className={`size-11 rounded-2xl flex items-center justify-center transition-all ${t.completed ? 'bg-gray-200 text-gray-400' : 'bg-primary/10 text-primary'}`}>
                <span className="material-symbols-outlined text-2xl">{t.icon}</span>
              </div>
              <div className="flex-1">
                <p className={`text-sm font-black ${t.completed ? 'line-through text-gray-400' : 'dark:text-white'}`}>{t.task}</p>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{t.category}</p>
              </div>
              <button className={`size-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${t.completed ? 'bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20' : 'border-gray-200 dark:border-gray-700'}`}>
                {t.completed && <span className="material-symbols-outlined text-[18px] font-bold">check</span>}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 mt-auto">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full h-16 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 font-black flex items-center justify-center gap-3 hover:border-primary hover:text-primary transition-all active:scale-95 group"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Adicionar Lembrete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end animate-in fade-in duration-300">
          <div className="w-full max-w-md mx-auto bg-white dark:bg-background-dark rounded-t-[40px] p-8 pb-12 animate-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black dark:text-white">Novo Lembrete</h2>
              <button onClick={() => setIsModalOpen(false)} className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-text-muted uppercase ml-2">O que fazer?</label>
                <input 
                  value={newTask.task}
                  onChange={e => setNewTask({...newTask, task: e.target.value})}
                  className="w-full h-16 rounded-2xl bg-gray-50 dark:bg-card-dark border-none px-6 font-bold dark:text-white focus:ring-2 ring-primary/20"
                  placeholder="Ex: Passeio no Parque"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-text-muted uppercase ml-2">Horário</label>
                  <input 
                    type="time"
                    value={newTask.time}
                    onChange={e => setNewTask({...newTask, time: e.target.value})}
                    className="w-full h-16 rounded-2xl bg-gray-50 dark:bg-card-dark border-none px-6 font-bold dark:text-white focus:ring-2 ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-text-muted uppercase ml-2">Ícone</label>
                  <select 
                    value={newTask.icon}
                    onChange={e => setNewTask({...newTask, icon: e.target.value})}
                    className="w-full h-16 rounded-2xl bg-gray-50 dark:bg-card-dark border-none px-6 font-bold dark:text-white focus:ring-2 ring-primary/20 appearance-none"
                  >
                    <option value="event">Evento</option>
                    <option value="restaurant">Comida</option>
                    <option value="directions_run">Passeio</option>
                    <option value="pill">Remédio</option>
                    <option value="water_drop">Água</option>
                    <option value="dentistry">Higiene</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={addTask}
                className="w-full h-16 rounded-full bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all mt-4"
              >
                Salvar Lembrete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
