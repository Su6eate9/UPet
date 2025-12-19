
import { GoogleGenAI } from "@google/genai";

/**
 * Helper to get the API key from environment variables.
 * Ensures the key is a non-empty string.
 */
const getSafeApiKey = (): string | null => {
  const key = process.env.API_KEY;
  if (!key || key === "" || key === "undefined") {
    return null;
  }
  return key;
};

export async function getPetInsight(petName: string, recentActivity: string) {
  try {
    const apiKey = getSafeApiKey();
    if (!apiKey) return "Mantenha o acompanhamento diário para receber insights personalizados com o UPet! 🐾";
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere um "UPet Smart Insight" curto, amigável e prático (máximo 2 frases) em Português do Brasil para um pet chamado ${petName}. 
      Contexto recente: ${recentActivity}. Seja motivador. Use um emoji relevante no final.`,
    });
    return response.text || "Continue cuidando bem do seu pet com o UPet! ✨";
  } catch (error: any) {
    console.error("Gemini Insight Error:", error);
    return "Uma caminhada extra ou uma brincadeira nova hoje seria ótimo para desestressar! 🎾";
  }
}

export async function checkFoodSafety(food: string) {
  try {
    const apiKey = getSafeApiKey();
    if (!apiKey) {
      return { 
        safe: false, 
        explanation: "O serviço de IA não está configurado. Por favor, conecte sua chave de API.", 
        warning: "Configuração necessária." 
      };
    }

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
    console.error("Food Safety Error:", error);
    return { 
      safe: false, 
      explanation: "Não foi possível verificar a segurança deste alimento no momento.", 
      warning: "Consulte um especialista." 
    };
  }
}

export async function searchVeterinaryClinics(query: string, lat?: number, lng?: number) {
  try {
    const apiKey = getSafeApiKey();
    if (!apiKey) {
      return { text: "Serviço indisponível: Chave de API ausente.", locations: [] };
    }

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
      contents: `Busque clínicas veterinárias reais para: "${query}".`,
      config,
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
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
    return { text: "Erro ao localizar clínicas. Verifique sua conexão.", locations: [] };
  }
}
