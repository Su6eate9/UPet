
import { GoogleGenAI } from "@google/genai";

/**
 * Robustly retrieves the API key from environment variables.
 */
const getSafeApiKey = (): string | null => {
  const key = process.env.API_KEY;
  if (!key || 
      key === "" || 
      key === "undefined" || 
      key === "null" || 
      key === "false" ||
      key.trim() === "") {
    return null;
  }
  return key;
};

export async function getPetInsight(petName: string, recentActivity: string) {
  const apiKey = getSafeApiKey();
  
  if (!apiKey) {
    // Simulador de Insight Realista para Teste
    const mockInsights = [
      `${petName} está muito ativo hoje! Considere uma sessão extra de hidratação após o próximo passeio. 💧`,
      `Baseado na raça de ${petName}, o nível de exercício está excelente. Mantenha o ritmo! 🎾`,
      `Parece que ${petName} está um pouco menos ativo que o normal. Que tal uma brincadeira nova? ✨`,
      `Lembre-se de verificar as orelhas de ${petName} após o passeio no parque. Higiene é saúde! 🐾`
    ];
    return mockInsights[Math.floor(Math.random() * mockInsights.length)];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere um "UPet Smart Insight" curto, amigável e prático (máximo 2 frases) em Português do Brasil para um pet chamado ${petName}. 
      Contexto recente: ${recentActivity}. Seja motivador. Use um emoji relevante no final.`,
    });
    return response.text || "Continue cuidando bem do seu pet com o UPet! ✨";
  } catch (error: any) {
    console.error("Gemini Insight Error:", error);
    return "Tente uma sessão extra de carinho ou brincadeira hoje! 🎾";
  }
}

export async function checkFoodSafety(food: string) {
  const apiKey = getSafeApiKey();
  
  if (!apiKey) {
    // Simulador de Segurança Alimentar para Teste
    const lowerFood = food.toLowerCase();
    if (lowerFood.includes('chocolate') || lowerFood.includes('uva')) {
      return { 
        safe: false, 
        explanation: `O alimento ${food} contém substâncias altamente tóxicas para cães e gatos, podendo causar insuficiência renal ou problemas cardíacos graves.`, 
        warning: "EMERGÊNCIA: Não ofereça este alimento!" 
      };
    }
    return { 
      safe: true, 
      explanation: `Em quantidades moderadas, ${food} costuma ser seguro para a maioria dos pets, mas sempre observe reações alérgicas.`, 
      warning: "Moderação é a chave." 
    };
  }

  try {
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
  const apiKey = getSafeApiKey();
  
  if (!apiKey) {
    // Simulador de Clínicas para Teste
    return { 
      text: "No modo de demonstração, encontramos algumas clínicas recomendadas na sua região baseadas em avaliações gerais.", 
      locations: [
        { title: "Hospital Veterinário 24h PetCare", uri: "https://www.google.com/maps/search/veterinario+24h" },
        { title: "Clínica Bicho Mimado", uri: "https://www.google.com/maps/search/clinica+veterinaria" },
        { title: "Centro de Diagnóstico Animal", uri: "https://www.google.com/maps/search/exames+pet" }
      ] 
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const config: any = { tools: [{ googleMaps: {} }] };

    if (lat && lng) {
      config.toolConfig = { retrievalConfig: { latLng: { latitude: lat, longitude: lng } } };
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

    return { text: response.text, locations };
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return { text: "Não conseguimos localizar clínicas no momento. Verifique sua chave de API.", locations: [] };
  }
}
