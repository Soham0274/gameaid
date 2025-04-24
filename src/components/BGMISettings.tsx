
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { userDatabaseService } from '@/services/userDatabaseService';
import { bgmiService } from '@/services/bgmiService';

const BGMISettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [testing, setTesting] = useState(false);
  const { toast } = useToast();

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid API key',
        variant: 'destructive',
      });
      return;
    }

    setTesting(true);
    try {
      // Test the API key by making a sample request
      await bgmiService.testApiKey(apiKey);
      
      // If successful, save the API key
      userDatabaseService.updateUserData('player@example.com', {
        bgmiApiKey: apiKey
      });
      
      toast({
        title: 'Success',
        description: 'BGMI API key has been saved and verified',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid API key. Please check and try again.',
        variant: 'destructive',
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="bg-bgmi-dark border border-bgmi-blue/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Key className="h-5 w-5 text-bgmi-blue" />
          BGMI API Settings
        </CardTitle>
        <CardDescription className="text-white/60">
          Enter your BGMI API key to fetch real-time player statistics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/70 mb-2 block">API Key</label>
            <div className="flex gap-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your BGMI API key"
                className="flex-1 bg-bgmi-dark border border-bgmi-blue/30 text-white"
              />
              <Button
                onClick={handleSaveApiKey}
                disabled={testing || !apiKey.trim()}
                className="neon-button"
              >
                {testing ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Testing</>
                ) : (
                  <><Save className="h-4 w-4 mr-2" /> Save Key</>
                )}
              </Button>
            </div>
          </div>
          <div className="text-sm text-white/60">
            Your API key will be securely stored and used to fetch your game statistics
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BGMISettings;
