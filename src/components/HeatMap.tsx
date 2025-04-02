
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HeatMap = () => {
  const [selectedMap, setSelectedMap] = useState("erangel");
  
  const mapImages = {
    erangel: "https://media.discordapp.net/attachments/1232390066248175647/1232390249582788688/erangel-heatmap.jpg?ex=662d3be6&is=662bea66&hm=8e03c94845c7fd407dfb87ef55e5f4a75c3c3b4afac98abce73dc371c8732881&=&format=webp&quality=lossless&width=671&height=671",
    miramar: "https://media.discordapp.net/attachments/1232390066248175647/1232390249909940345/miramar-heatmap.jpg?ex=662d3be6&is=662bea66&hm=1e3b5bcbde654a3db25efb29f51e0d83c54a22b2b5e3cf2af1ffd7d3ef5b5d4e&=&format=webp&quality=lossless&width=671&height=671",
    sanhok: "https://media.discordapp.net/attachments/1232390066248175647/1232390250316787833/sanhok-heatmap.jpg?ex=662d3be6&is=662bea66&hm=5abd7d95d8db18bba06a3cc7f0702fea3f98adba6b72d7a1a8d4bc7db4a56d5e&=&format=webp&quality=lossless&width=671&height=671",
    vikendi: "https://media.discordapp.net/attachments/1232390066248175647/1232390250731458630/vikendi-heatmap.jpg?ex=662d3be6&is=662bea66&hm=a92f11bcf151f06d2e04deeb4f24b42c7baec1e835c40a44c9bb9a21ae64c9fb&=&format=webp&quality=lossless&width=671&height=671"
  };
  
  return (
    <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Drop Location Heatmaps</h2>
      
      <div className="mb-6">
        <p className="text-white/70 mb-3">Select a map to view popular landing spots and high-traffic areas</p>
        <Select value={selectedMap} onValueChange={setSelectedMap}>
          <SelectTrigger className="w-full md:w-[200px] bg-bgmi-darker border-bgmi-blue/30">
            <SelectValue placeholder="Select a map" />
          </SelectTrigger>
          <SelectContent className="bg-bgmi-darker border-bgmi-blue/30">
            <SelectItem value="erangel">Erangel</SelectItem>
            <SelectItem value="miramar">Miramar</SelectItem>
            <SelectItem value="sanhok">Sanhok</SelectItem>
            <SelectItem value="vikendi">Vikendi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
          <img 
            src={mapImages[selectedMap as keyof typeof mapImages]} 
            alt={`${selectedMap} heatmap`} 
            className="w-full h-auto rounded border border-bgmi-blue/20"
          />
          <p className="text-xs text-white/50 mt-2 text-center">Heatmap showing drop frequency and player density</p>
        </div>
        
        <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
          <h3 className="text-bgmi-blue font-medium mb-3">Recommended Drop Locations</h3>
          
          {selectedMap === "erangel" && (
            <div className="space-y-3">
              <div className="border-b border-bgmi-blue/10 pb-2">
                <p className="text-white font-medium">Military Base</p>
                <p className="text-white/70 text-sm">High-tier loot, high risk. Popular for skilled players.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-bgmi-blue/10 pb-2">
                <p className="text-white font-medium">Pochinki</p>
                <p className="text-white/70 text-sm">Central location with good loot. Great for early fights.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-white font-medium">Georgopol</p>
                <p className="text-white/70 text-sm">Excellent loot in the containers. Good for squad play.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedMap === "miramar" && (
            <div className="space-y-3">
              <div className="border-b border-bgmi-blue/10 pb-2">
                <p className="text-white font-medium">Hacienda del Patron</p>
                <p className="text-white/70 text-sm">Luxury estate with top-tier loot. High-risk, high-reward.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-bgmi-blue/10 pb-2">
                <p className="text-white font-medium">Los Leones</p>
                <p className="text-white/70 text-sm">Urban area with consistent loot. Good for methodical players.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-white font-medium">San Martin</p>
                <p className="text-white/70 text-sm">Mid-size town with balanced risk-reward ratio.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedMap === "sanhok" && (
            <div className="space-y-3">
              <div className="border-b border-bgmi-blue/10 pb-2">
                <p className="text-white font-medium">Paradise Resort</p>
                <p className="text-white/70 text-sm">Central resort with excellent loot. Very high traffic area.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-bgmi-blue/10 pb-2">
                <p className="text-white font-medium">Boot Camp</p>
                <p className="text-white/70 text-sm">Military training facility with concentrated high-tier loot.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-white font-medium">Ruins</p>
                <p className="text-white/70 text-sm">Ancient temple with decent loot and defensive positions.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedMap === "vikendi" && (
            <div className="space-y-3">
              <div className="border-b border-bgmi-blue/10 pb-2">
                <p className="text-white font-medium">Castle</p>
                <p className="text-white/70 text-sm">Historic fortress with excellent loot distribution.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-bgmi-blue/10 pb-2">
                <p className="text-white font-medium">Dino Park</p>
                <p className="text-white/70 text-sm">Unique location with moderate loot and interesting terrain.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-white font-medium">Goroka</p>
                <p className="text-white/70 text-sm">Cement factory with good loot density and cover options.</p>
                <div className="flex mt-1">
                  <div className="mr-4">
                    <span className="text-xs text-white/50">Loot Quality</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-bgmi-blue rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-white/50">Risk Level</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-red-500 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                      <div className="h-1.5 w-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
