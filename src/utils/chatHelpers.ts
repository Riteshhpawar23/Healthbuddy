import { ChatMessage } from '../services/types';

// Generate unique ID
export const generateUUID = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Handle chat errors with appropriate fallback messages
export const handleChatError = (error: Error): ChatMessage => {
  console.error('Chat error:', error);
  
  if (error.name === 'NetworkError' || error.message.includes('fetch')) {
    return {
      id: generateUUID(),
      content: "I'm having trouble connecting right now. Here are some self-care techniques you can try: Take deep breaths, practice mindfulness, or write in your journal.",
      sender: 'ai',
      timestamp: new Date(),
      metadata: {
        isOffline: true,
        suggestedActions: ['breathing_exercise', 'journal_prompt', 'mindfulness', 'emergency_contacts']
      }
    };
  }
  
  if (error.message.includes('401') || error.message.includes('403')) {
    return {
      id: generateUUID(),
      content: "There seems to be an authentication issue. Please refresh the page and try again.",
      sender: 'ai',
      timestamp: new Date(),
      metadata: {
        isOffline: true
      }
    };
  }
  
  return {
    id: generateUUID(),
    content: "I encountered an unexpected error. Please try again, or contact support if this persists. In the meantime, remember that you're not alone.",
    sender: 'ai',
    timestamp: new Date(),
    metadata: {
      isOffline: true,
      suggestedActions: ['try_again', 'contact_support', 'emergency_contacts']
    }
  };
};

// Format message content for display
export const formatMessageContent = (content: string): string => {
  // Remove any HTML tags for security
  return content.replace(/<[^>]*>/g, '');
};

// Validate message length
export const validateMessage = (message: string): { valid: boolean; error?: string } => {
  const trimmed = message.trim();
  
  if (!trimmed) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  
  const maxLength = parseInt(import.meta.env.VITE_MAX_MESSAGE_LENGTH || '2000');
  if (trimmed.length > maxLength) {
    return { valid: false, error: `Message too long. Maximum ${maxLength} characters allowed.` };
  }
  
  return { valid: true };
};

// Check if the message indicates a crisis situation
export const detectCrisis = (message: string): boolean => {
  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'want to die', 'hurt myself',
    'self harm', 'cutting', 'overdose', 'jump off', 'hang myself'
  ];
  
  const lowerMessage = message.toLowerCase();
  return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
};

// Get crisis response message
export const getCrisisResponse = (): ChatMessage => {
  return {
    id: generateUUID(),
    content: "I'm concerned about you and want to help. Please reach out to a crisis helpline immediately:\n\n🆘 **National Suicide Prevention Lifeline: 988**\n🆘 **Crisis Text Line: Text HOME to 741741**\n\nYou matter, and there are people who want to help you through this difficult time.",
    sender: 'ai',
    timestamp: new Date(),
    sentiment: 'crisis',
    metadata: {
      suggestedActions: ['call_988', 'text_741741', 'emergency_services', 'trusted_person']
    }
  };
};
