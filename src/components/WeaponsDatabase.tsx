
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import weapons, { getWeaponsByType, getAllWeaponTypes, Weapon } from '@/data/weapons';

interface WeaponsDatabaseProps {
  isLoggedIn?: boolean;
  onLoginRequest?: () => void;
}

const WeaponsDatabase: React.FC<WeaponsDatabaseProps> = ({ 
  isLoggedIn = false,
  onLoginRequest
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'damage'>('name');
  const weaponTypes = getAllWeaponTypes();
  
  const renderWeaponCard = (weapon: Weapon) => {
    return (
      <div key={weapon.id} className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20 hover:border-bgmi-blue/50 transition-all duration-300">
        <h3 className="text-white font-medium mb-1 bg-bgmi-dark px-2 py-1 rounded">{weapon.name}</h3>
        <p className="text-white/70 text-sm">{weapon.description}</p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <p className="text-xs text-white/50 bg-bgmi-dark px-1 py-0.5 rounded">Damage</p>
            <p className="text-white">{weapon.damage}</p>
          </div>
          <div>
            <p className="text-xs text-white/50 bg-bgmi-dark px-1 py-0.5 rounded">Fire Rate</p>
            <p className="text-white">{weapon.fireRate}</p>
          </div>
          <div>
            <p className="text-xs text-white/50 bg-bgmi-dark px-1 py-0.5 rounded">Recoil</p>
            <p className="text-white">{weapon.recoil}</p>
          </div>
          <div>
            <p className="text-xs text-white/50 bg-bgmi-dark px-1 py-0.5 rounded">Range</p>
            <p className="text-white">{weapon.range}</p>
          </div>
        </div>
      </div>
    );
  };
  
  const filterAndSortWeapons = (typeFilter: Weapon['type'] | 'All') => {
    let filteredWeapons = typeFilter === 'All' 
      ? weapons 
      : getWeaponsByType(typeFilter);
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredWeapons = filteredWeapons.filter(
        weapon => weapon.name.toLowerCase().includes(query) || 
                  weapon.description.toLowerCase().includes(query)
      );
    }
    
    // Sort weapons
    return [...filteredWeapons].sort((a, b) => {
      if (sortBy === 'damage') {
        return b.damage - a.damage;
      }
      return a.name.localeCompare(b.name);
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
        <div className="flex items-center justify-center flex-col py-12">
          <h2 className="text-xl font-bold text-white mb-4 text-glow">Weapons Database</h2>
          <p className="text-white/70 mb-6 text-center">Please log in to access the weapons database.</p>
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
      <h2 className="text-xl font-bold text-white mb-4 text-glow">Weapons Database</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input 
            placeholder="Search weapons..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-bgmi-darker border-bgmi-blue/30 text-white placeholder:text-white/50"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'name' | 'damage')}>
            <SelectTrigger className="bg-bgmi-darker border-bgmi-blue/30 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-bgmi-darker border-bgmi-blue/30">
              <SelectItem value="name" className="text-white">Name</SelectItem>
              <SelectItem value="damage" className="text-white">Damage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap bg-bgmi-darker py-1 px-1 mb-4 border border-bgmi-blue/20">
          <TabsTrigger 
            value="All" 
            className="data-[state=active]:bg-bgmi-blue/20 data-[state=active]:text-white text-white/70 flex-shrink-0"
          >
            All
          </TabsTrigger>
          {weaponTypes.map(type => (
            <TabsTrigger 
              key={type} 
              value={type} 
              className="data-[state=active]:bg-bgmi-blue/20 data-[state=active]:text-white text-white/70 flex-shrink-0"
            >
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="All" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterAndSortWeapons('All').map(renderWeaponCard)}
          </div>
        </TabsContent>
        
        {weaponTypes.map(type => (
          <TabsContent key={type} value={type} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterAndSortWeapons(type).map(renderWeaponCard)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WeaponsDatabase;
