
export interface Reward {
  id: string;
  title: string;
  points: number;
  description: string;
  iconType: 'shield' | 'star' | 'award' | 'trophy';
}

export interface PointEarningAction {
  action: string;
  points: number;
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  points: number;
}
