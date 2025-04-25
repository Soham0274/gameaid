import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

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
    
    if (isLoggedIn) {
      baseTabs.push({ id: 'profile', label: 'Profile' });
    }
    
    return baseTabs;
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 text-primary md:hidden" />
          <div className="flex items-center gap-1">
            <span className="font-bold text-2xl text-foreground">Game</span>
            <span className="font-bold text-2xl text-primary">Aid</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-4 overflow-x-auto">
          {getNavTabs().map(tab => (
            <button 
              key={tab.id}
              className={cn(
                "text-sm font-medium transition-all duration-300 px-3 py-2 rounded-md",
                activeTab === tab.id 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search stats, weapons..."
              className="bg-background border rounded-full h-9 w-[200px] pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {!isLoggedIn && questionsLeft !== undefined && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium text-primary">{questionsLeft}</span> questions left
            </div>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => onTabChange('profile')}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              className="bg-primary hover:bg-primary/90 text-white" 
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
