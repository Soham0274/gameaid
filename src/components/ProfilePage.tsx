
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Shield, MessageSquare, Camera, Mic, Image, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { userDatabaseService } from '@/services/userDatabaseService';
import { formatDistanceToNow } from 'date-fns';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: 'Player123',
    email: 'player@example.com',
    gameId: 'BGMI78901234',
    profilePhoto: '',
    voiceMessage: '',
    loginTime: Date.now(),
    registrationTime: Date.now() - 86400000, // Default to 1 day ago
    linkedAccounts: {
      discord: true,
      facebook: false,
      google: true
    }
  });
  
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [recording, setRecording] = useState(false);
  const { toast } = useToast();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  useEffect(() => {
    // Load user data if available
    const userData = userDatabaseService.getUserData('player@example.com');
    if (userData) {
      setProfile(prevProfile => ({
        ...prevProfile,
        ...userData,
        linkedAccounts: userData.linkedAccounts || prevProfile.linkedAccounts
      }));
    }
  }, []);
  
  const handleSave = () => {
    // Save to database
    userDatabaseService.updateUserData(formData.email, {
      username: formData.username,
      email: formData.email,
      gameId: formData.gameId,
      linkedAccounts: formData.linkedAccounts
    });
    
    setProfile(formData);
    setEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const photoData = event.target?.result as string;
        
        // Update local state
        setFormData(prev => ({ ...prev, profilePhoto: photoData }));
        
        if (!editing) {
          // If not in edit mode, save directly
          setProfile(prev => ({ ...prev, profilePhoto: photoData }));
          userDatabaseService.saveProfilePhoto(profile.email, photoData);
          
          toast({
            title: "Photo Updated",
            description: "Your profile photo has been updated.",
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        
        reader.onload = (event) => {
          const audioData = event.target?.result as string;
          
          // Update local state
          setFormData(prev => ({ ...prev, voiceMessage: audioData }));
          
          if (!editing) {
            // If not in edit mode, save directly
            setProfile(prev => ({ ...prev, voiceMessage: audioData }));
            userDatabaseService.saveVoiceMessage(profile.email, audioData);
            
            toast({
              title: "Voice Message Saved",
              description: "Your voice message has been updated.",
            });
          }
        };
        
        reader.readAsDataURL(audioBlob);
        
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setRecording(true);
      
      // Auto stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
          setRecording(false);
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };
  
  const playVoiceMessage = () => {
    if (formData.voiceMessage) {
      const audio = new Audio(formData.voiceMessage);
      audio.play();
    }
  };
  
  return (
    <div className="p-6 bg-bgmi-dark border border-bgmi-blue/20 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="h-5 w-5 text-bgmi-blue" />
          Your Profile
        </h2>
        {!editing ? (
          <Button 
            variant="outline" 
            className="border-bgmi-blue/30 text-white" 
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-red-500/30 text-red-400" 
              onClick={() => {
                setFormData({ ...profile });
                setEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              className="neon-button" 
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-bgmi-darker p-5 rounded-lg border border-bgmi-blue/20">
          <div className="text-center">
            {/* Profile Photo */}
            <div 
              className="w-24 h-24 rounded-full bg-bgmi-blue/20 flex items-center justify-center mx-auto mb-4 overflow-hidden cursor-pointer"
              onClick={handlePhotoUpload}
            >
              {profile.profilePhoto ? (
                <img 
                  src={formData.profilePhoto || profile.profilePhoto} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-bgmi-blue" />
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden"
              />
            </div>
            
            <h3 className="text-white font-medium">{profile.username}</h3>
            <p className="text-white/60 text-sm">{profile.gameId}</p>
            
            {/* Status Badges */}
            <div className="flex justify-center gap-2 mt-4">
              <div className="flex items-center text-xs text-white/70 bg-bgmi-blue/10 px-2 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Online
              </div>
              <div className="flex items-center text-xs text-white/70 bg-bgmi-blue/10 px-2 py-1 rounded-full">
                <Shield className="h-3 w-3 mr-1 text-bgmi-blue" />
                Gold Rank
              </div>
            </div>
            
            {/* Account timestamps */}
            <div className="mt-4 pt-4 border-t border-bgmi-blue/10">
              <div className="flex items-center justify-center text-xs text-white/60 mb-1">
                <Calendar className="h-3 w-3 mr-1 text-bgmi-blue" />
                Member since: {formatDistanceToNow(profile.registrationTime)} ago
              </div>
              <div className="flex items-center justify-center text-xs text-white/60">
                <Calendar className="h-3 w-3 mr-1 text-bgmi-blue" />
                Last login: {formatDistanceToNow(profile.loginTime)} ago
              </div>
            </div>
            
            {/* Voice message controls */}
            <div className="mt-4 pt-4 border-t border-bgmi-blue/10">
              <p className="text-white/70 text-xs mb-2">Voice Message</p>
              <div className="flex justify-center gap-2">
                {recording ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-500/50 text-red-400 bg-red-500/10"
                    onClick={stopRecording}
                  >
                    <span className="animate-pulse mr-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    Stop
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-bgmi-blue/50 text-white"
                    onClick={startRecording}
                    disabled={editing}
                  >
                    <Mic className="h-3 w-3 mr-1 text-bgmi-blue" />
                    Record
                  </Button>
                )}
                
                {(profile.voiceMessage || formData.voiceMessage) && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-bgmi-blue/50 text-white"
                    onClick={playVoiceMessage}
                  >
                    <MessageSquare className="h-3 w-3 mr-1 text-bgmi-blue" />
                    Play
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-bgmi-darker p-5 rounded-lg border border-bgmi-blue/20">
          <h3 className="text-bgmi-blue font-medium mb-4">Account Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/80 text-sm mb-1 block">Username</label>
              {editing ? (
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-bgmi-dark border border-bgmi-blue/30 focus-visible:ring-bgmi-blue/50"
                />
              ) : (
                <div className="flex items-center bg-bgmi-dark p-2 rounded border border-bgmi-blue/10">
                  <User className="h-4 w-4 text-bgmi-blue mr-2" />
                  <p className="text-white">{profile.username}</p>
                </div>
              )}
            </div>
            
            <div>
              <label className="text-white/80 text-sm mb-1 block">Email Address</label>
              {editing ? (
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-bgmi-dark border border-bgmi-blue/30 focus-visible:ring-bgmi-blue/50"
                />
              ) : (
                <div className="flex items-center bg-bgmi-dark p-2 rounded border border-bgmi-blue/10">
                  <Mail className="h-4 w-4 text-bgmi-blue mr-2" />
                  <p className="text-white">{profile.email}</p>
                </div>
              )}
            </div>
            
            <div>
              <label className="text-white/80 text-sm mb-1 block">Game ID</label>
              {editing ? (
                <Input
                  value={formData.gameId}
                  onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}
                  className="bg-bgmi-dark border border-bgmi-blue/30 focus-visible:ring-bgmi-blue/50"
                />
              ) : (
                <div className="flex items-center bg-bgmi-dark p-2 rounded border border-bgmi-blue/10">
                  <Shield className="h-4 w-4 text-bgmi-blue mr-2" />
                  <p className="text-white">{profile.gameId}</p>
                </div>
              )}
            </div>
            
            <div>
              <label className="text-white/80 text-sm mb-1 block">Linked Accounts</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className={`flex items-center p-2 rounded border ${profile.linkedAccounts.discord ? 'bg-bgmi-blue/10 border-bgmi-blue/30' : 'bg-bgmi-dark border-white/10'}`}>
                  <MessageSquare className={`h-4 w-4 mr-2 ${profile.linkedAccounts.discord ? 'text-bgmi-blue' : 'text-white/40'}`} />
                  <p className={`${profile.linkedAccounts.discord ? 'text-white' : 'text-white/40'}`}>Discord</p>
                </div>
                <div className={`flex items-center p-2 rounded border ${profile.linkedAccounts.facebook ? 'bg-bgmi-blue/10 border-bgmi-blue/30' : 'bg-bgmi-dark border-white/10'}`}>
                  <div className={`h-4 w-4 mr-2 flex items-center justify-center text-xs font-bold rounded ${profile.linkedAccounts.facebook ? 'bg-bgmi-blue/20 text-bgmi-blue' : 'bg-white/10 text-white/40'}`}>f</div>
                  <p className={`${profile.linkedAccounts.facebook ? 'text-white' : 'text-white/40'}`}>Facebook</p>
                </div>
                <div className={`flex items-center p-2 rounded border ${profile.linkedAccounts.google ? 'bg-bgmi-blue/10 border-bgmi-blue/30' : 'bg-bgmi-dark border-white/10'}`}>
                  <div className={`h-4 w-4 mr-2 flex items-center justify-center text-xs font-bold rounded ${profile.linkedAccounts.google ? 'bg-bgmi-blue/20 text-bgmi-blue' : 'bg-white/10 text-white/40'}`}>G</div>
                  <p className={`${profile.linkedAccounts.google ? 'text-white' : 'text-white/40'}`}>Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
