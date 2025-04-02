
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Gift, Trophy, Star, Award, ShieldCheck } from 'lucide-react';

const RewardsSystem = () => {
  const [currentPoints, setCurrentPoints] = useState(350);
  const totalPointsNeeded = 1000;
  const progressPercentage = (currentPoints / totalPointsNeeded) * 100;
  
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  
  const rewards = [
    { id: 'daily_login', title: 'Daily Login', points: 10, description: 'Log in daily to earn points', icon: <ShieldCheck className="h-4 w-4 text-bgmi-blue" /> },
    { id: 'weapon_guide', title: 'Weapon Guide', points: 100, description: 'Unlock exclusive weapon guide', icon: <Star className="h-4 w-4 text-bgmi-blue" /> },
    { id: 'premium_skin', title: 'Premium Skin', points: 350, description: 'Claim a premium skin code', icon: <Award className="h-4 w-4 text-bgmi-blue" /> },
    { id: 'season_pass', title: 'Season Pass', points: 1000, description: 'Get a free season pass', icon: <Trophy className="h-4 w-4 text-bgmi-purple" /> },
  ];
  
  const handleClaimReward = (id: string, points: number) => {
    if (!claimedRewards.includes(id) && currentPoints >= points) {
      setClaimedRewards([...claimedRewards, id]);
    }
  };
  
  const getRank = (points: number) => {
    if (points < 100) return 'Bronze';
    if (points < 300) return 'Silver';
    if (points < 600) return 'Gold';
    if (points < 1000) return 'Platinum';
    return 'Diamond';
  };
  
  return (
    <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Gift className="h-5 w-5 text-bgmi-blue" />
        Rewards System
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-bgmi-darker p-5 rounded-lg border border-bgmi-blue/20">
          <div className="text-center mb-4">
            <h3 className="text-white font-medium">Your Points</h3>
            <p className="text-2xl font-bold text-bgmi-blue">{currentPoints}</p>
            <p className="text-white/70 text-sm">Rank: {getRank(currentPoints)}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/70">
              <span>Progress to Next Rank</span>
              <span>{currentPoints}/{totalPointsNeeded}</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-bgmi-dark/50"
            />
          </div>
          
          <div className="mt-6 space-y-4">
            <h4 className="text-white font-medium mb-2">Earn Points</h4>
            <div className="space-y-2">
              {[
                { action: "Daily Login", points: 10 },
                { action: "Complete a Match", points: 15 },
                { action: "Win a Match", points: 25 },
                { action: "Share on Social", points: 20 },
                { action: "Invite a Friend", points: 50 }
              ].map((item) => (
                <div key={item.action} className="flex justify-between bg-bgmi-dark p-2 rounded border border-bgmi-blue/10">
                  <p className="text-white/90 text-sm">{item.action}</p>
                  <p className="text-bgmi-blue text-sm font-medium">+{item.points}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 bg-bgmi-darker p-5 rounded-lg border border-bgmi-blue/20">
          <h3 className="text-white font-medium mb-4">Available Rewards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => {
              const isAvailable = currentPoints >= reward.points;
              const isClaimed = claimedRewards.includes(reward.id);
              
              return (
                <div 
                  key={reward.id} 
                  className={`bg-bgmi-dark p-4 rounded-lg border ${
                    isClaimed ? 'border-green-500/30' : isAvailable ? 'border-bgmi-blue/30' : 'border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      {reward.icon}
                      <h4 className="text-white font-medium">{reward.title}</h4>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-bgmi-dark/50 border border-bgmi-blue/20">
                      {reward.points} pts
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{reward.description}</p>
                  <Button
                    variant={isClaimed ? "outline" : "default"}
                    size="sm"
                    className={`w-full ${
                      isClaimed 
                        ? 'border-green-500/30 text-green-500 hover:bg-green-500/10' 
                        : isAvailable 
                          ? 'neon-button' 
                          : 'bg-bgmi-dark/50 text-white/50 border-white/10 cursor-not-allowed'
                    }`}
                    disabled={!isAvailable || isClaimed}
                    onClick={() => handleClaimReward(reward.id, reward.points)}
                  >
                    {isClaimed ? 'Claimed' : isAvailable ? 'Claim Reward' : 'Locked'}
                  </Button>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 bg-bgmi-dark/50 p-4 rounded-md border border-bgmi-blue/10">
            <h4 className="text-white font-medium mb-2">Leaderboard</h4>
            <div className="space-y-2">
              {[
                { rank: 1, name: "ProGamer123", points: 1520 },
                { rank: 2, name: "SniperElite", points: 1320 },
                { rank: 3, name: "BattleMaster", points: 1150 },
                { rank: 4, name: "TacticalPlayer", points: 980 },
                { rank: 5, name: "ShroudFan", points: 920 }
              ].map((player) => (
                <div key={player.rank} className="flex justify-between items-center bg-bgmi-dark p-2 rounded border border-bgmi-blue/10">
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs
                      ${player.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                        player.rank === 2 ? 'bg-gray-400/20 text-gray-400' : 
                        player.rank === 3 ? 'bg-amber-700/20 text-amber-700' : 'bg-bgmi-blue/20 text-bgmi-blue'
                      }`}>
                      {player.rank}
                    </span>
                    <p className="text-white text-sm">{player.name}</p>
                  </div>
                  <p className="text-bgmi-blue text-sm font-medium">{player.points}</p>
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
