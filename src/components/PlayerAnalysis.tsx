
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { bgmiService, BGMIPlayer } from '@/services/bgmiService';
import { geminiService } from '@/services/geminiService';
import { Search, User, BarChart2, Award, Target, Crosshair, Clock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlayerAnalysis: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>('');
  const [searchResults, setSearchResults] = useState<BGMIPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<BGMIPlayer | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!playerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a player name",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setSearchResults([]);
    setSelectedPlayer(null);
    setAiAnalysis('');

    try {
      const players = await bgmiService.searchPlayerByName(playerName);
      setSearchResults(players);
      
      if (players.length === 0) {
        toast({
          title: "No results",
          description: "No players found with that name",
          variant: "default",
        });
      } else if (players.length === 1) {
        // If only one player is found, select them automatically
        handleSelectPlayer(players[0]);
      }
    } catch (error) {
      console.error("Error searching for player:", error);
      toast({
        title: "Search failed",
        description: "Failed to search for player. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPlayer = async (player: BGMIPlayer) => {
    try {
      const playerDetails = await bgmiService.getPlayerStats(player.id);
      setSelectedPlayer(playerDetails);
    } catch (error) {
      console.error("Error fetching player stats:", error);
      toast({
        title: "Failed to load stats",
        description: "Could not retrieve player statistics",
        variant: "destructive",
      });
    }
  };

  const handleGetAIAnalysis = async () => {
    if (!selectedPlayer || !selectedPlayer.stats) {
      toast({
        title: "No player data",
        description: "Please select a player first",
        variant: "default",
      });
      return;
    }

    setIsAnalyzing(true);
    setAiAnalysis('');

    try {
      const analysis = await geminiService.getGameplayAnalysis(selectedPlayer);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error("Error getting AI analysis:", error);
      toast({
        title: "Analysis failed",
        description: "Failed to generate AI analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-bgmi-dark border border-bgmi-blue/20 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4 text-glow">Player Analysis</h2>
      
      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter player name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-bgmi-darker border-bgmi-blue/30 text-white"
          />
          <Button 
            onClick={handleSearch} 
            className="bg-bgmi-blue hover:bg-bgmi-blue/80"
            disabled={isSearching}
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
      
      {searchResults.length > 1 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-2">Search Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {searchResults.map((player) => (
              <Button
                key={player.id}
                variant="outline"
                className="bg-bgmi-darker border-bgmi-blue/30 text-white justify-start"
                onClick={() => handleSelectPlayer(player)}
              >
                <User className="h-4 w-4 mr-2" />
                {player.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {selectedPlayer && selectedPlayer.stats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full bg-bgmi-darker border border-bgmi-blue/20 mb-4">
                <TabsTrigger value="overview" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="weapons" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">
                  Weapons
                </TabsTrigger>
                <TabsTrigger value="matches" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">
                  Matches
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card className="bg-bgmi-darker border-bgmi-blue/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white flex items-center">
                      <User className="h-5 w-5 mr-2 text-bgmi-blue" />
                      {selectedPlayer.name}
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Player Statistics Overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-bgmi-dark p-3 rounded-md">
                        <div className="text-white/70 text-xs mb-1">K/D Ratio</div>
                        <div className="text-white text-2xl font-semibold flex items-center">
                          <Target className="h-4 w-4 mr-2 text-bgmi-blue" />
                          {selectedPlayer.stats.kd.toFixed(1)}
                        </div>
                      </div>
                      
                      <div className="bg-bgmi-dark p-3 rounded-md">
                        <div className="text-white/70 text-xs mb-1">Kills</div>
                        <div className="text-white text-2xl font-semibold flex items-center">
                          <Crosshair className="h-4 w-4 mr-2 text-bgmi-blue" />
                          {selectedPlayer.stats.kills}
                        </div>
                      </div>
                      
                      <div className="bg-bgmi-dark p-3 rounded-md">
                        <div className="text-white/70 text-xs mb-1">Headshot %</div>
                        <div className="text-white text-2xl font-semibold flex items-center">
                          <Target className="h-4 w-4 mr-2 text-bgmi-blue" />
                          {selectedPlayer.stats.headshotPercentage}%
                        </div>
                      </div>
                      
                      <div className="bg-bgmi-dark p-3 rounded-md">
                        <div className="text-white/70 text-xs mb-1">Avg Survival</div>
                        <div className="text-white text-2xl font-semibold flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-bgmi-blue" />
                          {selectedPlayer.stats.averageSurvivalTime}m
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-white/70 mb-1">
                          <span>Total Damage Dealt</span>
                          <span>{selectedPlayer.stats.damageDealt.toLocaleString()}</span>
                        </div>
                        <Progress value={Math.min(100, selectedPlayer.stats.damageDealt / 1000)} className="h-2 bg-bgmi-blue/20" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs text-white/70 mb-1">
                          <span>Longest Kill</span>
                          <span>{selectedPlayer.stats.longestKill}m</span>
                        </div>
                        <Progress value={Math.min(100, selectedPlayer.stats.longestKill / 5)} className="h-2 bg-bgmi-blue/20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="weapons" className="space-y-4">
                {selectedPlayer.stats.weaponStats?.map((weapon, index) => (
                  <Card key={index} className="bg-bgmi-darker border-bgmi-blue/20">
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-white text-base">{weapon.weaponName}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4 pt-0 px-4">
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs text-white/70 mb-1">
                            <span>Kills</span>
                            <span>{weapon.kills}</span>
                          </div>
                          <Progress value={weapon.kills / 2} className="h-2 bg-bgmi-blue/20" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs text-white/70 mb-1">
                            <span>Headshot Kills</span>
                            <span>{weapon.headshotKills}</span>
                          </div>
                          <Progress value={weapon.headshotKills * 2} className="h-2 bg-bgmi-blue/20" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs text-white/70 mb-1">
                            <span>Damage</span>
                            <span>{weapon.damage.toLocaleString()}</span>
                          </div>
                          <Progress value={Math.min(100, weapon.damage / 200)} className="h-2 bg-bgmi-blue/20" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="matches" className="space-y-4">
                <Card className="bg-bgmi-darker border-bgmi-blue/20">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-white text-base">Match History</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4 px-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-bgmi-dark p-3 rounded-md text-center">
                        <div className="text-white/70 text-xs mb-1">Total Matches</div>
                        <div className="text-white text-xl font-semibold">{selectedPlayer.matches?.total || 0}</div>
                      </div>
                      
                      <div className="bg-bgmi-dark p-3 rounded-md text-center">
                        <div className="text-white/70 text-xs mb-1">Wins</div>
                        <div className="text-white text-xl font-semibold">{selectedPlayer.matches?.wins || 0}</div>
                      </div>
                      
                      <div className="bg-bgmi-dark p-3 rounded-md text-center">
                        <div className="text-white/70 text-xs mb-1">Top 10</div>
                        <div className="text-white text-xl font-semibold">{selectedPlayer.matches?.top10 || 0}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-white/70 text-xs mb-2">Win Percentage</div>
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-white inline-block">{
                            selectedPlayer.matches ? 
                            ((selectedPlayer.matches.wins / selectedPlayer.matches.total) * 100).toFixed(1) : 
                            "0"
                          }%</div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-bgmi-blue/20">
                          <div 
                            style={{ 
                              width: selectedPlayer.matches ? 
                                `${(selectedPlayer.matches.wins / selectedPlayer.matches.total) * 100}%` : 
                                "0%" 
                            }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-bgmi-blue"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <Button 
                onClick={handleGetAIAnalysis} 
                className="bg-bgmi-blue hover:bg-bgmi-blue/80 w-full"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Analyzing with Gemini AI...
                  </>
                ) : (
                  <>
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Get AI Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="bg-bgmi-darker border-bgmi-blue/20 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Award className="h-5 w-5 mr-2 text-bgmi-blue" />
                  AI Analysis
                </CardTitle>
                <CardDescription className="text-white/70">
                  Powered by Gemini AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-bgmi-blue mb-4" />
                    <p className="text-white/70">Analyzing player data...</p>
                  </div>
                ) : aiAnalysis ? (
                  <div className="text-white whitespace-pre-line bg-bgmi-dark p-4 rounded-md max-h-[500px] overflow-y-auto">
                    {aiAnalysis}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <BarChart2 className="h-10 w-10 text-bgmi-blue/30 mb-4" />
                    <p className="text-white/70 mb-2">Click "Get AI Analysis" to receive personalized insights</p>
                    <p className="text-white/50 text-sm">AI will analyze your gameplay stats and provide improvement suggestions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerAnalysis;
