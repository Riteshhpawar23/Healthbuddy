import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Brain, Heart, Users } from "lucide-react";

interface ThemeColors {
  text: string;
  cardBg: string;
  buttonBg: string;
  border: string;
}

interface ChatInterfaceProps {
  themeColors?: ThemeColors;
}

const quickStartSuggestions = [
  {
    icon: Brain,
    title: "Stress Management",
    description: "Learn techniques to manage daily stress",
    color: "bg-gradient-calm"
  },
  {
    icon: Heart,
    title: "Emotional Wellness",
    description: "Explore your feelings in a safe space",
    color: "bg-gradient-wellness"
  },
  {
    icon: Users,
    title: "Relationship Support",
    description: "Navigate relationship challenges",
    color: "bg-support"
  }
];

export default function ChatInterface({ themeColors }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{id: string, content: string, sender: 'user' | 'ai'}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Default colors if none provided
  const colors = themeColors || {
    text: 'text-white',
    cardBg: 'bg-card/40',
    buttonBg: 'bg-card/30',
    border: 'border-border'
  };

  // Check if it's dark theme
  const isDarkTheme = colors.text === 'text-gray-200' || colors.text === 'text-blue-100';

  // Debug API connection on mount
  useEffect(() => {
    console.log('🔗 API Configuration:');
    console.log('URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('API Key:', import.meta.env.VITE_API_KEY ? '✅ Present' : '❌ Missing');
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: `msg_${Date.now()}`,
      content: message,
      sender: 'user' as const
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // Real API call
      console.log('🚀 Sending to API:', import.meta.env.VITE_API_BASE_URL + '/query');
      
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/query`,
        {
          method: "POST",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY
          },
          body: JSON.stringify({ query: userMessage.content })
        }
      );

      console.log('📡 API Response:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Data:', data);
      
      const aiMessage = {
        id: `msg_${Date.now()}_ai`,
        content: data.answer || "I received your message but couldn't generate a response.",
        sender: 'ai' as const
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('❌ API Error:', error);
      const errorMessage = {
        id: `msg_${Date.now()}_error`,
        content: "I'm having trouble connecting right now. Here are some self-care techniques: Take deep breaths, practice mindfulness, or try journaling your thoughts.",
        sender: 'ai' as const
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {messages.length > 0 ? (
        // Chat View
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">HealthBuddy Chat</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card/40 backdrop-blur-md border border-border/50'
                  }`}
                >
                  <p className="text-white">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card/40 backdrop-blur-md border border-border/50 p-4 rounded-lg">
                  <p className="text-white">AI is thinking...</p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <Card className={`p-4 ${colors.cardBg} backdrop-blur-md`}>
            <div className="relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="pr-12 py-3 text-base bg-background/50 text-white"
              />
              <Button 
                size="sm" 
                onClick={handleSend}
                disabled={isLoading || !message.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-gradient-wellness"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        // Welcome Screen
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-white">Find Your Calm in the Chaos</span>
              </h1>
              <p className="text-lg leading-relaxed">
                <span className="text-white">A safe space to understand your feelings, learn coping strategies and connect with people who care. You are not alone</span>
              </p>
            </div>

            {/* Chat input */}
            <div className="space-y-6">
              <Card className={`p-6 ${colors.cardBg} backdrop-blur-md`}>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="pr-20 py-6 text-base bg-background/50 text-white"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Button 
                        size="sm" 
                        onClick={handleSend}
                        className="h-8 w-8 p-0 bg-gradient-wellness"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-white">
                    Press Enter to send
                  </div>
                </div>
              </Card>

              {/* Quick start suggestions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  <span className="text-white">Get Started:</span>
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {quickStartSuggestions.map((suggestion, index) => (
                    <Card 
                      key={index}
                      onClick={() => setMessage(`Tell me about ${suggestion.title.toLowerCase()}`)}
                      className={`p-4 cursor-pointer hover:shadow-soft transition-all duration-200 hover:-translate-y-1 ${colors.cardBg} backdrop-blur-md group`}
                    >
                      <div className="space-y-3">
                        <h4 className="font-medium text-white group-hover:text-primary transition-colors">
                          {suggestion.title}
                        </h4>
                        <p className="text-sm text-white/80">
                          {suggestion.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
