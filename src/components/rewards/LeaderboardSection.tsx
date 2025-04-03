
import React from 'react';
import { LeaderboardPlayer } from './types';

const leaderboardPlayers: LeaderboardPlayer[] = [
  { rank: 1, name: "ProGamer123", points: 1520 },
  { rank: 2, name: "SniperElite", points: 1320 },
  { rank: 3, name: "BattleMaster", points: 1150 },
  { rank: 4, name: "TacticalPlayer", points: 980 },
  { rank: 5, name: "ShroudFan", points: 920 }
];

const LeaderboardSection: React.FC = () => {
  return (
    <div className="mt-6 bg-bgmi-dark/50 p-4 rounded-md border border-bgmi-blue/10">
      <h4 className="text-white font-medium mb-2">Leaderboard</h4>
      <div className="space-y-2">
        {leaderboardPlayers.map((player) => (
          <div 
            key={player.rank} 
            className="flex justify-between items-center bg-bgmi-dark p-2 rounded border border-bgmi-blue/10"
          >
            <div className="flex items-center gap-3">
              <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs
                ${player.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                  player.rank === 2 ? 'bg-gray-400/20 text-gray-400' : 
                  player.rank === 3 ? 'bg-amber-700/20 text-amber-700' : 'bg-bgmi-blue/20 text-bgmi-blue'
                }`}
              >
                {player.rank}
              </span>
              <p className="text-white text-sm">{player.name}</p>
            </div>
            <p className="text-bgmi-blue text-sm font-medium">{player.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardSection;
