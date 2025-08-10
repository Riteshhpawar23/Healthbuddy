import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Upload, Mic, Smile, Brain, Heart, Users } from "lucide-react";

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

  // Default colors if none provided
  const colors = themeColors || {
    text: 'text-white',
    cardBg: 'bg-card/40',
    buttonBg: 'bg-card/30',
    border: 'border-border'
  };

  // Check if it's dark theme (Dark theme uses text-gray-200, Water theme uses text-blue-100)
  const isDarkTheme = colors.text === 'text-gray-200' || colors.text === 'text-blue-100';
  console.log('Current theme colors:', colors, 'isDark:', isDarkTheme);

  const handleSend = () => {
    if (message.trim()) {
      // Handle message sending
      console.log("Sending message:", message);
      setMessage("");
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
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              <span className="text-white">Find Your Calm in the Chaos</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className="text-white">A safe space to understand your feeling, learn coping strategies and connect with people who care. You are not alone</span>
            </p>
          </div>

          {/* Chat input */}
          <div className="space-y-6">
            <Card className={`p-6 shadow-soft ${colors.border}/50 ${colors.cardBg} backdrop-blur-md`}>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className={`pr-20 py-6 text-base ${colors.border}/50 focus:border-primary bg-background/50 ${isDarkTheme ? 'text-green-400 dark-theme-input' : 'text-white light-theme-input'}`}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 hover:bg-accent"
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSend}
                      className="h-8 w-8 p-0 bg-gradient-wellness hover:shadow-glow"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <button className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Upload className="w-4 h-4" />
                    <span className="text-white">Upload files</span>
                  </button>
                  <span className="text-border">|</span>
                  <span className="text-white">Press Enter to send</span>
                </div>
              </div>
            </Card>

            {/* Quick start suggestions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                <span className="text-white">Get Started with a Survey:</span>
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {quickStartSuggestions.map((suggestion, index) => {
                  return (
                    <Card 
                      key={index}
                      className={`p-4 cursor-pointer hover:shadow-soft transition-all duration-200 hover:-translate-y-1 ${colors.border}/50 ${colors.cardBg} backdrop-blur-md group`}
                    >
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h4 
                            className={`font-medium ${isDarkTheme ? 'text-white' : 'text-black'} group-hover:text-primary transition-colors`}
                            style={isDarkTheme ? { color: 'white !important' } : {}}
                          >
                            {suggestion.title}
                          </h4>
                          <p 
                            className={`text-sm ${isDarkTheme ? 'text-white/80' : 'text-black'}`}
                            style={isDarkTheme ? { color: 'rgba(255, 255, 255, 0.9) !important' } : {}}
                          >
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}