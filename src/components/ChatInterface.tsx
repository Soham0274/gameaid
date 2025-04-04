
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Image, BarChart2, Loader2 } from 'lucide-react';
import { geminiService } from '@/services/geminiService';
import { userDatabaseService } from '@/services/userDatabaseService';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: "👋 Welcome to GameAid! I can help you improve your gameplay with stats analysis, weapon recommendations, and tactics. I'll keep my answers concise, but feel free to ask me to elaborate if you need more details. What would you like to know?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

interface ChatInterfaceProps {
  questionsLeft?: number;
  isLoggedIn?: boolean;
  onLoginRequest?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  questionsLeft = 10, 
  isLoggedIn = false,
  onLoginRequest
}) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Use Gemini API for response with enhanced prompt detection
      const userContext = isLoggedIn ? userDatabaseService.getUserData('player@example.com') : null;
      const response = await geminiService.getCustomAnswer(input, userContext);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Fallback to mock responses if API fails
      const mockResponse = getMockResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Fallback mock responses for when the API fails
  const getMockResponse = (userInput: string): string => {
    const userQuery = userInput.toLowerCase();
    
    if (userQuery.includes('stats') || userQuery.includes('kd') || userQuery.includes('performance') || userQuery.includes('ratio')) {
      return "Based on your recent matches, your K/D ratio is 2.5 with a 15% win rate. Your accuracy has improved by 8% since last week!";
    } else if (userQuery.includes('weapon') || userQuery.includes('gun') || userQuery.includes('loadout')) {
      return "For your playstyle, I recommend the M416 with compensator, vertical grip, and extended mag. It matches well with your mid-range engagement preference.";
    } else if (userQuery.includes('map') || userQuery.includes('location') || userQuery.includes('drop') || userQuery.includes('land')) {
      return "On Erangel, considering your aggressive playstyle, I suggest dropping at Pochinki or School. These locations offer good loot and early fight opportunities.";
    } else if (userQuery.includes('setting') || userQuery.includes('sensitivity') || userQuery.includes('control')) {
      return "To improve your gameplay, try setting your gyroscope to 'Always On' with sensitivity at 300%. Also, adjust your 4x scope sensitivity to 120% for better recoil control.";
    } else if (userQuery.includes('tip') || userQuery.includes('strategy') || userQuery.includes('tactic') || userQuery.includes('improve')) {
      return "Try practicing 'jiggle peeking' when engaging enemies behind cover. This makes you harder to hit while allowing you to spot enemy positions.";
    } else if (userQuery.includes('hello') || userQuery.includes('hi') || userQuery.includes('hey')) {
      return "Hello there! How can I help improve your gameplay today? Feel free to ask about stats, weapons, maps, heatmaps, Discord integration, or strategies!";
    } else if (userQuery.includes('thank')) {
      return "You're welcome! Always happy to help improve your gameplay. Is there anything else you'd like to know?";
    } else {
      return "I'm not sure how to help with that yet. Try asking about player stats, weapon recommendations, map strategies, settings optimization, or gameplay tips!";
    }
  };

  return (
    <div className="flex flex-col bg-bgmi-dark rounded-lg border border-bgmi-blue/20 h-full overflow-hidden">
      <div className="p-4 border-b border-bgmi-blue/20 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-bgmi-blue animate-pulse mr-2"></div>
          <h2 className="font-semibold text-white">GameAid Assistant</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-transparent border border-bgmi-blue/30">
            <BarChart2 className="h-4 w-4 text-bgmi-blue" />
          </Button>
          {!isLoggedIn && questionsLeft < 5 && (
            <Button 
              variant="outline" 
              className="h-8 text-xs border-bgmi-blue/30 text-bgmi-blue hover:text-white hover:bg-bgmi-blue/20"
              onClick={onLoginRequest}
            >
              Login for unlimited
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-bubble ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            <p className="text-white">{message.content}</p>
            <div className="text-xs text-white/50 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="chat-bubble bot">
            <div className="flex space-x-2">
              <div className="h-2 w-2 rounded-full bg-bgmi-blue animate-bounce"></div>
              <div className="h-2 w-2 rounded-full bg-bgmi-blue animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 rounded-full bg-bgmi-blue animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-bgmi-blue/20">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="bg-transparent border border-bgmi-blue/30">
            <Image className="h-4 w-4 text-bgmi-blue" />
          </Button>
          <Button variant="outline" size="icon" className="bg-transparent border border-bgmi-blue/30">
            <Mic className="h-4 w-4 text-bgmi-blue" />
          </Button>
          <Input
            placeholder={isLoggedIn ? "Ask me anything about your game..." : `Ask me (${questionsLeft} questions left)...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-bgmi-dark border border-bgmi-blue/30 focus-visible:ring-bgmi-blue/50 text-white"
          />
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-bgmi-blue/10 border border-bgmi-blue hover:bg-bgmi-blue/20"
            onClick={handleSendMessage}
            disabled={isTyping}
          >
            {isTyping ? (
              <Loader2 className="h-4 w-4 text-bgmi-blue animate-spin" />
            ) : (
              <Send className="h-4 w-4 text-bgmi-blue" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
