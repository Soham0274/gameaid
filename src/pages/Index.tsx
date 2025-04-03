import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import StatsCard from '@/components/StatsCard';
import RecommendationsCard from '@/components/RecommendationsCard';
import LoginModal from '@/components/LoginModal';
import HeatMap from '@/components/HeatMap';
import DiscordIntegration from '@/components/DiscordIntegration';
import RewardsSystem from '@/components/RewardsSystem';
import WeaponsDatabase from '@/components/WeaponsDatabase';
import ProfilePage from '@/components/ProfilePage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [questionsLeft, setQuestionsLeft] = useState<number>(10);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isDiscordLinked, setIsDiscordLinked] = useState<boolean>(false);
  const { toast } = useToast();

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setQuestionsLeft(Infinity);
    toast({
      title: "Login Successful",
      description: "You now have unlimited access to GameAid!",
      variant: "default",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setQuestionsLeft(10);
    setIsDiscordLinked(false);
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
      variant: "default",
    });
  };
  
  useEffect(() => {
    const handleDiscordStatus = (event: CustomEvent) => {
      setIsDiscordLinked(event.detail.isLinked);
      if (event.detail.isLinked) {
        toast({
          title: "Discord Connected",
          description: "Your Discord account is now connected.",
        });
      }
    };
    
    const handleTabNavigation = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };
    
    document.addEventListener('discordStatus', handleDiscordStatus as EventListener);
    document.addEventListener('navigateToTab', handleTabNavigation as EventListener);
    
    return () => {
      document.removeEventListener('discordStatus', handleDiscordStatus as EventListener);
      document.removeEventListener('navigateToTab', handleTabNavigation as EventListener);
    };
  }, [toast]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[calc(100vh-180px)]">
              <ChatInterface 
                questionsLeft={questionsLeft} 
                isLoggedIn={isLoggedIn}
                onLoginRequest={handleLoginClick}
              />
            </div>
            
            <div className="space-y-6">
              <StatsCard />
              <RecommendationsCard />
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Player Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
                <h3 className="text-bgmi-blue font-medium mb-2">Season Performance</h3>
                <p className="text-white">K/D Ratio: <span className="text-bgmi-blue font-medium">3.2</span></p>
                <p className="text-white">Win Rate: <span className="text-bgmi-blue font-medium">12%</span></p>
                <p className="text-white">Average Damage: <span className="text-bgmi-blue font-medium">520</span></p>
                <p className="text-white">Matches Played: <span className="text-bgmi-blue font-medium">87</span></p>
              </div>
              <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
                <h3 className="text-bgmi-blue font-medium mb-2">Weapon Mastery</h3>
                <p className="text-white">Best Weapon: <span className="text-bgmi-blue font-medium">M416</span></p>
                <p className="text-white">Accuracy: <span className="text-bgmi-blue font-medium">18.5%</span></p>
                <p className="text-white">Headshot %: <span className="text-bgmi-blue font-medium">22.1%</span></p>
                <p className="text-white">Avg. Kills: <span className="text-bgmi-blue font-medium">3.8</span></p>
              </div>
              <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
                <h3 className="text-bgmi-blue font-medium mb-2">Rank Progress</h3>
                <p className="text-white">Current Rank: <span className="text-bgmi-blue font-medium">Ace</span></p>
                <p className="text-white">Points: <span className="text-bgmi-blue font-medium">4250</span></p>
                <p className="text-white">Rank Up: <span className="text-bgmi-blue font-medium">+30 needed</span></p>
                <p className="text-white">Top %: <span className="text-bgmi-blue font-medium">Top 5%</span></p>
              </div>
            </div>
          </div>
        );
      case 'guides':
        return (
          <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Game Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
                <h3 className="text-bgmi-blue font-medium mb-2">Map Strategies</h3>
                <p className="text-white mb-2">For Erangel, the best drop locations for high-tier loot are Military Base, Georgopol, and Pochinki.</p>
                <p className="text-white mb-2">For Miramar, consider dropping at Hacienda del Patron or Los Leones for good starting gear.</p>
                <p className="text-white">Always check the flight path to determine the best locations that won't be heavily contested.</p>
              </div>
              <div className="bg-bgmi-darker p-4 rounded-lg border border-bgmi-blue/20">
                <h3 className="text-bgmi-blue font-medium mb-2">Combat Tips</h3>
                <p className="text-white mb-2">Always use cover during firefights and avoid standing still.</p>
                <p className="text-white mb-2">Practice "jiggle peeking" to spot enemies without exposing yourself.</p>
                <p className="text-white">Use grenades to flush out enemies from cover or to create distractions.</p>
              </div>
            </div>
          </div>
        );
      case 'weapons':
        return <WeaponsDatabase />;
      case 'heatmap':
        return <HeatMap />;
      case 'discord': {
        const onDiscordStatusChange = (isLinked: boolean) => {
          setIsDiscordLinked(isLinked);
          document.dispatchEvent(
            new CustomEvent('discordStatus', { detail: { isLinked } })
          );
        };
        
        return (
          <div 
            className="discord-integration-container"
            onChange={() => onDiscordStatusChange(true)}
          >
            <DiscordIntegration />
          </div>
        );
      }
      case 'rewards':
        return <RewardsSystem isDiscordLinked={isDiscordLinked} />;
      case 'profile':
        return isLoggedIn ? <ProfilePage /> : (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center">
              <h3 className="text-xl text-white mb-2">Please log in to view your profile</h3>
              <Button 
                onClick={handleLoginClick} 
                className="neon-button mt-4"
              >
                Login Now
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  useEffect(() => {
    if (!isLoggedIn && activeTab === 'profile') {
      setActiveTab('dashboard');
    }
  }, [isLoggedIn, activeTab]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onLoginClick={handleLoginClick} 
        questionsLeft={isLoggedIn ? undefined : questionsLeft} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="flex-1 container py-6">
        {renderTabContent()}
      </main>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Index;
