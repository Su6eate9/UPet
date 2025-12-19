
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Screen } from '../types';
import Logo from './Logo';

interface BrandKitProps {
  navigate: (screen: Screen) => void;
}

const BrandKit: React.FC<BrandKitProps> = ({ navigate }) => {
  const [generating, setGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const generateLogoImage = async () => {
    setGenerating(true);
    setGeneratedImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `High-resolution, professional app logo for a pet tech startup called 'UPet'. 
              The logo consists of a rounded square icon tilted slightly (3 degrees) with a vibrant lime-to-emerald green gradient background. 
              Inside the square is a clean, minimalist white pet paw icon. 
              To the right of the square, the text 'UPet' is written in a clean, bold, modern geometric sans-serif font. 
              The letter 'U' is in the same vibrant green as the icon, and the letters 'Pet' are in a sleek charcoal black. 
              The whole composition is centered on a pure, clean white background. 
              Premium, minimalist, high-quality aesthetic. Vector-style rendering.`
            }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setGeneratedImageUrl(`data:image/png;base64,${base64Data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Error generating logo:", error);
      alert("Houve um erro ao gerar a imagem da logo. Tente novamente.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark animate-in slide-in-from-bottom duration-500">
      <header className="p-6 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-card-dark/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={() => navigate('SETTINGS')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h2 className="font-bold dark:text-white leading-tight">Kit de Marca UPet</h2>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Ativos Oficiais</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        <section className="space-y-4">
          <h3 className="text-xs font-black text-text-muted uppercase tracking-widest px-2">Preview da Marca (SVG)</h3>
          <div className="bg-gray-50 dark:bg-card-dark rounded-[32px] p-12 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800">
            <Logo size="lg" />
            <p className="text-[10px] text-text-muted mt-6 font-medium">Este é o logotipo interativo do sistema.</p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black text-text-muted uppercase tracking-widest">Versão Raster (Alta Definição)</h3>
            <span className="bg-primary/10 text-primary text-[8px] font-black px-2 py-0.5 rounded uppercase">Powered by Gemini</span>
          </div>
          
          <div className="relative group">
            <div className={`aspect-square w-full rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center overflow-hidden transition-all bg-gray-50/50 dark:bg-card-dark/50 ${generatedImageUrl ? 'border-primary/30' : ''}`}>
              {generating ? (
                <div className="flex flex-col items-center gap-4">
                  <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
                  <p className="text-sm font-bold text-text-muted animate-pulse">A IA está renderizando sua logo...</p>
                </div>
              ) : generatedImageUrl ? (
                <img src={generatedImageUrl} className="w-full h-full object-contain p-4 animate-in fade-in zoom-in-95 duration-500" alt="Generated Logo" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-center px-8">
                  <div className="size-20 rounded-full bg-primary/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary/40">auto_awesome</span>
                  </div>
                  <p className="text-sm font-medium text-text-muted leading-relaxed">Clique abaixo para gerar uma versão em alta resolução para usar em sites, redes sociais ou cartões de visita.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="p-6 bg-gradient-to-t from-white dark:from-background-dark via-white dark:via-background-dark pt-10 sticky bottom-0 border-t border-gray-50 dark:border-gray-800">
        {!generatedImageUrl ? (
          <button 
            onClick={generateLogoImage}
            disabled={generating}
            className="w-full h-16 rounded-full bg-primary text-white font-black text-lg shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined">brush</span>
            {generating ? 'Renderizando...' : 'Gerar Imagem da Logo'}
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <a 
              href={generatedImageUrl} 
              download="UPet-Logo-Official.png"
              className="w-full h-16 rounded-full bg-primary text-white font-black text-lg shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">download</span>
              Baixar PNG em Alta Resolução
            </a>
            <button 
              onClick={generateLogoImage}
              className="w-full h-12 rounded-full border-2 border-primary/20 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Gerar Outra Versão
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandKit;
