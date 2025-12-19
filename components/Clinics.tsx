
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';
import { searchVeterinaryClinics } from '../services/geminiService';

interface ClinicsProps {
  navigate: (screen: Screen) => void;
}

const Clinics: React.FC<ClinicsProps> = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{title: string, uri: string}[]>([]);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Tenta obter a localização do usuário ao carregar
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Busca inicial automática se tiver localização
          handleSearch("clínicas veterinárias abertas agora", position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.warn("Geolocation denied or error:", error);
          // Se falhar a geolocalização, busca padrão
          handleSearch("melhores clínicas veterinárias");
        }
      );
    } else {
      handleSearch("melhores clínicas veterinárias");
    }
  }, []);

  const handleSearch = async (query: string = searchTerm, lat?: number, lng?: number) => {
    const finalQuery = query || "clínicas veterinárias";
    setLoading(true);
    try {
      const data = await searchVeterinaryClinics(finalQuery, lat || userLocation?.lat, lng || userLocation?.lng);
      setResults(data.locations);
      setAiResponse(data.text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark animate-in fade-in duration-500">
      {/* Top Banner / Map Visual */}
      <div className="relative w-full h-[30%] shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-background-light dark:to-background-dark" />
        </div>
        
        <div className="absolute top-8 left-4 z-20">
          <button onClick={() => navigate('HOME')} className="size-10 rounded-full bg-white/90 dark:bg-card-dark/90 backdrop-blur shadow-lg flex items-center justify-center text-text-main dark:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>

        <div className="absolute bottom-10 left-0 w-full px-6 flex flex-col gap-3 z-10">
          <div className="bg-white dark:bg-card-dark rounded-2xl h-14 shadow-2xl flex items-center px-4 gap-3 border border-gray-100 dark:border-gray-800 focus-within:ring-2 ring-primary transition-all">
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-transparent border-none focus:ring-0 flex-1 text-sm dark:text-white font-medium" 
              placeholder="Buscar clínicas ou cidades..." 
            />
            <button 
              onClick={() => handleSearch()}
              className="size-10 rounded-xl bg-primary text-white flex items-center justify-center active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined">{loading ? 'progress_activity' : 'near_me'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 -mt-4 bg-background-light dark:bg-background-dark rounded-t-[32px] z-10 p-6 flex flex-col overflow-hidden relative shadow-[0_-12px_30px_rgba(0,0,0,0.05)]">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 shrink-0" />
        
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h3 className="text-xl font-black dark:text-white tracking-tight">Clínicas no UPet Maps</h3>
          {userLocation && (
            <span className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-50">
            <div className="size-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="font-bold text-sm text-text-muted">Localizando melhores opções...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-10">
            {aiResponse && (
              <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl mb-4">
                <p className="text-xs text-primary font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  Recomendação UPet
                </p>
                <p className="text-sm dark:text-gray-300 leading-relaxed italic">{aiResponse}</p>
              </div>
            )}

            {results.length > 0 ? (
              results.map((clinic, i) => (
                <div key={i} className="bg-white dark:bg-card-dark p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4 animate-in slide-in-from-bottom duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-3xl">local_hospital</span>
                      </div>
                      <div>
                        <h4 className="font-black text-lg dark:text-white leading-tight pr-4">{clinic.title}</h4>
                        <div className="flex items-center gap-1 mt-1 text-primary">
                          <span className="material-symbols-outlined text-[14px] fill-current">stars</span>
                          <span className="text-[10px] font-black uppercase tracking-tighter">Verificada no UPet</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded text-[10px] font-black text-green-600 uppercase">Aberto</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <a 
                      href={clinic.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 h-12 rounded-2xl bg-primary text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-xl">map</span>
                      Ver no Mapa
                    </a>
                    <a 
                      href={`tel:000000000`} // Em um app real, o Gemini poderia fornecer o telefone também se solicitado no prompt
                      className="size-12 rounded-2xl bg-gray-50 dark:bg-gray-800 text-text-main dark:text-white flex items-center justify-center border border-gray-100 dark:border-gray-700 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined">call</span>
                    </a>
                  </div>
                </div>
              ))
            ) : !loading && (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                <span className="material-symbols-outlined text-6xl mb-4">location_off</span>
                <p className="font-bold text-lg">Nenhuma clínica encontrada.</p>
                <p className="text-sm">Tente buscar por outro termo ou cidade.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Clinics;
