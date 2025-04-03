import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Star, Award, Trophy } from 'lucide-react';
import { Reward } from './types';

interface RewardsGridProps {
  rewards: Reward[];
  currentPoints: number;
  claimedRewards: string[];
  onClaimReward: (id: string, points: number) => void;
}

const RewardsGrid: React.FC<RewardsGridProps> = ({
  rewards,
  currentPoints,
  claimedRewards,
  onClaimReward
}) => {
  const getIconForReward = (iconType: Reward['iconType']) => {
    switch (iconType) {
      case 'shield':
        return <ShieldCheck className="h-4 w-4 text-bgmi-blue" />;
      case 'star':
        return <Star className="h-4 w-4 text-bgmi-blue" />;
      case 'award':
        return <Award className="h-4 w-4 text-bgmi-blue" />;
      case 'trophy':
        return <Trophy className="h-4 w-4 text-bgmi-purple" />;
      default:
        return <Star className="h-4 w-4 text-bgmi-blue" />;
    }
  };

  return (
    <>
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
                  {getIconForReward(reward.iconType)}
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
                onClick={() => onClaimReward(reward.id, reward.points)}
              >
                {isClaimed ? 'Claimed' : isAvailable ? 'Claim Reward' : 'Locked'}
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RewardsGrid;
