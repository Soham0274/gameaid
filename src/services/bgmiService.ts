import { API_KEYS } from "@/utils/apiKeys";
import { userDatabaseService } from "./userDatabaseService";

export interface BGMIPlayer {
  id: string;
  name: string;
  matches?: BGMIMatchSummary;
  stats?: BGMIPlayerStats;
  rankInfo?: BGMIRankInfo;
  seasonProgress?: BGMISeasonProgress;
  recentMatches?: BGMIMatch[];
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

export interface BGMIRankInfo {
  tier: string;
  points: number;
  ranking: number;
  percentile: number;
}

export interface BGMISeasonProgress {
  previousTier: string;
  previousPoints: number;
  pointsGained: number;
  winRateChange: number;
  kdChange: number;
}

export interface BGMIMatch {
  id: string;
  mapName: string;
  date: string;
  duration: number;
  placement: number;
  kills: number;
  damage: number;
}

export interface BGMIMap {
  id: string;
  name: string;
  size: string;
  type: string; // e.g., "Classic", "Arcade"
  description: string;
  imageUrl: string;
  hotDropLocations: string[];
  highLootZones: string[];
}

export class BGMIService {
  private baseUrl: string = "https://api.pubg.com/shards/kakao";

  private getApiKey(): string {
    const userData = userDatabaseService.getUserData('player@example.com');
    return userData?.bgmiApiKey || API_KEYS.BGMI;
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${this.getApiKey()}`,
      "Accept": "application/vnd.api+json"
    };
  }

  async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/players?filter[playerNames]=test`,
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Accept": "application/vnd.api+json"
          }
        }
      );

      if (!response.ok) {
        throw new Error(`BGMI API error: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error testing BGMI API key:", error);
      throw error;
    }
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

  async getPlayerMatchHistory(playerId: string): Promise<BGMIMatch[]> {
    try {
      // In a real implementation, you would fetch match history from the API
      
      // For demo purposes, return mock match history
      return this.getMockMatchHistory();
    } catch (error) {
      console.error("Error fetching match history:", error);
      throw error;
    }
  }

  async getAvailableMaps(): Promise<BGMIMap[]> {
    try {
      // In a real implementation, you would fetch maps from the API
      
      // For demo purposes, return mock maps
      return this.getMockMaps();
    } catch (error) {
      console.error("Error fetching BGMI maps:", error);
      throw error;
    }
  }

  async getMapDetails(mapId: string): Promise<BGMIMap | null> {
    try {
      // In a real implementation, you would fetch map details from the API
      
      // For demo purposes, return a mock map
      const maps = this.getMockMaps();
      return maps.find(map => map.id === mapId) || maps[0];
    } catch (error) {
      console.error("Error fetching map details:", error);
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
        },
        rankInfo: {
          tier: "Diamond II",
          points: 3250,
          ranking: 12543,
          percentile: 8.2
        },
        seasonProgress: {
          previousTier: "Platinum I",
          previousPoints: 2980,
          pointsGained: 270,
          winRateChange: 1.5,
          kdChange: 0.3
        }
      }
    ];
  }

  private getMockMatchHistory(): BGMIMatch[] {
    return [
      {
        id: "match-1",
        mapName: "Erangel",
        date: "2023-04-02T15:30:00Z",
        duration: 28.5,
        placement: 3,
        kills: 6,
        damage: 820
      },
      {
        id: "match-2",
        mapName: "Miramar",
        date: "2023-04-02T14:10:00Z",
        duration: 32.2,
        placement: 1,
        kills: 8,
        damage: 1250
      },
      {
        id: "match-3",
        mapName: "Sanhok",
        date: "2023-04-01T20:45:00Z",
        duration: 22.8,
        placement: 12,
        kills: 3,
        damage: 450
      },
      {
        id: "match-4",
        mapName: "Vikendi",
        date: "2023-04-01T19:20:00Z",
        duration: 25.5,
        placement: 5,
        kills: 5,
        damage: 780
      },
      {
        id: "match-5",
        mapName: "Karakin",
        date: "2023-04-01T18:00:00Z",
        duration: 18.2,
        placement: 7,
        kills: 4,
        damage: 620
      }
    ];
  }

  private getMockMaps(): BGMIMap[] {
    return [
      {
        id: "erangel",
        name: "Erangel",
        size: "8x8",
        type: "Classic",
        description: "The original PUBG map featuring diverse terrain with cities, farms, and military installations.",
        imageUrl: "https://staticg.sportskeeda.com/editor/2021/08/49d12-16301767899124-800.jpg",
        hotDropLocations: ["Pochinki", "School", "Military Base", "Georgopol"],
        highLootZones: ["Military Base", "Sosnovka Military Base", "Novorepnoye", "Georgopol"]
      },
      {
        id: "miramar",
        name: "Miramar",
        size: "8x8",
        type: "Classic",
        description: "Desert map with mountainous terrain, featuring small towns and sparse cover.",
        imageUrl: "https://staticg.sportskeeda.com/editor/2022/01/b0749-16412891107016-1920.jpg",
        hotDropLocations: ["Hacienda del Patron", "Pecado", "Los Leones"],
        highLootZones: ["Hacienda del Patron", "Military Camp", "Prison"]
      },
      {
        id: "sanhok",
        name: "Sanhok",
        size: "4x4",
        type: "Classic",
        description: "Smaller jungle map with dense vegetation and faster-paced gameplay.",
        imageUrl: "https://staticg.sportskeeda.com/editor/2021/06/aeb6e-16231194673246-800.jpg",
        hotDropLocations: ["Paradise Resort", "Boot Camp", "Ruins"],
        highLootZones: ["Boot Camp", "Paradise Resort", "Ruins", "Camp Bravo"]
      },
      {
        id: "vikendi",
        name: "Vikendi",
        size: "6x6",
        type: "Classic",
        description: "Snow-covered map with unique terrain and vehicle mechanics.",
        imageUrl: "https://staticg.sportskeeda.com/editor/2022/08/f992f-16594878999253-1920.jpg",
        hotDropLocations: ["Castle", "Cosmodrome", "Dino Park"],
        highLootZones: ["Castle", "Cosmodrome", "Cement Factory", "Villa"]
      },
      {
        id: "karakin",
        name: "Karakin",
        size: "2x2",
        type: "Classic",
        description: "Small desert map with destructible walls and underground tunnels.",
        imageUrl: "https://img.gurugamer.com/resize/740x416/2021/01/12/karakin-pubg-new-map-2021-8c1c.jpg",
        hotDropLocations: ["Al Habar", "Bashara", "Cargo Ship"],
        highLootZones: ["Al Habar", "Bashara", "Hadiqa Nemo"]
      }
    ];
  }
}

export const bgmiService = new BGMIService();
