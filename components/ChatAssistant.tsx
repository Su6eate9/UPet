
import React, { useState, useRef, useEffect } from 'react';
import { Screen, Pet, Message } from '../types';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import Logo from './Logo';

interface ChatAssistantProps {
  activePet: Pet;
  navigate: (screen: Screen) => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ activePet, navigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Oi! Eu sou o assistente IA do **UPet**. Como posso ajudar com o **${activePet.name}** hoje?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getValidApiKey = () => {
    const key = process.env.API_KEY;
    if (!key || key === "" || key === "undefined" || key === "null") return null;
    return key;
  };

  const initChat = (apiKey: string) => {
    const ai = new GoogleGenAI({ apiKey });
    return ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Você é um veterinário assistente especialista em cuidados de animais domésticos para o aplicativo UPet. 
        O usuário está perguntando sobre seu pet chamado ${activePet.name}, que é um ${activePet.species} da raça ${activePet.breed}. 
        Use formatação rica: use **negrito** para termos importantes, crie listas com "-" se necessário, e organize a resposta em parágrafos curtos.
        Seja amigável, conciso e sempre recomenda um veterinário real se o problema parecer urgente. Reforce que você faz parte do ecossistema UPet.`
      },
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    const apiKey = getValidApiKey();

    // Lógica de Demo se não houver Chave
    if (!apiKey) {
      setTimeout(() => {
        const demoResponses = [
          `Como estou no **Modo de Demonstração**, não consigo dar um diagnóstico em tempo real, mas baseado na raça **${activePet.breed}**, recomendo manter as vacinas em dia e observar o apetite.`,
          `Isso parece uma dúvida interessante sobre o **${activePet.name}**! Em uma consulta real via IA, eu analisaria todo o histórico de saúde dele para te responder com precisão.`,
          `Para dúvidas sobre comportamento de **${activePet.species}s**, geralmente recomendamos reforço positivo e rotina de passeios. Conecte sua chave Gemini para uma consultoria personalizada!`
        ];
        const text = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        setMessages(prev => [...prev, { role: 'model', text }]);
        setIsTyping(false);
      }, 1500);
      return;
    }

    try {
      if (!chatRef.current) {
        chatRef.current = initChat(apiKey);
      }

      const streamResponse = await chatRef.current.sendMessageStream({ message: userText });
      
      let fullResponseText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text || "";
        fullResponseText += textChunk;
        
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'model', text: fullResponseText };
          return newMsgs;
        });
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Tive um probleminha técnico aqui. Pode tentar enviar de novo? 📡" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatMessage = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-text-main dark:text-white">$1</strong>');
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={i} className="flex gap-2 ml-1 mb-1">
            <span className="text-primary mt-1 text-[8px]">●</span>
            <span dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} />
          </div>
        );
      }
      return (
        <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-2'} 
           dangerouslySetInnerHTML={{ __html: processedLine }} />
      );
    });
  };

  const isDemo = !getValidApiKey();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark animate-in slide-in-from-right duration-300">
      <header className="p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-card-dark/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={() => navigate('HOME')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={false} />
          <div>
            <h2 className="font-bold dark:text-white leading-tight">UPet Talk AI</h2>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">
              {isDemo ? 'Modo de Teste (Demo)' : 'IA Veterinária Ativa'}
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {isDemo && (
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 mb-4">
            <p className="text-[10px] text-primary font-black uppercase text-center tracking-widest">
              Nenhuma chave de API detectada. Usando respostas simuladas.
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm border ${
              msg.role === 'user' 
                ? 'bg-primary border-primary text-white rounded-tr-none' 
                : 'bg-gray-50 dark:bg-card-dark dark:text-gray-300 border-gray-100 dark:border-gray-800 rounded-tl-none'
            }`}>
              {msg.role === 'user' ? (
                <p className="whitespace-pre-line font-medium">{msg.text}</p>
              ) : (
                <div className="flex flex-col">
                  {formatMessage(msg.text)}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-50 dark:bg-card-dark p-4 rounded-3xl rounded-tl-none flex gap-1 items-center border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="size-1.5 bg-primary rounded-full animate-bounce" />
              <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark">
        <div className="flex gap-2 items-center bg-gray-50 dark:bg-card-dark rounded-full px-4 h-14 border border-gray-200 dark:border-gray-800 focus-within:border-primary transition-all shadow-inner">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={`Pergunta sobre o ${activePet.name}...`}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm dark:text-white font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="size-10 rounded-full bg-primary text-white flex items-center justify-center active:scale-90 transition-transform disabled:opacity-30"
          >
            <span className="material-symbols-outlined font-bold">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
