
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, ExternalLink, Copy, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DiscordIntegration = () => {
  const [discordUsername, setDiscordUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const { toast } = useToast();
  
  const handleSendVerification = () => {
    if (!discordUsername) {
      toast({
        title: "Error",
        description: "Please enter your Discord username",
        variant: "destructive",
      });
      return;
    }
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setVerificationSent(true);
    toast({
      title: "Verification Sent",
      description: `A verification email has been sent to ${email}`,
    });
  };
  
  const handleVerifyAndLink = () => {
    setIsLinked(true);
    setVerificationSent(false);
    toast({
      title: "Success",
      description: "Your Discord account has been linked!",
    });
  };
  
  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({
      title: "Copied!",
      description: `Command "${command}" copied to clipboard`,
    });
  };
  
  const handleDisconnect = () => {
    setIsLinked(false);
    setDiscordUsername('');
    setEmail('');
    toast({
      title: "Disconnected",
      description: "Your Discord account has been unlinked",
    });
  };
  
  return (
    <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-bgmi-blue" />
        Discord Integration
      </h2>
      
      {!isLinked ? (
        <div className="bg-bgmi-darker p-5 rounded-lg border border-bgmi-blue/20 max-w-md mx-auto">
          {!verificationSent ? (
            <>
              <h3 className="text-white font-medium mb-4">Link Your Discord Account</h3>
              <p className="text-white/70 mb-4">Connect your Discord account to use GameAid commands in your server and get real-time notifications.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Discord Username</label>
                  <Input
                    placeholder="Your Discord Username#0000"
                    value={discordUsername}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                    className="bg-bgmi-dark border border-bgmi-blue/30 focus-visible:ring-bgmi-blue/50"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-bgmi-dark border border-bgmi-blue/30 focus-visible:ring-bgmi-blue/50"
                  />
                </div>
                <Button 
                  onClick={handleSendVerification} 
                  className="w-full neon-button"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Verification Email
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-white font-medium mb-4">Verify Your Email</h3>
              <div className="bg-bgmi-blue/10 border border-bgmi-blue/20 rounded-md p-4 mb-4">
                <p className="text-white/80 text-sm">
                  We've sent a verification email to <span className="text-white font-medium">{email}</span>. 
                  Please check your inbox and click the verification link.
                </p>
              </div>
              <div className="space-y-4">
                <Button 
                  onClick={handleVerifyAndLink} 
                  className="w-full neon-button"
                >
                  I've Verified My Email
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setVerificationSent(false)} 
                  className="w-full text-white/70"
                >
                  Back to Form
                </Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/70">Connected account</p>
              <p className="text-white font-medium">{discordUsername}</p>
              <p className="text-white/60 text-xs">{email}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-white/70 border-bgmi-blue/30"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </div>
          
          <div className="bg-bgmi-darker p-5 rounded-lg border border-bgmi-blue/20">
            <h3 className="text-bgmi-blue font-medium mb-3">Available Commands</h3>
            <div className="space-y-3">
              {[
                { command: "!stats [player_id]", description: "View player statistics" },
                { command: "!loadout [close|long|balanced]", description: "Get loadout recommendations" },
                { command: "!patchnotes", description: "View latest game updates" },
                { command: "!leaderboard", description: "View GameAid leaderboard" },
                { command: "!heatmap [map_name]", description: "Get drop location heatmap" }
              ].map((item) => (
                <div key={item.command} className="flex justify-between bg-bgmi-dark p-3 rounded border border-bgmi-blue/10">
                  <div>
                    <p className="text-white font-mono text-sm">{item.command}</p>
                    <p className="text-white/60 text-xs">{item.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8" 
                    onClick={() => handleCopyCommand(item.command)}
                  >
                    <Copy className="h-3.5 w-3.5 text-bgmi-blue" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="text-white border-bgmi-blue/30" asChild>
              <a href="https://discord.com/api/oauth2/authorize" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Add GameAid Bot to Server
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscordIntegration;
