
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import StatsCard from '@/components/StatsCard';
import RecommendationsCard from '@/components/RecommendationsCard';
import LoginModal from '@/components/LoginModal';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [questionsLeft, setQuestionsLeft] = useState<number>(10);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setQuestionsLeft(Infinity);
    toast({
      title: "Login Successful",
      description: "You now have unlimited access to BGMI Buddy!",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onLoginClick={handleLoginClick} 
        questionsLeft={isLoggedIn ? undefined : questionsLeft} 
      />
      
      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface - Takes 2/3 of the screen on desktop */}
          <div className="lg:col-span-2 h-[calc(100vh-180px)]">
            <ChatInterface 
              questionsLeft={questionsLeft} 
              isLoggedIn={isLoggedIn}
              onLoginRequest={handleLoginClick}
            />
          </div>
          
          {/* Stats & Recommendations - Takes 1/3 of the screen on desktop */}
          <div className="space-y-6">
            <StatsCard />
            <RecommendationsCard />
          </div>
        </div>
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
