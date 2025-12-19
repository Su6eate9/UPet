
import { GoogleGenAI } from "@google/genai";

export async function getPetInsight(petName: string, recentActivity: string) {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return "Continue monitorando a felicidade do seu pet com o UPet!";
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere um "UPet Smart Insight" curto, amigável e prático (máximo 2 frases) em Português do Brasil para um pet chamado ${petName}. 
      Contexto recente: ${recentActivity}. Use um emoji relevante no final.`,
    });
    return response.text || "Continue monitorando a felicidade do seu pet com o UPet!";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return "Tente adicionar uma sessão extra de brincadeiras hoje à noite! 🎾";
  }
}

export async function checkFoodSafety(food: string) {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `O alimento ${food} é seguro para cães e gatos? Sou o assistente UPet. Responda em formato JSON com as propriedades "safe" (boolean), "explanation" (string em PT-BR) e "warning" (string em PT-BR ou null).`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Food Safety Gemini Error:", error);
    return { safe: false, explanation: "Sempre consulte um veterinário antes de oferecer novos alimentos.", warning: "Possível toxicidade ou erro na conexão." };
  }
}

export async function searchVeterinaryClinics(query: string, lat?: number, lng?: number) {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });
    
    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    if (lat && lng) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Encontre clínicas veterinárias e hospitais pet para a busca: "${query}". Forneça uma lista amigável e mencione os nomes das clínicas.`,
      config,
    });

    // Extrair chunks de grounding que contêm os links reais do Maps
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Transformar chunks em um formato mais fácil para o componente
    const locations = groundingChunks
      .filter((chunk: any) => chunk.maps)
      .map((chunk: any) => ({
        title: chunk.maps.title,
        uri: chunk.maps.uri,
      }));

    return {
      text: response.text,
      locations
    };
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return { text: "Não foi possível buscar clínicas no momento. Verifique sua chave de API.", locations: [] };
  }
}
