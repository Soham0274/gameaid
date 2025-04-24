
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { bgmiService } from '@/services/bgmiService';

export const useBgmiSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [testing, setTesting] = useState(false);
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();

  const handleSaveApiKey = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to save API key',
        variant: 'destructive',
      });
      return;
    }

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
      // Test the API key
      await bgmiService.testApiKey(apiKey);
      
      // If successful, save the API key to the user's profile
      const { error } = await supabase
        .from('profiles')
        .update({ bgmi_api_key: apiKey })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      await refreshProfile();
      
      toast({
        title: 'Success',
        description: 'BGMI API key has been saved and verified',
      });
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: 'Error',
        description: 'Invalid API key or error saving it. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setTesting(false);
    }
  };

  return {
    apiKey,
    setApiKey,
    testing,
    handleSaveApiKey
  };
};

export default useBgmiSettings;
