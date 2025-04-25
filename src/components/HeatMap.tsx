import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface HeatMapProps {
  isLoggedIn?: boolean;
  onLoginRequest?: () => void;
}

const HeatMap: React.FC<HeatMapProps> = ({ isLoggedIn = false, onLoginRequest }) => {
  const [selectedMap, setSelectedMap] = useState("erangel");
  
  const mapImages = {
    erangel: "/lovable-uploads/875d5c20-4928-4096-8cf1-224522e15e1d.png",
    miramar: "/lovable-uploads/e54c7d20-44f8-47e3-9afc-9162b2604b6d.png",
    sanhok: "/lovable-uploads/5596262a-b0f8-4c2d-b858-60397551449d.png",
    vikendi: "/lovable-uploads/c72f41c7-c3c4-49ad-b64a-f93f278857d5.png"
  };
  
  const mapLocations = {
    erangel: [
      { name: "Military Base", loot: 5, risk: 5, description: "High-tier military loot. Popular hot drop location with excellent vehicle spawns." },
      { name: "Pochinki", loot: 4, risk: 5, description: "Central town with dense building clusters. Great for early game fights and strategic positioning." },
      { name: "School", loot: 4, risk: 5, description: "Iconic location with concentrated loot. High-risk area with multiple entry points." },
      { name: "Georgopol", loot: 4, risk: 4, description: "Large city with extensive loot opportunities in the containers and apartments." },
      { name: "Rozhok", loot: 3, risk: 3, description: "Medium-sized town with decent loot and good rotation options." },
      { name: "Yasnaya Polyana", loot: 4, risk: 4, description: "Large residential area with plenty of loot and multiple escape routes." },
      { name: "Mylta Power", loot: 4, risk: 3, description: "Power plant complex with high-tier loot and good defensive positions." },
      { name: "Novorepnoye", loot: 4, risk: 3, description: "Coastal city with military-grade loot and vehicle spawns." }
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
  
  const renderRatingBars = (rating: number, type: 'loot' | 'risk') => {
    const color = type === 'loot' ? 'bg-blue-500' : 'bg-red-500';
    return (
      <div className="flex items-center space-x-1 mt-1">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index} 
            className={`h-1.5 w-5 ${index < rating ? color : 'bg-gray-200'} rounded-sm`}
          />
        ))}
      </div>
    );
  };
  
  if (!isLoggedIn) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="flex items-center justify-center flex-col py-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Drop Location Maps</h2>
          <p className="text-gray-600 mb-6 text-center">Please log in to access the map feature.</p>
          <Button 
            onClick={onLoginRequest} 
            className="bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <User className="h-4 w-4 mr-2" />
            Login to Access
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Drop Location Maps</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-3 bg-gray-50 px-3 py-1 rounded-md inline-block">
          Select a map to view popular landing spots and high-traffic areas
        </p>
        <Select value={selectedMap} onValueChange={setSelectedMap}>
          <SelectTrigger className="w-full md:w-[200px] bg-white border-gray-200">
            <SelectValue placeholder="Select a map" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="erangel">Erangel</SelectItem>
            <SelectItem value="miramar">Miramar</SelectItem>
            <SelectItem value="sanhok">Sanhok</SelectItem>
            <SelectItem value="vikendi">Vikendi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
          <img 
            src={mapImages[selectedMap as keyof typeof mapImages]} 
            alt={`${selectedMap.charAt(0).toUpperCase() + selectedMap.slice(1)} map layout`}
            className="w-full h-auto rounded border border-gray-200"
            width="671"
            height="671"
            onError={(e) => {
              console.error(`Failed to load image for ${selectedMap}`);
              e.currentTarget.src = "https://placehold.co/671x671/f8fafc/64748b?text=Map+Image+Unavailable";
            }}
          />
          <p className="text-xs text-gray-600 mt-2 text-center bg-gray-50 px-2 py-1 rounded">
            Interactive map showing drop locations and strategic points
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-800 font-medium mb-3">Recommended Drop Locations</h3>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {mapLocations[selectedMap as keyof typeof mapLocations].map((location, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 mb-3 last:border-b-0 last:mb-0 last:pb-0 bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors">
                <p className="text-gray-800 font-medium">{location.name}</p>
                <p className="text-gray-600 text-sm mt-1">{location.description}</p>
                <div className="flex mt-2">
                  <div className="mr-4">
                    <span className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded shadow-sm">
                      Loot Quality
                    </span>
                    {renderRatingBars(location.loot, 'loot')}
                  </div>
                  <div>
                    <span className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded shadow-sm">
                      Risk Level
                    </span>
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
