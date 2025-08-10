import { useState } from "react";
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
  },
  {
    icon: Heart,
    title: "Emotional Wellness", 
    description: "Explore your feelings in a safe space",
  },
  {
    icon: Users,
    title: "Relationship Support",
    description: "Navigate relationship challenges",
  }
];

export default function WorkingChatInterface({ themeColors }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{id: string, content: string, sender: 'user' | 'ai'}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const colors = themeColors || {
    text: 'text-white',
    cardBg: 'bg-card/40',
    buttonBg: 'bg-card/30',
    border: 'border-border'
  };

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
      console.log('🚀 Sending to API...');
      
      // Use Vercel API route in production, proxy in development
      const apiEndpoint = window.location.hostname === 'localhost' 
        ? '/api/query' 
        : '/api/query';
      
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: userMessage.content })
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);
      
      const aiMessage = {
        id: `msg_${Date.now()}_ai`,
        content: data.answer || "No response received",
        sender: 'ai' as const
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('❌ Error:', error);
      const errorMessage = {
        id: `msg_${Date.now()}_error`,
        content: "Connection error. Please try again.",
        sender: 'ai' as const
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {messages.length > 0 ? (
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">HealthBuddy AI Chat</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  <p className="text-white">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-white">🤖 AI is thinking...</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="pr-12 text-white bg-gray-900 border-gray-600"
              />
              <Button 
                onClick={handleSend}
                disabled={isLoading || !message.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white">🤖 HealthBuddy AI</h1>
              <p className="text-lg text-gray-300">Your mental health companion</p>
            </div>
            
            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your mental health..."
                  className="pr-12 text-white bg-gray-900 border-gray-600"
                />
                <Button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-2">Press Enter to send</p>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-3">
              {quickStartSuggestions.map((suggestion, index) => (
                <Card 
                  key={index}
                  onClick={() => setMessage(`Tell me about ${suggestion.title.toLowerCase()}`)}
                  className="p-4 cursor-pointer bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium text-white mb-2">{suggestion.title}</h4>
                  <p className="text-sm text-gray-300">{suggestion.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
