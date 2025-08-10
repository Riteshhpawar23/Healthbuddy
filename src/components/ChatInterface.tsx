import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Upload, Mic, Smile, Brain, Heart, Users, Bot, User, AlertCircle, Wifi } from "lucide-react";
import { useChatSession } from "@/hooks/useChatSession";
import { validateMessage, detectCrisis, getCrisisResponse } from "@/utils/chatHelpers";
import { ChatMessage } from "@/services/types";
import { testConnection } from "@/services/api";

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
  const [showChat, setShowChat] = useState(false);
  const [useStreaming, setUseStreaming] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'testing' | 'connected' | 'failed'>('unknown');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    sendMessage, 
    sendMessageStreaming, 
    clearChat, 
    isTyping, 
    isStreaming, 
    error 
  } = useChatSession();

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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Debug environment variables on component mount
  useEffect(() => {
    console.log('Environment variables check:');
    console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('VITE_API_KEY:', import.meta.env.VITE_API_KEY ? 'Present' : 'Missing');
    console.log('All env vars:', import.meta.env);
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    const validation = validateMessage(message);
    if (!validation.valid) {
      // You could show a toast or error message here
      console.error(validation.error);
      return;
    }

    // Check for crisis keywords
    if (detectCrisis(message)) {
      const crisisResponse = getCrisisResponse();
      // You might want to handle crisis differently, perhaps immediately showing resources
      console.warn('Crisis detected in message:', message);
    }

    setShowChat(true);
    
    if (useStreaming) {
      sendMessageStreaming(message);
    } else {
      await sendMessage(message);
    }
    
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setMessage(suggestionText);
    setShowChat(true);
  };

  const testBackendConnection = async () => {
    setConnectionStatus('testing');
    console.log('Testing backend connection...');
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('API Key present:', import.meta.env.VITE_API_KEY ? 'Yes' : 'No');
    
    const isConnected = await testConnection();
    setConnectionStatus(isConnected ? 'connected' : 'failed');
    
    if (!isConnected) {
      console.error('Backend connection failed');
    } else {
      console.log('Backend connection successful');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {showChat && messages.length > 0 ? (
        // Chat Messages View
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-4">
          {/* Chat Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-wellness flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">HealthBuddy AI</h2>
                <p className="text-sm text-white/70">Your mental health companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUseStreaming(!useStreaming)}
                className="text-xs"
              >
                {useStreaming ? 'Streaming' : 'Standard'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="text-xs"
              >
                Clear Chat
              </Button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-wellness flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : `${colors.cardBg} backdrop-blur-md border ${colors.border}/50`
                  }`}
                >
                  <div className="space-y-2">
                    <p className={`${msg.sender === 'user' ? 'text-white' : 'text-white'} whitespace-pre-wrap`}>
                      {msg.content}
                    </p>
                    
                    {msg.metadata?.isOffline && (
                      <div className="flex items-center gap-2 text-xs text-yellow-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>Offline response</span>
                      </div>
                    )}
                    
                    {msg.sentiment === 'crisis' && (
                      <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-300">
                        <strong>Crisis Support Available 24/7</strong>
                      </div>
                    )}
                    
                    <div className="text-xs text-white/50">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {(isTyping || isStreaming) && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-wellness flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className={`p-4 rounded-lg ${colors.cardBg} backdrop-blur-md border ${colors.border}/50`}>
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-white/70">
                      {isStreaming ? 'AI is responding...' : 'AI is thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Error Display */}
            {error && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <Card className={`p-4 shadow-soft ${colors.border}/50 ${colors.cardBg} backdrop-blur-md`}>
            <div className="space-y-3">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isTyping || isStreaming}
                  className={`pr-12 py-3 text-base ${colors.border}/50 focus:border-primary bg-background/50 ${isDarkTheme ? 'text-green-400' : 'text-white'}`}
                />
                <Button 
                  size="sm" 
                  onClick={handleSend}
                  disabled={isTyping || isStreaming || !message.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-gradient-wellness hover:shadow-glow"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        // Welcome Screen
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
                    <button 
                      onClick={testBackendConnection}
                      disabled={connectionStatus === 'testing'}
                      className={`flex items-center gap-2 hover:text-foreground transition-colors ${
                        connectionStatus === 'connected' ? 'text-green-400' : 
                        connectionStatus === 'failed' ? 'text-red-400' : 'text-white'
                      }`}
                    >
                      <Wifi className="w-4 h-4" />
                      <span>
                        {connectionStatus === 'testing' ? 'Testing...' :
                         connectionStatus === 'connected' ? 'Connected' :
                         connectionStatus === 'failed' ? 'Connection Failed' :
                         'Test Connection'}
                      </span>
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
                        onClick={() => handleSuggestionClick(`Tell me about ${suggestion.title.toLowerCase()}`)}
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
      )}
    </div>
  );
}