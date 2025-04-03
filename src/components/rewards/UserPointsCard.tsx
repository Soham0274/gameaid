
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck } from 'lucide-react';
import PointEarningActions from './PointEarningActions';

interface UserPointsCardProps {
  currentPoints: number;
  totalPointsNeeded: number;
}

const UserPointsCard: React.FC<UserPointsCardProps> = ({ 
  currentPoints, 
  totalPointsNeeded 
}) => {
  const progressPercentage = (currentPoints / totalPointsNeeded) * 100;
  
  const getRank = (points: number) => {
    if (points < 100) return 'Bronze';
    if (points < 300) return 'Silver';
    if (points < 600) return 'Gold';
    if (points < 1000) return 'Platinum';
    return 'Diamond';
  };

  return (
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
      
      <PointEarningActions />
    </div>
  );
};

export default UserPointsCard;
