
import { API_KEYS } from "@/utils/apiKeys";

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export class GeminiService {
  private apiKey: string;
  private baseUrl: string = "https://generativelanguage.googleapis.com/v1";
  private model: string = "gemini-1.5-pro";

  constructor() {
    this.apiKey = API_KEYS.GEMINI;
  }

  async getAnalysis(prompt: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error:", errorData);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json() as GeminiResponse;
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }

  async getGameplayAnalysis(playerStats: any): Promise<string> {
    const prompt = `
      Analyze the following BGMI/PUBG player statistics and provide gameplay improvement suggestions:
      
      ${JSON.stringify(playerStats)}
      
      Please cover:
      1. Strengths based on these statistics
      2. Areas for improvement
      3. Weapon recommendations based on performance
      4. Tactical suggestions
      5. Map positioning recommendations
      6. Best drop locations based on play style
      
      Keep the analysis detailed but actionable. Format your response with clear sections and bullet points.
    `;

    return this.getAnalysis(prompt);
  }

  async getCustomAnswer(question: string, contextData: any = null): Promise<string> {
    let prompt = `
      You are GameAid, an AI assistant specialized in Battle Grounds Mobile India (BGMI) and PUBG. 
      Provide a detailed and helpful response to the following question:
      
      "${question}"
    `;

    if (contextData) {
      prompt += `\nHere is some context that may help with your answer: ${JSON.stringify(contextData)}`;
    }

    prompt += `\n\nMake your response specific to BGMI/PUBG gameplay, using appropriate terminology and game-specific advice.`;

    return this.getAnalysis(prompt);
  }

  async getMapAnalysis(mapName: string): Promise<string> {
    const prompt = `
      Provide a detailed strategic analysis of the "${mapName}" map in BGMI/PUBG. 
      Include information about:
      
      1. Best drop locations for different play styles (aggressive, passive, balanced)
      2. Loot distribution and high-tier loot zones
      3. Vehicle spawn locations
      4. Rotation strategies for early, mid, and late game
      5. Common hotspots where players tend to gather
      6. Terrain advantages and disadvantages
      7. Final circle positioning tips
      
      Format your response with clear sections and practical advice that players can use.
    `;

    return this.getAnalysis(prompt);
  }

  async getWeaponAnalysis(weaponName: string): Promise<string> {
    const prompt = `
      Provide a detailed analysis of the "${weaponName}" in BGMI/PUBG including:
      
      1. Weapon statistics (damage, fire rate, reload time)
      2. Best attachment combinations
      3. Ideal situations to use this weapon
      4. Recoil control tips
      5. Comparison with similar weapons
      6. Pro player strategies with this weapon
      
      Format your response with clear sections and practical advice.
    `;

    return this.getAnalysis(prompt);
  }
}

export const geminiService = new GeminiService();
