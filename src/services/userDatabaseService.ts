export interface UserData {
  username: string;
  email: string;
  gameId?: string;
  bgmiApiKey?: string;
  profilePhoto?: string;
  voiceMessage?: string;
  loginTime: number;
  loginCount: number;
  registrationTime?: number;
  lastSearchedPlayers?: string[];
  favoriteWeapons?: string[];
  favoriteMaps?: string[];
  sessionHistory?: {
    date: number;
    duration: number;
  }[];
  linkedAccounts?: {
    discord: boolean;
    facebook: boolean;
    google: boolean;
  };
}

export class UserDatabaseService {
  private STORAGE_KEY = 'gameaid_user_data';
  
  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({}));
    }
  }

  saveUser(userData: Partial<UserData>): void {
    const existingData = this.getUserData(userData.email || '');
    const isNewUser = !existingData;
    
    const updatedData = {
      ...existingData,
      ...userData,
      loginTime: Date.now(),
      loginCount: (existingData?.loginCount || 0) + 1,
      sessionHistory: [
        ...(existingData?.sessionHistory || []),
        { date: Date.now(), duration: 0 }
      ]
    };
    
    // Set registration time only for new users
    if (isNewUser) {
      updatedData.registrationTime = Date.now();
    }
    
    const allUsers = this.getAllUsers();
    allUsers[userData.email || ''] = updatedData;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allUsers));
  }

  getUserData(email: string): UserData | null {
    const allUsers = this.getAllUsers();
    return allUsers[email] || null;
  }

  getAllUsers(): Record<string, UserData> {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return {};
    }
  }

  updateUserData(email: string, updatedData: Partial<UserData>): void {
    const existingData = this.getUserData(email);
    if (!existingData) return;
    
    const newData = { ...existingData, ...updatedData };
    const allUsers = this.getAllUsers();
    allUsers[email] = newData;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allUsers));
  }

  addSearchedPlayer(email: string, playerName: string): void {
    const userData = this.getUserData(email);
    if (!userData) return;
    
    const searchedPlayers = userData.lastSearchedPlayers || [];
    // Add to front and remove duplicates
    const updatedPlayers = [
      playerName,
      ...searchedPlayers.filter(name => name !== playerName)
    ].slice(0, 10); // Keep only last 10 searches
    
    this.updateUserData(email, { lastSearchedPlayers: updatedPlayers });
  }

  saveProfilePhoto(email: string, photoData: string): void {
    this.updateUserData(email, { profilePhoto: photoData });
  }
  
  saveVoiceMessage(email: string, voiceData: string): void {
    this.updateUserData(email, { voiceMessage: voiceData });
  }

  clearUserData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.initializeStorage();
  }
}

export const userDatabaseService = new UserDatabaseService();
