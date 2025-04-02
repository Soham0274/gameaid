
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Image, BarChart2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: "👋 Welcome to GameAid! I can help you improve your gameplay with stats analysis, weapon recommendations, and tactics. What would you like to know?",
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

  const mockResponses: { [key: string]: string[] } = {
    'stats': [
      "Based on your recent matches, your K/D ratio is 2.5 with a 15% win rate. Your accuracy has improved by 8% since last week!",
      "Your stats show strong improvement in the last 20 matches. K/D has risen from 1.8 to 2.7, and your average damage per match is now 520, up 15% from before.",
      "Looking at your last 50 matches, you excel at close-range combat with a 68% win rate in final circles, but might need to work on your mid-range engagements where your accuracy drops by 12%."
    ],
    'weapons': [
      "For your playstyle, I recommend the M416 with compensator, vertical grip, and extended mag. It matches well with your mid-range engagement preference.",
      "Given your frequent encounters in urban areas, try using the UMP45 with a suppressor and half grip. Its low recoil and decent damage make it perfect for close-quarters combat.",
      "Your sniper stats are impressive. The Kar98k with a compensator and 6x scope would complement your long-distance accuracy. Pair it with an M762 for versatility."
    ],
    'map': [
      "On Erangel, considering your aggressive playstyle, I suggest dropping at Pochinki or School. These locations offer good loot and early fight opportunities.",
      "For Miramar, with your preference for long-range engagements, try landing at Water Treatment or El Azahar. The elevated positions provide excellent sniping opportunities.",
      "Given your stats on Sanhok, Paradise Resort would be ideal with your close-combat proficiency. The dense cover allows for strategic rotations and ambushes."
    ],
    'settings': [
      "To improve your gameplay, try setting your gyroscope to 'Always On' with sensitivity at 300%. Also, adjust your 4x scope sensitivity to 120% for better recoil control.",
      "For better visibility during firefights, set your graphics to Smooth with Extreme frame rate. This maximizes performance and reduces distractions.",
      "Based on your device specifications, I recommend lowering shadow effects and anti-aliasing to minimize battery drain while maintaining visual clarity in combat situations."
    ],
    'tips': [
      "Try practicing 'jiggle peeking' when engaging enemies behind cover. This makes you harder to hit while allowing you to spot enemy positions.",
      "When in a squad, use vehicle explosions as distractions while your teammates flank from another direction. This tactic has a 65% success rate in competitive play.",
      "For better survivability in the final circles, gather smoke grenades early game. Creating smoke walls can provide crucial cover during open-field transitions."
    ],
    'meta': [
      "The current meta favors SMGs in close combat. The Vector with extended mag and lightweight grip dominates with its high fire rate and manageable recoil.",
      "After the recent update, DMRs like the Mini14 have become more viable due to reduced bullet drop and increased damage to limbs.",
      "The competitive meta has shifted toward more aggressive early-game strategies, with 78% of tournament winners averaging 5+ kills in the first circle."
    ],
    'team': [
      "For effective squad composition, ensure you have designated roles: a scout with mobility, support with smoke/grenades, a sniper for long-range, and an aggressive pusher.",
      "Your team statistics show strong individual skills but room for improvement in coordinated pushes. Try practicing synchronized attacks from multiple angles.",
      "Based on your squad's performance history, rotating early to the center of the safe zone and holding defensive positions yields a 23% higher placement average."
    ],
    'training': [
      "To improve your recoil control, spend 15 minutes daily in the training grounds practicing spray patterns with the Beryl M762 and AKM without attachments.",
      "For better reaction time, try hot-dropping in Bootcamp or Paradise Resort for 10 matches consecutively. This high-intensity practice improves quick decision-making.",
      "To master grenade usage, practice throwing them through windows and around corners in training mode. Accurate grenade placement can turn disadvantageous situations in your favor."
    ],
    'rank': [
      "To climb from Diamond to Crown, focus on placement points by avoiding early fights and prioritizing position over kills until the top 20 players remain.",
      "For Ace tier advancement, you'll need to balance aggression with survival. Aim for 3-5 kills while ensuring top 10 placement consistently.",
      "The most efficient path to Conqueror involves playing during off-peak hours and maintaining a K/D above 5 with at least 15% win rate. Focus on one map to master its rotations."
    ],
    'update': [
      "The latest patch introduces the new Deston map, featuring unique vertical zip lines and underwater ascenders for rapid position changes.",
      "The recent balance update has nerfed the M416's damage by 5% but reduced its recoil, making it more accessible for mid-range spraying.",
      "A new vehicle, the Coupe RB, has been added in the latest update. It offers the fastest speed on roads but has minimal protection, making it ideal for quick rotations but vulnerable during combat."
    ],
    'loadout': [
      "For close-range combat, try the UZI with extended mag and stock. Pair it with a DMR like the SKS for mid-range engagements. This loadout excels in urban environments.",
      "Your aggressive playstyle would benefit from an M416 (with compensator, tactical stock, and extended mag) paired with a shotgun like S12K for building clearing.",
      "For a balanced loadout with maximum versatility, equip an AKM with a 3x scope for mid-range and the Vector for close-quarters combat. This combination covers most engagement ranges."
    ],
    'heatmap': [
      "Based on recent match data, the highest player density areas on Erangel are Pochinki, School, and Military Base. Consider alternative drop locations like Rozhok for safer early game.",
      "The heatmap for Miramar shows most players landing at Hacienda del Patron and Los Leones. For a strategic advantage, try dropping at Water Treatment which has good loot but less competition.",
      "Our Sanhok heatmap indicates Paradise Resort and Boot Camp remain the hottest drop zones. If you prefer a quieter start with decent loot, try Pai Nan or Camp Bravo."
    ],
    'discord': [
      "You can access GameAid through our Discord bot using commands like !stats, !loadout, and !heatmap. Join our server for team matchmaking and competitive events.",
      "Our Discord integration allows you to share your game stats directly in your server channels. Use !compare to match your stats against friends for friendly competition.",
      "The GameAid Discord bot can provide real-time match analysis and tactical suggestions for your squad. Use !teamcomp to get recommendations for your squad's composition."
    ],
    'rewards': [
      "You've earned 50 GameAid points from recent interactions! Keep using the app to unlock exclusive guides and personalized coaching sessions.",
      "Congratulations on reaching Level 3! You've unlocked the 'Weapon Master' guide which contains detailed recoil patterns and attachment recommendations for all assault rifles.",
      "Your daily streak is now 5 days! Keep it up to earn bonus points and unlock the 'Elite Tactics' reward which includes strategies used by professional players."
    ],
    'pro': [
      "Professional players like Paraboy prioritize position and rotation over early-game kills. Study tournament replays to understand optimal positioning for each circle phase.",
      "Top competitive teams maintain consistent practice schedules, focusing on specific aspects like vehicle rotations, building clearing, and coordinated utility usage.",
      "Pro player Coffin demonstrates excellent crosshair placement, always aiming at head level and pre-aiming common enemy positions before clearing angles. Try implementing this technique in your gameplay."
    ],
    'clutch': [
      "In 1vX situations, prioritize isolating individual opponents rather than facing multiple enemies simultaneously. Use sound cues to your advantage.",
      "To win clutch scenarios, conserve utility until absolutely necessary. A well-timed smoke or grenade can create crucial opportunities in final circle engagements.",
      "When you're the last survivor in your squad, playing the edge of the circle and letting other teams fight first increases your survival probability by 40%. Patience is key to clutching."
    ],
    'sensitivity': [
      "For better spray control, try these sensitivity settings: Camera 120%, ADS 80%, Gyroscope Always On at 300%. This balanced setup works well for both tracking and recoil management.",
      "If you're struggling with close-range tracking, consider increasing your Camera sensitivity while keeping your ADS sensitivity lower for precision in mid to long-range engagements.",
      "Top players often use gyroscope for fine-tuning aim while using thumb/finger movements for broader camera control. Try setting gyroscope to 'Scope On' at 400% sensitivity as a starting point."
    ]
  };

  const getRandomResponse = (category: string): string => {
    const responses = mockResponses[category] || [];
    if (responses.length > 0) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    return "I'm not sure how to help with that yet. Try asking about player stats, weapon recommendations, or map strategies!";
  };

  const handleSendMessage = () => {
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
    
    // Simulate bot response
    setTimeout(() => {
      let responseContent = "I'm not sure how to help with that yet. Try asking about player stats, weapon recommendations, map strategies, settings optimization, or gameplay tips!";
      
      // Keyword matching with categories
      const userQuery = userMessage.content.toLowerCase();
      
      if (userQuery.includes('stats') || userQuery.includes('kd') || userQuery.includes('performance') || userQuery.includes('ratio')) {
        responseContent = getRandomResponse('stats');
      } else if (userQuery.includes('weapon') || userQuery.includes('gun') || userQuery.includes('loadout')) {
        responseContent = getRandomResponse('weapons');
      } else if (userQuery.includes('map') || userQuery.includes('location') || userQuery.includes('drop') || userQuery.includes('land')) {
        responseContent = getRandomResponse('map');
      } else if (userQuery.includes('setting') || userQuery.includes('sensitivity') || userQuery.includes('control')) {
        responseContent = getRandomResponse('settings');
      } else if (userQuery.includes('tip') || userQuery.includes('strategy') || userQuery.includes('tactic') || userQuery.includes('improve')) {
        responseContent = getRandomResponse('tips');
      } else if (userQuery.includes('meta') || userQuery.includes('current') || userQuery.includes('popular')) {
        responseContent = getRandomResponse('meta');
      } else if (userQuery.includes('team') || userQuery.includes('squad') || userQuery.includes('friend')) {
        responseContent = getRandomResponse('team');
      } else if (userQuery.includes('train') || userQuery.includes('practice') || userQuery.includes('exercise')) {
        responseContent = getRandomResponse('training');
      } else if (userQuery.includes('rank') || userQuery.includes('tier') || userQuery.includes('crown') || userQuery.includes('ace')) {
        responseContent = getRandomResponse('rank');
      } else if (userQuery.includes('update') || userQuery.includes('patch') || userQuery.includes('new') || userQuery.includes('latest')) {
        responseContent = getRandomResponse('update');
      } else if (userQuery.includes('loadout') || userQuery.includes('setup') || userQuery.includes('combination')) {
        responseContent = getRandomResponse('loadout');
      } else if (userQuery.includes('heatmap') || userQuery.includes('hot drop') || userQuery.includes('traffic')) {
        responseContent = getRandomResponse('heatmap');
      } else if (userQuery.includes('discord') || userQuery.includes('server') || userQuery.includes('community') || userQuery.includes('bot')) {
        responseContent = getRandomResponse('discord');
      } else if (userQuery.includes('reward') || userQuery.includes('point') || userQuery.includes('level') || userQuery.includes('unlock')) {
        responseContent = getRandomResponse('rewards');
      } else if (userQuery.includes('pro') || userQuery.includes('competitive') || userQuery.includes('tournament') || userQuery.includes('professional')) {
        responseContent = getRandomResponse('pro');
      } else if (userQuery.includes('clutch') || userQuery.includes('1v') || userQuery.includes('last man') || userQuery.includes('solo vs squad')) {
        responseContent = getRandomResponse('clutch');
      } else if (userQuery.includes('sensitivity') || userQuery.includes('gyroscope') || userQuery.includes('aim')) {
        responseContent = getRandomResponse('sensitivity');
      } else if (userQuery.includes('hello') || userQuery.includes('hi') || userQuery.includes('hey')) {
        responseContent = "Hello there! How can I help improve your gameplay today? Feel free to ask about stats, weapons, maps, heatmaps, Discord integration, or strategies!";
      } else if (userQuery.includes('thank')) {
        responseContent = "You're welcome! Always happy to help improve your gameplay. Is there anything else you'd like to know?";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
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
          >
            <Send className="h-4 w-4 text-bgmi-blue" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
