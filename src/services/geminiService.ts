
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
  private baseUrl: string = "https://generativelanguage.googleapis.com/v1beta/models";
  private model: string = "gemini-pro";

  constructor() {
    this.apiKey = API_KEYS.GEMINI;
  }

  async getAnalysis(prompt: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`,
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
      
      Keep the analysis concise and focus on actionable advice.
    `;

    return this.getAnalysis(prompt);
  }
}

export const geminiService = new GeminiService();
