
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
    userDatabaseService.saveUser({
      username: loginData.email.split('@')[0],
      email: loginData.email,
    });
    onSuccess();
    onClose();
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <DialogContent className="bg-card border border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-gradient-primary font-bold text-xl">GameAid</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Join now for unlimited AI-powered game insights!
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required 
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </div>
              <Button type="submit" className="w-full flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Name</Label>
                <Input 
                  id="reg-name" 
                  placeholder="Your name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input 
                  id="reg-email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input 
                  id="reg-password" 
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="game-id">Game ID (Optional)</Label>
                <Input 
                  id="game-id" 
                  placeholder="Your Game ID"
                  value={registerData.gameId}
                  onChange={(e) => setRegisterData({...registerData, gameId: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 pt-4 border-t border-border/20 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
