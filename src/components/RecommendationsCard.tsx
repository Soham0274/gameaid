
import React from 'react';
import { Lightbulb, Calendar, Award } from 'lucide-react';

const RecommendationsCard: React.FC = () => {
  return (
    <div className="bgmi-card overflow-hidden">
      <div className="p-4 border-b border-bgmi-blue/20">
        <h2 className="text-lg font-semibold text-white">Recommendations</h2>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-bgmi-darker p-3 rounded-md border border-bgmi-blue/20 flex gap-3">
          <div className="bg-bgmi-blue/10 rounded-full p-2 h-fit">
            <Lightbulb className="h-4 w-4 text-bgmi-blue" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">Improve Your Recoil Control</h3>
            <p className="text-xs text-white/70 mt-1">
              Based on your stats, try lowering your ADS sensitivity by 5-10% and practicing spray patterns in training mode.
            </p>
          </div>
        </div>
        
        <div className="bg-bgmi-darker p-3 rounded-md border border-bgmi-blue/20 flex gap-3">
          <div className="bg-bgmi-blue/10 rounded-full p-2 h-fit">
            <Calendar className="h-4 w-4 text-bgmi-blue" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">Daily Practice Routine</h3>
            <p className="text-xs text-white/70 mt-1">
              Spend 15 minutes in TDM focusing on close-range fights, then 10 minutes practicing long-range sprays in training.
            </p>
          </div>
        </div>
        
        <div className="bg-bgmi-darker p-3 rounded-md border border-bgmi-blue/20 flex gap-3">
          <div className="bg-bgmi-blue/10 rounded-full p-2 h-fit">
            <Award className="h-4 w-4 text-bgmi-blue" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">Loadout Recommendation</h3>
            <p className="text-xs text-white/70 mt-1">
              Your playstyle suggests a M416 + DMR combo would improve your versatility in mid-to-long range engagements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsCard;
