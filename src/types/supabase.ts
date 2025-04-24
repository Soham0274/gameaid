
import type { Database } from '@/integrations/supabase/types';

// Define additional types that extend the auto-generated ones
export type ProfilesTable = Database['public']['Tables']['profiles']['Row'];
export type PlayerStatsTable = Database['public']['Tables']['player_stats']['Row'];
export type MatchHistoryTable = Database['public']['Tables']['match_history']['Row'];

// Type for user profiles with extended information
export type UserProfile = ProfilesTable & {
  playerStats?: PlayerStatsTable;
  matchHistory?: MatchHistoryTable[];
};
