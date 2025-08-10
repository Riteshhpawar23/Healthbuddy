import { useState, useCallback, useMemo } from 'react';
import { ChatMessage, ChatSession } from '../services/types';
import { sendQuery, streamQuery } from '../services/api';

// Generate unique ID for messages
const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useChatSession = () => {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamCleanup, setStreamCleanup] = useState<(() => void) | null>(null);

  // Add a message to the chat
  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  // Update the last message (useful for streaming)
  const updateLastMessage = useCallback((updatedMessage: Partial<ChatMessage>) => {
    setMessages(prev => {
      const newMessages = [...prev];
      const lastIndex = newMessages.length - 1;
      if (lastIndex >= 0) {
        newMessages[lastIndex] = { ...newMessages[lastIndex], ...updatedMessage };
      }
      return newMessages;
    });
  }, []);

  // Send message with non-streaming response
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    try {
      setError(null);
      
      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        content: content.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      addMessage(userMessage);
      
      // Show AI typing indicator
      setIsTyping(true);
      
      // Call LLM API
      const response = await sendQuery(content);
      
      // Add AI response
      const aiMessage: ChatMessage = {
        id: generateId(),
        content: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      addMessage(aiMessage);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Add fallback message
      const fallbackMessage: ChatMessage = {
        id: generateId(),
        content: "I'm having trouble connecting right now. Here are some self-care techniques you can try: Take deep breaths, practice mindfulness, or try journaling your thoughts.",
        sender: 'ai',
        timestamp: new Date(),
        metadata: {
          isOffline: true,
          suggestedActions: ['breathing_exercise', 'journal_prompt', 'mindfulness']
        }
      };
      addMessage(fallbackMessage);
    } finally {
      setIsTyping(false);
    }
  }, [addMessage]);

  // Send message with streaming response
  const sendMessageStreaming = useCallback((content: string) => {
    if (!content.trim()) return;

    try {
      setError(null);
      
      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        content: content.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      addMessage(userMessage);
      
      // Add empty AI message for streaming
      const aiMessage: ChatMessage = {
        id: generateId(),
        content: '',
        sender: 'ai',
        timestamp: new Date()
      };
      addMessage(aiMessage);
      
      setIsStreaming(true);
      
      // Start streaming
      const cleanup = streamQuery(
        content,
        (chunk) => {
          // Update the last message with new content
          updateLastMessage({ content: aiMessage.content + chunk });
          aiMessage.content += chunk;
        },
        (error) => {
          setError(error);
          setIsStreaming(false);
          // Add fallback content
          updateLastMessage({ 
            content: "I encountered an error. Please try again or contact support if this persists.",
            metadata: { isOffline: true }
          });
        },
        () => {
          setIsStreaming(false);
          setStreamCleanup(null);
        }
      );
      
      setStreamCleanup(() => cleanup);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsStreaming(false);
    }
  }, [addMessage, updateLastMessage]);

  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    if (streamCleanup) {
      streamCleanup();
      setStreamCleanup(null);
    }
  }, [streamCleanup]);

  // Stop streaming
  const stopStreaming = useCallback(() => {
    if (streamCleanup) {
      streamCleanup();
      setStreamCleanup(null);
      setIsStreaming(false);
    }
  }, [streamCleanup]);

  const chatSession: ChatSession = useMemo(() => ({
    sessionId,
    messages,
  }), [sessionId, messages]);

  return {
    chatSession,
    messages,
    sendMessage,
    sendMessageStreaming,
    clearChat,
    stopStreaming,
    isTyping,
    isStreaming,
    error,
    sessionId
  };
};
