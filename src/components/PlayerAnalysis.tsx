
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { 
  Loader2, Search, User, Award, Sword, Crosshair, Clock, Target, 
  Map, History, BarChart2, Trophy, ChevronDown, ChevronUp 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { bgmiService, BGMIPlayer, BGMIMatch, BGMIMap } from '@/services/bgmiService';
import { geminiService } from '@/services/geminiService';
import { userDatabaseService } from '@/services/userDatabaseService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const PlayerAnalysis = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [playerData, setPlayerData] = useState<BGMIPlayer | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [recentMatches, setRecentMatches] = useState<BGMIMatch[]>([]);
  const [maps, setMaps] = useState<BGMIMap[]>([]);
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const [selectedMap, setSelectedMap] = useState<BGMIMap | null>(null);
  const [mapAnalysis, setMapAnalysis] = useState<string | null>(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('player');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load available maps
    const loadMaps = async () => {
      try {
        const availableMaps = await bgmiService.getAvailableMaps();
        setMaps(availableMaps);
        if (availableMaps.length > 0) {
          setSelectedMapId(availableMaps[0].id);
        }
      } catch (error) {
        console.error("Error loading maps:", error);
      }
    };

    // Load user's recent searches if logged in
    const loadUserData = () => {
      // For demo, we'll use a fixed email
      const userData = userDatabaseService.getUserData('player@example.com');
      if (userData && userData.lastSearchedPlayers) {
        setRecentSearches(userData.lastSearchedPlayers);
      }
    };

    loadMaps();
    loadUserData();
  }, []);

  useEffect(() => {
    if (selectedMapId) {
      loadMapDetails(selectedMapId);
    }
  }, [selectedMapId]);

  const loadMapDetails = async (mapId: string) => {
    setMapLoading(true);
    try {
      const mapDetails = await bgmiService.getMapDetails(mapId);
      setSelectedMap(mapDetails);
      
      if (mapDetails) {
        const analysis = await geminiService.getMapAnalysis(mapDetails.name);
        setMapAnalysis(analysis);
      }
    } catch (error) {
      console.error("Error loading map details:", error);
      toast({
        title: 'Error',
        description: 'Failed to load map details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setMapLoading(false);
    }
  };

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
    setRecentMatches([]);

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
      
      // Get recent match history
      const matches = await bgmiService.getPlayerMatchHistory(players[0].id);
      setRecentMatches(matches);

      // Get AI analysis of the player stats
      if (playerWithStats.stats) {
        const aiAnalysis = await geminiService.getGameplayAnalysis(playerWithStats);
        setAnalysis(aiAnalysis);
      }

      // Save search to user history
      userDatabaseService.addSearchedPlayer('player@example.com', username);
      // Update local state for recent searches
      const userData = userDatabaseService.getUserData('player@example.com');
      if (userData && userData.lastSearchedPlayers) {
        setRecentSearches(userData.lastSearchedPlayers);
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

  const handleSelectRecentSearch = (playerName: string) => {
    setUsername(playerName);
    setShowSearchHistory(false);
    // Trigger search immediately
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-bgmi-darker border border-bgmi-blue/20">
          <TabsTrigger value="player" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">
            Player Analysis
          </TabsTrigger>
          <TabsTrigger value="maps" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">
            Maps & Strategies
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="player" className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4 text-glow">Player Analysis</h1>
            <p className="text-white/70 mb-6">Enter a BGMI/PUBG username to analyze their gameplay statistics and get personalized improvement suggestions.</p>
            
            <div className="flex flex-col gap-2 max-w-md">
              <div className="relative">
                <Input
                  placeholder="Enter player username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-bgmi-dark border border-bgmi-blue/30 focus-visible:ring-bgmi-blue/50"
                  onFocus={() => setShowSearchHistory(true)}
                />
                
                {/* Recent searches dropdown */}
                {showSearchHistory && recentSearches.length > 0 && (
                  <div className="absolute w-full mt-1 bg-bgmi-dark border border-bgmi-blue/30 rounded-md z-10 max-h-60 overflow-y-auto">
                    <div className="p-2 text-xs text-white/60 border-b border-bgmi-blue/20">Recent searches</div>
                    {recentSearches.map((search, index) => (
                      <div 
                        key={index} 
                        className="p-2 text-white hover:bg-bgmi-blue/10 cursor-pointer"
                        onClick={() => handleSelectRecentSearch(search)}
                      >
                        {search}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSearch} 
                  disabled={loading || !username} 
                  className="neon-button flex-1"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <><Search className="h-4 w-4 mr-2" /> Analyze Player</>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  className="border-bgmi-blue/30 text-white"
                  onClick={() => setShowSearchHistory(!showSearchHistory)}
                >
                  {showSearchHistory ? <ChevronUp className="h-4 w-4" /> : <History className="h-4 w-4" />}
                </Button>
              </div>
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
                          
                          {playerData.rankInfo && (
                            <div className="mt-2 flex justify-center items-center gap-2">
                              <Trophy className="h-4 w-4 text-yellow-400" />
                              <span className="text-yellow-400 font-medium">{playerData.rankInfo.tier}</span>
                            </div>
                          )}
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
                
                {recentMatches.length > 0 && (
                  <Card className="bg-bgmi-dark border border-bgmi-blue/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white flex items-center gap-2">
                        <History className="h-5 w-5 text-bgmi-blue" />
                        Recent Matches
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentMatches.map((match, index) => {
                          const matchDate = new Date(match.date);
                          const dateStr = matchDate.toLocaleDateString();
                          
                          return (
                            <div 
                              key={index} 
                              className={`p-3 rounded-lg ${
                                match.placement <= 3 
                                  ? 'bg-green-950/40 border border-green-500/20' 
                                  : match.placement <= 10 
                                    ? 'bg-yellow-950/40 border border-yellow-500/20' 
                                    : 'bg-bgmi-darker'
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-white font-medium">{match.mapName}</span>
                                <span className={`font-medium ${
                                  match.placement <= 3 
                                    ? 'text-green-400' 
                                    : match.placement <= 10 
                                      ? 'text-yellow-400' 
                                      : 'text-white/70'
                                }`}>
                                  #{match.placement}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-1 text-sm">
                                <div className="text-white/60">Kills: {match.kills}</div>
                                <div className="text-white/60">Dmg: {match.damage}</div>
                                <div className="text-white/60">{dateStr}</div>
                              </div>
                            </div>
                          );
                        })}
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
        </TabsContent>
        
        <TabsContent value="maps" className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4 text-glow">Maps & Strategies</h1>
            <p className="text-white/70 mb-6">Explore BGMI maps and get detailed strategic information for each location.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="bg-bgmi-dark border border-bgmi-blue/20 shadow-[0_0_15px_rgba(0,255,255,0.1)] h-full">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Map className="h-5 w-5 text-bgmi-blue" />
                    Available Maps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {maps.map((map) => (
                    <Button
                      key={map.id}
                      variant={selectedMapId === map.id ? "default" : "outline"}
                      className={`w-full justify-start ${
                        selectedMapId === map.id 
                          ? 'bg-bgmi-blue text-white' 
                          : 'bg-transparent border-bgmi-blue/30 text-white'
                      }`}
                      onClick={() => setSelectedMapId(map.id)}
                    >
                      {map.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              {mapLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="h-12 w-12 animate-spin text-bgmi-blue" />
                </div>
              ) : selectedMap ? (
                <div className="space-y-6">
                  <Card className="bg-bgmi-dark border border-bgmi-blue/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                    <div className="aspect-video w-full relative overflow-hidden rounded-t-lg">
                      <img 
                        src={selectedMap.imageUrl} 
                        alt={selectedMap.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bgmi-dark to-transparent p-4">
                        <h2 className="text-2xl font-bold text-white">{selectedMap.name}</h2>
                        <div className="flex gap-2 text-white/80 text-sm">
                          <span>{selectedMap.size} km</span>
                          <span>•</span>
                          <span>{selectedMap.type}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-white/80">{selectedMap.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-bgmi-darker p-3 rounded-lg">
                          <h3 className="text-bgmi-blue font-medium mb-2">Hot Drop Locations</h3>
                          <ul className="list-disc pl-5 text-white/80 space-y-1">
                            {selectedMap.hotDropLocations.map((location, index) => (
                              <li key={index}>{location}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-bgmi-darker p-3 rounded-lg">
                          <h3 className="text-bgmi-blue font-medium mb-2">High Loot Zones</h3>
                          <ul className="list-disc pl-5 text-white/80 space-y-1">
                            {selectedMap.highLootZones.map((zone, index) => (
                              <li key={index}>{zone}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-bgmi-dark border border-bgmi-blue/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                    <CardHeader>
                      <CardTitle className="text-white">Strategic Analysis</CardTitle>
                      <CardDescription className="text-white/60">
                        AI-powered map strategy and tactical advice
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {mapAnalysis ? (
                        <Accordion type="single" collapsible className="bg-bgmi-darker rounded-lg">
                          <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="px-4 py-2 text-white hover:text-bgmi-blue">
                              Drop Locations & Loot
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-0 text-white/80">
                              {mapAnalysis.split('\n\n').slice(0, 2).join('\n\n')}
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2" className="border-b-0">
                            <AccordionTrigger className="px-4 py-2 text-white hover:text-bgmi-blue">
                              Rotation Strategies
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-0 text-white/80">
                              {mapAnalysis.split('\n\n').slice(2, 4).join('\n\n')}
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3" className="border-b-0">
                            <AccordionTrigger className="px-4 py-2 text-white hover:text-bgmi-blue">
                              Final Circle Tactics
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-0 text-white/80">
                              {mapAnalysis.split('\n\n').slice(4, 6).join('\n\n')}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <div className="flex justify-center items-center py-16">
                          <p className="text-white/60">Analysis will appear here after loading...</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p className="text-white/60">Select a map to view details</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerAnalysis;
