
import React, { useState, useRef, useEffect } from 'react';
import { Screen, Pet, Message } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ChatAssistantProps {
  activePet: Pet;
  navigate: (screen: Screen) => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ activePet, navigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Oi! Eu sou o assistente IA do CuidaPet. Como posso ajudar com o ${activePet.name} hoje?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Você é um veterinário assistente especialista em cuidados de animais domésticos para o aplicativo CuidaPet. 
          O usuário está perguntando sobre seu pet chamado ${activePet.name}, que é um ${activePet.species} da raça ${activePet.breed}. 
          Seja amigável, conciso e sempre recomende um veterinário real se o problema parecer urgente.`
        }
      });

      const response = await chat.sendMessage({ message: input });
      const modelText = response.text || "Desculpe, tive um problema para processar sua dúvida. 🐾";
      
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Ocorreu um erro na conexão. Tente novamente em breve! 📡" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark">
      <header className="p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-card-dark/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={() => navigate('HOME')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">smart_toy</span>
          </div>
          <div>
            <h2 className="font-bold dark:text-white leading-tight">PetTalk AI</h2>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Especialista Online</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-gray-100 dark:bg-card-dark dark:text-gray-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-card-dark p-4 rounded-3xl rounded-tl-none flex gap-1 items-center">
              <div className="size-1.5 bg-gray-400 rounded-full animate-bounce" />
              <div className="size-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="size-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark">
        <div className="flex gap-2 items-center bg-gray-50 dark:bg-card-dark rounded-full px-4 h-14 border border-gray-200 dark:border-gray-800 focus-within:border-primary transition-all">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={`Dúvida sobre o ${activePet.name}?`}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm dark:text-white"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="size-10 rounded-full bg-primary text-white flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">Dica: Pergunte sobre dieta, sintomas ou truques!</p>
      </div>
    </div>
  );
};

export default ChatAssistant;
