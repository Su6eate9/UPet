
import React from 'react';
import { Screen } from '../types';

interface ClinicsProps {
  navigate: (screen: Screen) => void;
}

const Clinics: React.FC<ClinicsProps> = ({ navigate }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full h-[40%] shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')` }}
        >
          <div className="absolute inset-0 bg-white/30 dark:bg-black/40 backdrop-grayscale-[40%]" />
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-primary text-white rounded-full p-2 animate-bounce shadow-lg">
            <span className="material-symbols-outlined text-2xl">medical_services</span>
          </div>
          <div className="bg-white dark:bg-card-dark px-2 py-1 rounded-md text-[10px] font-bold shadow-md mt-1 dark:text-white">Paws & Claws</div>
        </div>

        <div className="absolute top-0 left-0 w-full pt-12 px-4 flex flex-col gap-3 z-10">
          <div className="bg-white dark:bg-card-dark rounded-xl h-12 shadow-lg flex items-center px-4 gap-2 border border-gray-100 dark:border-gray-800">
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input className="bg-transparent border-none focus:ring-0 flex-1 text-sm dark:text-white" placeholder="Search clinics..." />
            <span className="material-symbols-outlined text-primary">tune</span>
          </div>
        </div>
      </div>

      <div className="flex-1 -mt-6 bg-background-light dark:bg-background-dark rounded-t-2xl z-10 p-6 flex flex-col overflow-hidden relative shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6" />
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold dark:text-white">Nearby Clinics</h3>
          <span className="text-sm font-bold text-primary">View all</span>
        </div>

        <div className="space-y-4 overflow-y-auto no-scrollbar">
          {[
            { name: 'Paws & Claws Veterinary', dist: '1.2 km', addr: '120 W 45th St', rating: '4.9', img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=150' },
            { name: 'City Vet Care', dist: '2.4 km', addr: '89 Broadway', rating: '4.7', img: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=150' }
          ].map((clinic, i) => (
            <div key={i} className="bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex gap-4">
              <img src={clinic.img} className="size-20 rounded-xl object-cover" alt="" />
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-base dark:text-white leading-tight">{clinic.name}</h4>
                    <div className="flex items-center gap-0.5 text-accent-orange">
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{clinic.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mt-1">{clinic.dist} • {clinic.addr}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">Open Now</span>
                  <button className="h-8 px-4 rounded-full bg-primary text-white text-[10px] font-bold">Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clinics;
