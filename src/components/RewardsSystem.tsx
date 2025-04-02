
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Star, Users, Gift } from 'lucide-react';

const RewardsSystem = () => {
  const [userLevel, setUserLevel] = useState(3);
  const [userPoints, setUserPoints] = useState(275);
  const nextLevelPoints = 400;
  const progress = (userPoints / nextLevelPoints) * 100;
  
  const leaderboard = [
    { rank: 1, username: "ProGamer123", points: 1250, badges: 8 },
    { rank: 2, username: "SniperElite", points: 1120, badges: 7 },
    { rank: 3, username: "TacticalPlayer", points: 950, badges: 6 },
    { rank: 4, username: "StealthMode", points: 820, badges: 5 },
    { rank: 5, username: "BattleWinner", points: 710, badges: 5 },
    { rank: 6, username: "You", points: 275, badges: 3 },
    { rank: 7, username: "FragMaster", points: 240, badges: 2 },
    { rank: 8, username: "GunSlinger", points: 180, badges: 1 },
  ];
  
  const availableBadges = [
    { id: 1, name: "Sharpshooter", icon: "🎯", description: "Achieve 80% accuracy in 5 consecutive matches", earned: true },
    { id: 2, name: "Survivor", icon: "🛡️", description: "Reach top 10 in 10 consecutive matches", earned: true },
    { id: 3, name: "Demolition Expert", icon: "💣", description: "Get 5 grenade kills in a single match", earned: true },
    { id: 4, name: "Squad Leader", icon: "👑", description: "Win 5 squad matches as the team MVP", earned: false },
    { id: 5, name: "Marksman", icon: "🔫", description: "Get 10 headshot kills in a single match", earned: false },
    { id: 6, name: "Strategist", icon: "🧠", description: "Win a match without killing anyone", earned: false },
    { id: 7, name: "Vehicle Master", icon: "🚗", description: "Get 3 roadkills in a single match", earned: false },
    { id: 8, name: "Ghost", icon: "👻", description: "Win a match without taking damage", earned: false },
  ];
  
  const rewardTiers = [
    { level: 1, reward: "Basic Loadout Tips", icon: "📋", claimed: true },
    { level: 2, reward: "Early Game Strategies Guide", icon: "🗺️", claimed: true },
    { level: 3, reward: "Exclusive Weapon Stats", icon: "📊", claimed: true },
    { level: 5, reward: "Advanced Tactics Video", icon: "🎬", claimed: false },
    { level: 7, reward: "Pro Player Loadouts", icon: "⚔️", claimed: false },
    { level: 10, reward: "1-on-1 Coaching Session", icon: "👨‍🏫", claimed: false },
  ];
  
  const dailyTasks = [
    { id: 1, name: "Ask 3 questions to GameAid", points: 15, completed: true },
    { id: 2, name: "Review your match statistics", points: 10, completed: true },
    { id: 3, name: "Try a recommended loadout", points: 20, completed: false },
    { id: 4, name: "Share your stats on Discord", points: 25, completed: false },
  ];
  
  return (
    <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-bgmi-blue" />
        Rewards System
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-white/70 text-sm">Current Level</p>
                <p className="text-white font-bold text-xl">{userLevel}</p>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm">Points</p>
                <p className="text-white font-bold text-xl">{userPoints} / {nextLevelPoints}</p>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-bgmi-blue to-blue-400" />
            <p className="text-white/50 text-xs mt-2">{Math.ceil(nextLevelPoints - userPoints)} points needed for level {userLevel + 1}</p>
          </div>
          
          <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
            <h3 className="text-bgmi-blue font-medium mb-3 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Badges & Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {availableBadges.slice(0, 4).map((badge) => (
                <div key={badge.id} className={`p-3 rounded border ${badge.earned ? 'bg-bgmi-blue/10 border-bgmi-blue/30' : 'bg-white/5 border-white/10'} text-center`}>
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className={`font-medium ${badge.earned ? 'text-white' : 'text-white/50'}`}>{badge.name}</p>
                  <p className="text-xs text-white/60 mt-1">{badge.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Button variant="outline" size="sm" className="text-white/70 border-bgmi-blue/30">
                View All Badges
              </Button>
            </div>
          </div>
          
          <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
            <h3 className="text-bgmi-blue font-medium mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Daily Tasks
            </h3>
            <div className="space-y-3">
              {dailyTasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center p-3 rounded border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`h-4 w-4 rounded-full border ${task.completed ? 'bg-bgmi-blue border-bgmi-blue/30' : 'bg-transparent border-white/30'} flex items-center justify-center`}>
                      {task.completed && <div className="h-2 w-2 rounded-full bg-white"></div>}
                    </div>
                    <p className={`text-sm ${task.completed ? 'text-white/50 line-through' : 'text-white'}`}>{task.name}</p>
                  </div>
                  <div className="text-xs font-medium text-bgmi-blue">+{task.points} pts</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
            <h3 className="text-bgmi-blue font-medium mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leaderboard
            </h3>
            <div className="space-y-2">
              {leaderboard.map((player) => (
                <div 
                  key={player.rank} 
                  className={`flex justify-between items-center p-2 rounded ${player.username === "You" ? 'bg-bgmi-blue/10 border border-bgmi-blue/30' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-mono w-5 text-center ${player.rank <= 3 ? 'text-yellow-400' : 'text-white/50'}`}>
                      {player.rank}
                    </span>
                    <span className={`text-sm ${player.username === "You" ? 'text-white font-medium' : 'text-white/90'}`}>
                      {player.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/70">
                      <Trophy className="h-3 w-3 inline mr-1 text-bgmi-blue" />
                      {player.badges}
                    </span>
                    <span className="text-xs font-medium text-white">
                      {player.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
            <h3 className="text-bgmi-blue font-medium mb-3 flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Reward Tiers
            </h3>
            <div className="space-y-3">
              {rewardTiers.map((tier) => (
                <div key={tier.level} className="flex justify-between items-center p-2 rounded border border-white/10 bg-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center ${tier.level <= userLevel ? 'bg-bgmi-blue/20 text-bgmi-blue' : 'bg-white/10 text-white/30'}`}>
                      {tier.level}
                    </div>
                    <div>
                      <p className={`text-sm ${tier.level <= userLevel ? 'text-white' : 'text-white/50'}`}>
                        {tier.reward}
                      </p>
                      <p className="text-xs text-white/50">Level {tier.level} reward</p>
                    </div>
                  </div>
                  <div>
                    {tier.level <= userLevel ? (
                      tier.claimed ? (
                        <span className="text-xs text-white/50">Claimed</span>
                      ) : (
                        <Button variant="outline" size="sm" className="h-7 text-xs border-bgmi-blue/30 text-bgmi-blue hover:text-white hover:bg-bgmi-blue/20">
                          Claim
                        </Button>
                      )
                    ) : (
                      <span className="text-xs text-white/50">Locked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsSystem;
