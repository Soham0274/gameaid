
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, Search, User, Award, Sword, Crosshair, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { bgmiService, BGMIPlayer } from '@/services/bgmiService';
import { geminiService } from '@/services/geminiService';

const PlayerAnalysis = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [playerData, setPlayerData] = useState<BGMIPlayer | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!username) {
      toast({
        title: 'Error',
        description: 'Please enter a player username',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setPlayerData(null);
    setAnalysis(null);

    try {
      // First search for player
      const players = await bgmiService.searchPlayerByName(username);
      
      if (players.length === 0) {
        toast({
          title: 'Player Not Found',
          description: 'No player was found with that username',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Get detailed stats for the first player found
      const playerWithStats = await bgmiService.getPlayerStats(players[0].id);
      setPlayerData(playerWithStats);

      // Get AI analysis of the player stats
      if (playerWithStats.stats) {
        const aiAnalysis = await geminiService.getGameplayAnalysis(playerWithStats);
        setAnalysis(aiAnalysis);
      }

      toast({
        title: 'Player Found',
        description: `Found stats for ${playerWithStats.name}`,
      });

    } catch (error) {
      console.error('Error analyzing player:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze player. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-4 text-glow">Player Analysis</h1>
          <p className="text-white/70 mb-6">Enter a BGMI/PUBG username to analyze their gameplay statistics and get personalized improvement suggestions.</p>
          
          <div className="flex gap-2 max-w-md">
            <Input
              placeholder="Enter player username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-bgmi-dark border border-bgmi-blue/30 focus-visible:ring-bgmi-blue/50"
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading || !username} 
              className="neon-button"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <><Search className="h-4 w-4 mr-2" /> Analyze</>
              )}
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-bgmi-blue" />
          </div>
        )}

        {playerData && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-bgmi-dark border border-bgmi-blue/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-bgmi-blue" />
                    Player Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-bgmi-darker p-4 rounded-lg">
                      <div className="text-center mb-4">
                        <div className="inline-block rounded-full bg-bgmi-blue/10 p-6 mb-2">
                          <User className="h-12 w-12 text-bgmi-blue" />
                        </div>
                        <h3 className="text-xl text-white font-medium">{playerData.name}</h3>
                        <p className="text-white/60 text-sm">ID: {playerData.id}</p>
                      </div>
                      
                      {playerData.matches && (
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-bgmi-dark rounded p-2">
                            <p className="text-bgmi-blue font-medium text-lg">{playerData.matches.total}</p>
                            <p className="text-white/60 text-xs">Matches</p>
                          </div>
                          <div className="bg-bgmi-dark rounded p-2">
                            <p className="text-bgmi-blue font-medium text-lg">{playerData.matches.wins}</p>
                            <p className="text-white/60 text-xs">Wins</p>
                          </div>
                          <div className="bg-bgmi-dark rounded p-2">
                            <p className="text-bgmi-blue font-medium text-lg">{playerData.matches.top10}</p>
                            <p className="text-white/60 text-xs">Top 10</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {playerData.stats && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-bgmi-darker p-3 rounded-lg">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-bgmi-blue mr-2" />
                            <span className="text-white/80">K/D Ratio</span>
                          </div>
                          <span className="text-white font-medium">{playerData.stats.kd}</span>
                        </div>
                        
                        <div className="flex justify-between items-center bg-bgmi-darker p-3 rounded-lg">
                          <div className="flex items-center">
                            <Sword className="h-4 w-4 text-bgmi-blue mr-2" />
                            <span className="text-white/80">Kills</span>
                          </div>
                          <span className="text-white font-medium">{playerData.stats.kills}</span>
                        </div>
                        
                        <div className="flex justify-between items-center bg-bgmi-darker p-3 rounded-lg">
                          <div className="flex items-center">
                            <Crosshair className="h-4 w-4 text-bgmi-blue mr-2" />
                            <span className="text-white/80">Headshot %</span>
                          </div>
                          <span className="text-white font-medium">{playerData.stats.headshotPercentage}%</span>
                        </div>
                        
                        <div className="flex justify-between items-center bg-bgmi-darker p-3 rounded-lg">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-bgmi-blue mr-2" />
                            <span className="text-white/80">Avg. Survival</span>
                          </div>
                          <span className="text-white font-medium">{playerData.stats.averageSurvivalTime} min</span>
                        </div>
                        
                        <div className="flex justify-between items-center bg-bgmi-darker p-3 rounded-lg">
                          <div className="flex items-center">
                            <Target className="h-4 w-4 text-bgmi-blue mr-2" />
                            <span className="text-white/80">Longest Kill</span>
                          </div>
                          <span className="text-white font-medium">{playerData.stats.longestKill}m</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {playerData.stats?.weaponStats && (
                <Card className="bg-bgmi-dark border border-bgmi-blue/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white">Top Weapons</CardTitle>
                    <CardDescription className="text-white/60">Most used weapons by performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {playerData.stats.weaponStats.map((weapon, index) => (
                        <div key={index} className="bg-bgmi-darker p-3 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="text-white font-medium">{weapon.weaponName}</span>
                            <span className="text-bgmi-blue">{weapon.kills} kills</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-white/60">Headshots: {weapon.headshotKills}</div>
                            <div className="text-white/60">Damage: {weapon.damage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <Card className="bg-bgmi-dark border border-bgmi-blue/20 h-full shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                <CardHeader>
                  <CardTitle className="text-white">Gameplay Analysis</CardTitle>
                  <CardDescription className="text-white/60">AI-powered analysis and personalized recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  {analysis ? (
                    <div className="bg-bgmi-darker p-6 rounded-lg whitespace-pre-wrap text-white/90">
                      {analysis}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-full py-16">
                      <p className="text-white/60">Analysis will appear here after processing...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerAnalysis;
