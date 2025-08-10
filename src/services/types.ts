// Types for the chat system
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'crisis';
  metadata?: {
    mood?: string;
    context?: string;
    suggestedActions?: string[];
    isOffline?: boolean;
  };
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  context?: UserContext;
}

export interface UserContext {
  recentMood?: string;
  journalSummary?: Array<{
    content: string;
    sentiment: string;
    date: Date;
  }>;
  timestamp: Date;
  userPreferences?: Record<string, any>;
}

export interface APIResponse {
  answer: string;
  sentiment?: string;
  metadata?: {
    mood?: string;
    context?: string;
    suggestedActions?: string[];
  };
}

export interface StreamChunk {
  data: string;
  done?: boolean;
}
