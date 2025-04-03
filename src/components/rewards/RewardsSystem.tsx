
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Gift, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserPointsCard from './UserPointsCard';
import RewardsGrid from './RewardsGrid';
import LeaderboardSection from './LeaderboardSection';
import { Reward } from './types';

interface RewardsSystemProps {
  isDiscordLinked?: boolean;
}

const RewardsSystem: React.FC<RewardsSystemProps> = ({ isDiscordLinked = false }) => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const totalPointsNeeded = 1000;
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const { toast } = useToast();
  
  const rewards: Reward[] = [
    { id: 'daily_login', title: 'Daily Login', points: 10, description: 'Log in daily to earn points', iconType: 'shield' },
    { id: 'weapon_guide', title: 'Weapon Guide', points: 100, description: 'Unlock exclusive weapon guide', iconType: 'star' },
    { id: 'premium_skin', title: 'Premium Skin', points: 350, description: 'Claim a premium skin code', iconType: 'award' },
    { id: 'season_pass', title: 'Season Pass', points: 1000, description: 'Get a free season pass', iconType: 'trophy' },
  ];
  
  const handleClaimReward = (id: string, points: number) => {
    if (!claimedRewards.includes(id) && currentPoints >= points) {
      setClaimedRewards([...claimedRewards, id]);
      
      // Show toast notification
      toast({
        title: "Reward Claimed!",
        description: `You've claimed a reward worth ${points} points.`,
      });
    }
  };
  
  // Update progress bar when claiming rewards
  useEffect(() => {
    let totalClaimedPoints = 0;
    claimedRewards.forEach(claimedId => {
      const reward = rewards.find(r => r.id === claimedId);
      if (reward) {
        totalClaimedPoints += reward.points;
      }
    });
    
    setCurrentPoints(totalClaimedPoints);
  }, [claimedRewards]);
  
  return (
    <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Gift className="h-5 w-5 text-bgmi-blue" />
        Rewards System
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserPointsCard 
          currentPoints={currentPoints}
          totalPointsNeeded={totalPointsNeeded}
        />
        
        <div className="lg:col-span-2 bg-bgmi-darker p-5 rounded-lg border border-bgmi-blue/20">
          <RewardsGrid 
            rewards={rewards}
            currentPoints={currentPoints}
            claimedRewards={claimedRewards}
            onClaimReward={handleClaimReward}
          />
          
          {isDiscordLinked ? (
            <LeaderboardSection />
          ) : (
            <div className="mt-6 bg-bgmi-blue/5 p-4 rounded-md border border-bgmi-blue/20 text-center">
              <p className="text-white/70 mb-2">Connect your Discord account to view the leaderboard</p>
              <ConnectDiscordButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConnectDiscordButton = () => {
  const handleConnectDiscord = () => {
    // Navigate to Discord tab
    document.dispatchEvent(new CustomEvent('navigateToTab', { detail: 'discord' }));
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="text-bgmi-blue border-bgmi-blue/30"
      onClick={handleConnectDiscord}
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      Connect Discord Account
    </Button>
  );
};

export default RewardsSystem;
