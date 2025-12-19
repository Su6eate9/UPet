
import { GoogleGenAI } from "@google/genai";

// Fix: Strictly follow initialization guidelines for GoogleGenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPetInsight(petName: string, recentActivity: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere um "Smart Insight" curto, amigável e prático (máximo 2 frases) em Português do Brasil para um pet chamado ${petName}. 
      Contexto recente: ${recentActivity}. Use um emoji relevante no final.`,
    });
    return response.text || "Continue monitorando a felicidade do seu pet!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tente adicionar uma sessão extra de brincadeiras hoje à noite! 🎾";
  }
}

export async function checkFoodSafety(food: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `O alimento ${food} é seguro para cães e gatos? Responda em formato JSON com as propriedades "safe" (boolean), "explanation" (string em PT-BR) e "warning" (string em PT-BR ou null).`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { safe: false, explanation: "Sempre consulte um veterinário antes de oferecer novos alimentos.", warning: "Possível toxicidade." };
  }
}
