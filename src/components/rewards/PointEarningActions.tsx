
import React from 'react';
import { PointEarningAction } from './types';

const pointEarningActions: PointEarningAction[] = [
  { action: "Daily Login", points: 10 },
  { action: "Complete a Match", points: 15 },
  { action: "Win a Match", points: 25 },
  { action: "Share on Social", points: 20 },
  { action: "Invite a Friend", points: 50 }
];

const PointEarningActions: React.FC = () => {
  return (
    <div className="mt-6 space-y-4">
      <h4 className="text-white font-medium mb-2">Earn Points</h4>
      <div className="space-y-2">
        {pointEarningActions.map((item) => (
          <div 
            key={item.action} 
            className="flex justify-between bg-bgmi-dark p-2 rounded border border-bgmi-blue/10"
          >
            <p className="text-white/90 text-sm">{item.action}</p>
            <p className="text-bgmi-blue text-sm font-medium">+{item.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointEarningActions;
