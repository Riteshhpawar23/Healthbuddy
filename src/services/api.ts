import { APIResponse } from './types';

// Non-streaming API call function
export async function sendQuery(userMessage: string): Promise<string> {
  console.log('Sending query to:', `${import.meta.env.VITE_API_BASE_URL}/query`);
  console.log('API Key:', import.meta.env.VITE_API_KEY ? 'Present' : 'Missing');
  
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ query: userMessage })
    }
  );

  if (!response.ok) {
    console.error('API Response:', response.status, response.statusText);
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }

  const data: APIResponse = await response.json();
  return data.answer;
}

// Streaming API call function for live typing effect
export function streamQuery(
  userMessage: string, 
  onChunk: (chunk: string) => void,
  onError?: (error: string) => void,
  onComplete?: () => void
): () => void {
  console.log('Starting stream to:', `${import.meta.env.VITE_API_BASE_URL}/stream`);
  
  const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/stream`);
  url.searchParams.append("query", userMessage);
  url.searchParams.append("api_key", import.meta.env.VITE_API_KEY);

  console.log('Stream URL:', url.toString());

  const eventSource = new EventSource(url.toString());

  eventSource.onmessage = (event) => {
    console.log('Received chunk:', event.data);
    
    // Each chunk from backend
    if (event.data.startsWith("[ERROR]")) {
      console.error("Backend error:", event.data);
      onError?.(event.data);
      eventSource.close();
      return;
    }
    
    // Handle end of stream
    if (event.data === "[DONE]") {
      console.log('Stream completed');
      onComplete?.();
      eventSource.close();
      return;
    }
    
    onChunk(event.data);
  };

  eventSource.onopen = () => {
    console.log('Stream connection opened');
  };

  eventSource.onerror = (err) => {
    console.error("Streaming error:", err);
    onError?.("Connection error occurred");
    eventSource.close();
  };

  // Return cleanup function
  return () => eventSource.close();
}

// Test API connection
export async function testConnection(): Promise<boolean> {
  try {
    console.log('Testing connection to:', import.meta.env.VITE_API_BASE_URL);
    
    // Try a simple GET request to the root endpoint first
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/`,
      {
        method: "GET",
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY
        }
      }
    );
    
    console.log('Connection test response:', response.status, response.statusText);
    return response.ok;
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  }
}
