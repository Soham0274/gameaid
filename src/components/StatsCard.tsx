
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, Trophy, Target, Crosshair } from 'lucide-react';

interface StatItemProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, change, icon }) => {
  return (
    <div className="bgmi-card p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <span className="text-white/60 text-xs">{label}</span>
        {icon && <div className="text-bgmi-blue">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-xl font-bold text-white">{value}</div>
        {change !== undefined && (
          <div className={`text-xs flex items-center ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            <ArrowUp className={`h-3 w-3 mr-1 ${change < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
};

const StatsCard: React.FC = () => {
  return (
    <div className="bgmi-card overflow-hidden">
      <div className="p-4 border-b border-bgmi-blue/20">
        <h2 className="text-lg font-semibold text-white">Performance Stats</h2>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="w-full bg-bgmi-darker border border-bgmi-blue/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">Overview</TabsTrigger>
            <TabsTrigger value="weapons" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">Weapons</TabsTrigger>
            <TabsTrigger value="maps" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">Maps</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="p-4 pt-6 grid grid-cols-2 gap-4">
          <StatItem 
            label="K/D Ratio" 
            value="2.8" 
            change={5.2} 
            icon={<Crosshair className="h-4 w-4" />} 
          />
          <StatItem 
            label="Win Rate" 
            value="18%" 
            change={2.1} 
            icon={<Trophy className="h-4 w-4" />} 
          />
          <StatItem 
            label="Headshot %" 
            value="24.5%" 
            change={-1.3} 
            icon={<Target className="h-4 w-4" />} 
          />
          <StatItem 
            label="Avg Survival" 
            value="15:42" 
            change={3.7} 
          />
        </TabsContent>
        
        <TabsContent value="weapons" className="p-4">
          <div className="space-y-4">
            <div className="bg-bgmi-darker p-3 rounded-md border border-bgmi-blue/20">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-white">M416</div>
                <div className="text-xs text-white/70">Most Used</div>
              </div>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>Accuracy</span>
                <span>18%</span>
              </div>
              <div className="w-full bg-bgmi-blue/10 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-bgmi-blue to-bgmi-purple h-1.5 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
            
            <div className="bg-bgmi-darker p-3 rounded-md border border-bgmi-blue/20">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-white">AKM</div>
                <div className="text-xs text-white/70">Second Most</div>
              </div>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>Accuracy</span>
                <span>14%</span>
              </div>
              <div className="w-full bg-bgmi-blue/10 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-bgmi-blue to-bgmi-purple h-1.5 rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="maps" className="p-4">
          <div className="space-y-4">
            <div className="bg-bgmi-darker p-3 rounded-md border border-bgmi-blue/20">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-white">Erangel</div>
                <div className="text-xs text-white/70">Win Rate: 22%</div>
              </div>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>Matches Played</span>
                <span>124</span>
              </div>
            </div>
            
            <div className="bg-bgmi-darker p-3 rounded-md border border-bgmi-blue/20">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-white">Miramar</div>
                <div className="text-xs text-white/70">Win Rate: 15%</div>
              </div>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>Matches Played</span>
                <span>82</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatsCard;
