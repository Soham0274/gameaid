
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onLoginClick: () => void;
  questionsLeft?: number;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onLoginClick, 
  questionsLeft, 
  isLoggedIn = false,
  onLogout,
  activeTab,
  onTabChange
}) => {
  const getNavTabs = () => {
    const baseTabs = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'stats', label: 'Stats' },
      { id: 'guides', label: 'Guides' },
      { id: 'weapons', label: 'Weapons' },
      { id: 'heatmap', label: 'Heatmap' },
      { id: 'discord', label: 'Discord' },
      { id: 'rewards', label: 'Rewards' }
    ];
    
    // Add profile tab if logged in
    if (isLoggedIn) {
      baseTabs.push({ id: 'profile', label: 'Profile' });
    }
    
    return baseTabs;
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 text-blue-500 md:hidden" />
          <div className="flex items-center gap-1">
            <span className="font-bold text-2xl text-gray-800">Game</span>
            <span className="font-bold text-2xl text-blue-500">Aid</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4 overflow-x-auto">
          {getNavTabs().map(tab => (
            <button 
              key={tab.id}
              className={cn(
                "text-sm font-medium transition-colors px-1 py-1 whitespace-nowrap",
                activeTab === tab.id 
                  ? "text-blue-500 border-b-2 border-blue-500" 
                  : "text-gray-600 hover:text-blue-500"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search stats, weapons..."
              className="bg-gray-50 border border-gray-200 rounded-md h-9 w-[200px] pl-8 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          {!isLoggedIn && questionsLeft !== undefined && (
            <div className="text-xs text-gray-600">
              <span className="font-medium text-blue-500">{questionsLeft}</span> questions left
            </div>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-gray-200 text-gray-700 bg-white"
                onClick={() => onTabChange('profile')}
              >
                <User className="h-4 w-4 text-blue-500" />
                <span>Profile</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onLogout} 
                className="text-gray-600 hover:text-blue-500"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="bg-blue-500 hover:bg-blue-600 text-white transition-colors border-0" 
              onClick={onLoginClick}
            >
              <User className="h-4 w-4 mr-2" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
