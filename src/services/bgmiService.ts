
import { API_KEYS } from "@/utils/apiKeys";

export interface BGMIPlayer {
  id: string;
  name: string;
  matches?: BGMIMatchSummary;
  stats?: BGMIPlayerStats;
}

export interface BGMIMatchSummary {
  total: number;
  wins: number;
  top10: number;
}

export interface BGMIPlayerStats {
  kills: number;
  assists: number;
  kd: number;
  damageDealt: number;
  headshotPercentage: number;
  averageSurvivalTime: number;
  longestKill: number;
  weaponStats?: BGMIWeaponStat[];
}

export interface BGMIWeaponStat {
  weaponName: string;
  kills: number;
  headshotKills: number;
  damage: number;
}

export class BGMIService {
  private apiKey: string;
  private baseUrl: string = "https://api.pubg.com/shards/kakao";

  constructor() {
    this.apiKey = API_KEYS.BGMI;
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${this.apiKey}`,
      "Accept": "application/vnd.api+json"
    };
  }

  async searchPlayerByName(playerName: string): Promise<BGMIPlayer[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/players?filter[playerNames]=${playerName}`,
        {
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        console.error('BGMI API error:', response.status);
        throw new Error(`BGMI API error: ${response.status}`);
      }

      const data = await response.json();
      
      return data.data.map((player: any) => ({
        id: player.id,
        name: player.attributes.name
      }));
    } catch (error) {
      console.error("Error searching BGMI player:", error);
      
      // For demo purposes, return mock data if API fails
      return this.getMockPlayerData(playerName);
    }
  }

  async getPlayerStats(playerId: string): Promise<BGMIPlayer> {
    try {
      // In a real implementation, you would make additional API calls here
      // to fetch detailed player statistics based on the player ID
      
      // For demo purposes, we'll use mock data
      const mockPlayers = this.getMockPlayerData("MockPlayer");
      return mockPlayers[0];
    } catch (error) {
      console.error("Error fetching player stats:", error);
      throw error;
    }
  }

  // Mock data for demo purposes
  private getMockPlayerData(playerName: string): BGMIPlayer[] {
    return [
      {
        id: "mock-player-id-1",
        name: playerName,
        matches: {
          total: 157,
          wins: 12,
          top10: 43
        },
        stats: {
          kills: 321,
          assists: 97,
          kd: 2.8,
          damageDealt: 42056,
          headshotPercentage: 22.5,
          averageSurvivalTime: 18.3,
          longestKill: 312,
          weaponStats: [
            {
              weaponName: "M416",
              kills: 87,
              headshotKills: 19,
              damage: 12450
            },
            {
              weaponName: "AKM",
              kills: 65,
              headshotKills: 12,
              damage: 9870
            },
            {
              weaponName: "Kar98k",
              kills: 43,
              headshotKills: 32,
              damage: 6520
            }
          ]
        }
      }
    ];
  }
}

export const bgmiService = new BGMIService();
