
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
import { Lock } from 'lucide-react';

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
      if (!isLoggedIn && event.detail !== 'dashboard') {
        // Prevent navigating to other tabs if not logged in
        handleLoginClick();
        return;
      }
      setActiveTab(event.detail);
    };
    
    document.addEventListener('discordStatus', handleDiscordStatus as EventListener);
    document.addEventListener('navigateToTab', handleTabNavigation as EventListener);
    
    return () => {
      document.removeEventListener('discordStatus', handleDiscordStatus as EventListener);
      document.removeEventListener('navigateToTab', handleTabNavigation as EventListener);
    };
  }, [toast, isLoggedIn]);

  const renderLockedFeatureMessage = (featureName: string) => {
    return (
      <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
        <div className="flex items-center justify-center flex-col py-12">
          <Lock className="h-12 w-12 text-bgmi-blue mb-4 animate-pulse" />
          <h2 className="text-xl font-bold text-white mb-4 text-glow">{featureName}</h2>
          <p className="text-white/70 mb-6 text-center">This feature is available exclusively for logged-in users.</p>
          <Button 
            onClick={handleLoginClick} 
            className="neon-button"
          >
            Login to Access
          </Button>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    // Always allow dashboard access (with chat)
    if (activeTab === 'dashboard') {
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
            {isLoggedIn ? (
              <>
                <StatsCard />
                <RecommendationsCard />
              </>
            ) : (
              <div className="bg-bgmi-dark p-6 border border-bgmi-blue/20 rounded-lg">
                <h3 className="text-white font-medium mb-3">Premium Features</h3>
                <p className="text-white/70 mb-4">Log in to unlock all GameAid features:</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-white/70">
                    <span className="h-2 w-2 rounded-full bg-bgmi-blue mr-2"></span>
                    Detailed gameplay statistics
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="h-2 w-2 rounded-full bg-bgmi-blue mr-2"></span>
                    Custom weapon recommendations
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="h-2 w-2 rounded-full bg-bgmi-blue mr-2"></span>
                    Heatmaps and drop location guides
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="h-2 w-2 rounded-full bg-bgmi-blue mr-2"></span>
                    Discord integration
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="h-2 w-2 rounded-full bg-bgmi-blue mr-2"></span>
                    Unlimited AI assistant questions
                  </li>
                </ul>
                <Button 
                  onClick={handleLoginClick} 
                  className="neon-button w-full"
                >
                  Login Now
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // For all other tabs, check if logged in
    if (!isLoggedIn) {
      return renderLockedFeatureMessage(activeTab.charAt(0).toUpperCase() + activeTab.slice(1));
    }
    
    // If logged in, show the appropriate tab content
    switch (activeTab) {
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
        return <WeaponsDatabase isLoggedIn={isLoggedIn} onLoginRequest={handleLoginClick} />;
      case 'heatmap':
        return <HeatMap isLoggedIn={isLoggedIn} onLoginRequest={handleLoginClick} />;
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
        return <ProfilePage />;
      default:
        return null;
    }
  };
  
  useEffect(() => {
    if (!isLoggedIn && activeTab !== 'dashboard') {
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
        onTabChange={(tab) => {
          if (!isLoggedIn && tab !== 'dashboard') {
            handleLoginClick();
          } else {
            setActiveTab(tab);
          }
        }}
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
