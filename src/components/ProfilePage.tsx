import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Shield, MessageSquare, Calendar, Mic, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { userDatabaseService } from '@/services/userDatabaseService';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-bgmi-dark border border-bgmi-blue/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="h-6 w-6 text-bgmi-blue" />
            Your Profile
          </CardTitle>
          {!editing ? (
            <Button 
              variant="outline" 
              className="border-bgmi-blue/30 text-white hover:bg-bgmi-blue/10"
              onClick={() => setEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-red-500/30 text-red-400 hover:bg-red-500/10" 
                onClick={() => {
                  setFormData({ ...profile });
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                className="bg-bgmi-blue text-white hover:bg-bgmi-blue/80" 
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Photo and Basic Info Card */}
            <Card className="md:col-span-1 bg-bgmi-darker p-5 rounded-lg border border-bgmi-blue/20">
              <div className="text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <div 
                      className="w-32 h-32 rounded-full bg-bgmi-blue/20 flex items-center justify-center mx-auto mb-4 overflow-hidden cursor-pointer hover:bg-bgmi-blue/30 transition-colors"
                      onClick={handlePhotoUpload}
                    >
                      {profile.profilePhoto ? (
                        <img 
                          src={formData.profilePhoto || profile.profilePhoto} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-16 w-16 text-bgmi-blue" />
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-bgmi-darker border-bgmi-blue/20">
                    <DialogHeader>
                      <DialogTitle className="text-white">Update Profile Photo</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4">
                      <Button 
                        variant="outline"
                        className="w-full border-bgmi-blue/30 text-white hover:bg-bgmi-blue/10"
                        onClick={handlePhotoUpload}
                      >
                        Choose Photo
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden"
                />

                <h3 className="text-xl font-semibold text-white mb-2">{profile.username}</h3>
                <p className="text-bgmi-blue text-sm mb-4">{profile.gameId}</p>

                <div className="flex justify-center gap-2 mb-6">
                  <div className="flex items-center text-xs text-white/70 bg-bgmi-blue/10 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Online
                  </div>
                  <div className="flex items-center text-xs text-white/70 bg-bgmi-blue/10 px-3 py-1.5 rounded-full">
                    <Shield className="h-3 w-3 mr-2 text-bgmi-blue" />
                    Gold Rank
                  </div>
                </div>

                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-bgmi-blue" />
                    Member since: {formatDistanceToNow(profile.registrationTime)} ago
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-bgmi-blue" />
                    Last login: {formatDistanceToNow(profile.loginTime)} ago
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Information Card */}
            <Card className="md:col-span-2 bg-bgmi-darker p-5 rounded-lg border border-bgmi-blue/20">
              <CardHeader>
                <CardTitle className="text-bgmi-blue">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Username</label>
                  {editing ? (
                    <Input
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="bg-bgmi-dark border border-bgmi-blue/30 text-white focus-visible:ring-bgmi-blue/50"
                    />
                  ) : (
                    <div className="flex items-center bg-bgmi-dark/50 p-3 rounded-lg border border-bgmi-blue/10">
                      <User className="h-5 w-5 text-bgmi-blue mr-3" />
                      <p className="text-white">{profile.username}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">Email Address</label>
                  {editing ? (
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-bgmi-dark border border-bgmi-blue/30 text-white focus-visible:ring-bgmi-blue/50"
                    />
                  ) : (
                    <div className="flex items-center bg-bgmi-dark/50 p-3 rounded-lg border border-bgmi-blue/10">
                      <Mail className="h-5 w-5 text-bgmi-blue mr-3" />
                      <p className="text-white">{profile.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">Game ID</label>
                  {editing ? (
                    <Input
                      value={formData.gameId}
                      onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}
                      className="bg-bgmi-dark border border-bgmi-blue/30 text-white focus-visible:ring-bgmi-blue/50"
                    />
                  ) : (
                    <div className="flex items-center bg-bgmi-dark/50 p-3 rounded-lg border border-bgmi-blue/10">
                      <Shield className="h-5 w-5 text-bgmi-blue mr-3" />
                      <p className="text-white">{profile.gameId}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">Voice Message</label>
                  <div className="flex gap-2">
                    {recording ? (
                      <Button 
                        variant="outline" 
                        className="border-red-500/50 text-red-400 bg-red-500/10 hover:bg-red-500/20"
                        onClick={stopRecording}
                      >
                        <span className="animate-pulse mr-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        Stop Recording
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="border-bgmi-blue/50 text-white hover:bg-bgmi-blue/10"
                        onClick={startRecording}
                        disabled={editing}
                      >
                        <Mic className="h-4 w-4 mr-2 text-bgmi-blue" />
                        Record Message
                      </Button>
                    )}
                    
                    {(profile.voiceMessage || formData.voiceMessage) && (
                      <Button 
                        variant="outline" 
                        className="border-bgmi-blue/50 text-white hover:bg-bgmi-blue/10"
                        onClick={playVoiceMessage}
                      >
                        <MessageSquare className="h-4 w-4 mr-2 text-bgmi-blue" />
                        Play Message
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
