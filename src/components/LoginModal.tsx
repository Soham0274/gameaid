
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, UserPlus, LogIn } from 'lucide-react';
import { userDatabaseService } from '@/services/userDatabaseService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    gameId: '',
  });
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would authenticate the user here
    // For demo purposes, we'll just save the login data
    userDatabaseService.saveUser({
      username: loginData.email.split('@')[0],
      email: loginData.email,
    });
    
    onSuccess();
    onClose();
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would create a new user account here
    // For demo purposes, we'll just save the registration data
    userDatabaseService.saveUser({
      username: registerData.name,
      email: registerData.email,
      gameId: registerData.gameId,
      linkedAccounts: {
        discord: false,
        facebook: false,
        google: false,
      }
    });
    
    onSuccess();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-bgmi-dark border border-bgmi-blue/30 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            <span className="text-glow text-bgmi-blue">GameAid</span>
            <Button variant="ghost" className="h-6 w-6 p-0" onClick={onClose}>
              <X className="h-4 w-4 text-white/70" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Join now for unlimited AI-powered game insights!
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-bgmi-darker border border-bgmi-blue/20">
            <TabsTrigger value="login" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-bgmi-blue/10 data-[state=active]:text-bgmi-blue">
              Register
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-bgmi-darker border-bgmi-blue/30 text-white" 
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  className="bg-bgmi-darker border-bgmi-blue/30 text-white" 
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required 
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <a href="#" className="text-bgmi-blue hover:underline">Forgot password?</a>
              </div>
              <Button type="submit" className="w-full neon-button flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name" className="text-white">Name</Label>
                <Input 
                  id="reg-name" 
                  placeholder="Your name" 
                  className="bg-bgmi-darker border-bgmi-blue/30 text-white" 
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-white">Email</Label>
                <Input 
                  id="reg-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-bgmi-darker border-bgmi-blue/30 text-white" 
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-white">Password</Label>
                <Input 
                  id="reg-password" 
                  type="password" 
                  className="bg-bgmi-darker border-bgmi-blue/30 text-white" 
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="game-id" className="text-white">Game ID (Optional)</Label>
                <Input 
                  id="game-id" 
                  placeholder="Your Game ID" 
                  className="bg-bgmi-darker border-bgmi-blue/30 text-white" 
                  value={registerData.gameId}
                  onChange={(e) => setRegisterData({...registerData, gameId: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full neon-button flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 pt-4 border-t border-bgmi-blue/20 text-center text-xs text-white/60">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
