
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onLoginClick: () => void;
  questionsLeft?: number;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, questionsLeft }) => {
  return (
    <header className="border-b border-bgmi-blue/20 bg-bgmi-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 text-bgmi-blue md:hidden" />
          <div className="flex items-center gap-1">
            <span className="font-bold text-2xl text-white">BGMI</span>
            <span className="font-bold text-2xl text-bgmi-blue text-glow">Buddy</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-white/70 hover:text-bgmi-blue transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-bgmi-blue transition-colors">Stats</a>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-bgmi-blue transition-colors">Guides</a>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-bgmi-blue transition-colors">Weapons</a>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-white/50" />
            <input
              type="search"
              placeholder="Search stats, weapons..."
              className="bg-bgmi-dark border border-bgmi-blue/30 rounded-md h-9 w-[200px] pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-bgmi-blue"
            />
          </div>
          
          {questionsLeft !== undefined && (
            <div className="text-xs text-white/70">
              <span className="font-medium text-bgmi-blue">{questionsLeft}</span> questions left
            </div>
          )}
          
          <Button variant="outline" className="neon-button" onClick={onLoginClick}>
            <User className="h-4 w-4 mr-2" />
            <span>Login</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
