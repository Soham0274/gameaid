
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface HeatMapProps {
  isLoggedIn?: boolean;
  onLoginRequest?: () => void;
}

const HeatMap: React.FC<HeatMapProps> = ({ 
  isLoggedIn = false, 
  onLoginRequest 
}) => {
  const [selectedMap, setSelectedMap] = useState("erangel");
  
  // Updated with direct URLs to ensure images are visible
  const mapImages = {
    erangel: "https://media.discordapp.net/attachments/1232390066248175647/1232390249582788688/erangel-heatmap.jpg",
    miramar: "https://media.discordapp.net/attachments/1232390066248175647/1232390249909940345/miramar-heatmap.jpg",
    sanhok: "https://media.discordapp.net/attachments/1232390066248175647/1232390250316787833/sanhok-heatmap.jpg",
    vikendi: "https://media.discordapp.net/attachments/1232390066248175647/1232390250731458630/vikendi-heatmap.jpg"
  };
  
  // Location data for each map
  const mapLocations = {
    erangel: [
      { name: "Military Base", loot: 3, risk: 4, description: "High-tier loot, high risk. Popular for skilled players." },
      { name: "Pochinki", loot: 3, risk: 3, description: "Central location with good loot. Great for early fights." },
      { name: "Georgopol", loot: 4, risk: 3, description: "Excellent loot in the containers. Good for squad play." },
      { name: "School", loot: 3, risk: 5, description: "Dense building with high-tier loot. Extremely contested." },
      { name: "Mansion", loot: 2, risk: 2, description: "Moderate loot with lower player traffic." }
    ],
    miramar: [
      { name: "Hacienda del Patron", loot: 4, risk: 5, description: "Luxury estate with top-tier loot. High-risk, high-reward." },
      { name: "Los Leones", loot: 3, risk: 3, description: "Urban area with consistent loot. Good for methodical players." },
      { name: "San Martin", loot: 2, risk: 2, description: "Mid-size town with balanced risk-reward ratio." },
      { name: "El Pozo", loot: 3, risk: 2, description: "Spread-out town with good vehicle spawns." },
      { name: "Pecado", loot: 4, risk: 4, description: "Densely packed city with excellent loot. High traffic area." }
    ],
    sanhok: [
      { name: "Paradise Resort", loot: 4, risk: 5, description: "Central resort with excellent loot. Very high traffic area." },
      { name: "Boot Camp", loot: 5, risk: 5, description: "Military training facility with concentrated high-tier loot." },
      { name: "Ruins", loot: 3, risk: 3, description: "Ancient temple with decent loot and defensive positions." },
      { name: "Pai Nan", loot: 3, risk: 2, description: "Riverside village with moderate loot and good rotation options." },
      { name: "Quarry", loot: 2, risk: 1, description: "Open area with sparse loot but usually safe from early fights." }
    ],
    vikendi: [
      { name: "Castle", loot: 4, risk: 4, description: "Historic fortress with excellent loot distribution." },
      { name: "Dino Park", loot: 2, risk: 2, description: "Unique location with moderate loot and interesting terrain." },
      { name: "Goroka", loot: 3, risk: 3, description: "Cement factory with good loot density and cover options." },
      { name: "Cosmodrome", loot: 4, risk: 3, description: "Abandoned space facility with high-tier loot and vehicles." },
      { name: "Villa", loot: 3, risk: 2, description: "Luxury residence with moderate traffic and decent loot." }
    ]
  };
  
  // Helper function to render rating bars
  const renderRatingBars = (rating: number, type: 'loot' | 'risk') => {
    const color = type === 'loot' ? 'bg-bgmi-blue' : 'bg-red-500';
    return (
      <div className="flex items-center space-x-1 mt-1">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index} 
            className={`h-1.5 w-5 ${index < rating ? color : 'bg-white/20'} rounded-sm`}
          />
        ))}
      </div>
    );
  };
  
  if (!isLoggedIn) {
    return (
      <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
        <div className="flex items-center justify-center flex-col py-12">
          <h2 className="text-xl font-bold text-white mb-4 text-glow">Drop Location Heatmaps</h2>
          <p className="text-white/70 mb-6 text-center">Please log in to access the heatmap feature.</p>
          <Button 
            onClick={onLoginRequest} 
            className="neon-button"
          >
            <User className="h-4 w-4 mr-2" />
            Login to Access
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4 text-glow">Drop Location Heatmaps</h2>
      
      <div className="mb-6">
        <p className="text-white mb-3 bg-bgmi-darker px-3 py-1 rounded-md inline-block">Select a map to view popular landing spots and high-traffic areas</p>
        <Select value={selectedMap} onValueChange={setSelectedMap}>
          <SelectTrigger className="w-full md:w-[200px] bg-bgmi-darker border-bgmi-blue/30 text-white">
            <SelectValue placeholder="Select a map" />
          </SelectTrigger>
          <SelectContent className="bg-bgmi-darker border-bgmi-blue/30">
            <SelectItem value="erangel" className="text-white">Erangel</SelectItem>
            <SelectItem value="miramar" className="text-white">Miramar</SelectItem>
            <SelectItem value="sanhok" className="text-white">Sanhok</SelectItem>
            <SelectItem value="vikendi" className="text-white">Vikendi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20 transition-all duration-300 hover:border-bgmi-blue/50">
          {/* Added specific width/height, alt text and error handling for images */}
          <img 
            src={mapImages[selectedMap as keyof typeof mapImages]} 
            alt={`${selectedMap.charAt(0).toUpperCase() + selectedMap.slice(1)} heatmap`} 
            className="w-full h-auto rounded border border-bgmi-blue/20"
            width="671"
            height="671"
            onError={(e) => {
              console.error(`Failed to load image for ${selectedMap}`);
              e.currentTarget.src = "https://placehold.co/671x671/0f172a/4d7fea?text=Map+Image+Unavailable";
            }}
          />
          <p className="text-xs text-white mt-2 text-center bg-bgmi-dark px-2 py-1 rounded">Heatmap showing drop frequency and player density</p>
        </div>
        
        <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
          <h3 className="text-bgmi-blue font-medium mb-3 text-glow">Recommended Drop Locations</h3>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-bgmi-blue/30 scrollbar-track-bgmi-darker">
            {mapLocations[selectedMap as keyof typeof mapLocations].map((location, index) => (
              <div key={index} className="border-b border-bgmi-blue/10 pb-3 mb-3 last:border-b-0 last:mb-0 last:pb-0 bg-gradient-to-r from-bgmi-dark to-transparent p-3 rounded-md hover:from-bgmi-dark/80 hover:to-bgmi-darker/80 transition-all duration-200">
                <p className="text-white font-medium">{location.name}</p>
                <p className="text-white text-sm bg-bgmi-dark/50 p-1 rounded mt-1">{location.description}</p>
                <div className="flex mt-2">
                  <div className="mr-4">
                    <span className="text-xs text-white bg-bgmi-darker px-2 py-0.5 rounded">Loot Quality</span>
                    {renderRatingBars(location.loot, 'loot')}
                  </div>
                  <div>
                    <span className="text-xs text-white bg-bgmi-darker px-2 py-0.5 rounded">Risk Level</span>
                    {renderRatingBars(location.risk, 'risk')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
