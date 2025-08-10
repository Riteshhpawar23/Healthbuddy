import React from 'react';

export default function SimpleChat() {
  return (
    <div className="flex-1 flex flex-col min-h-screen p-6">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">HealthBuddy Chat</h1>
          <p className="text-muted-foreground">Testing simple interface</p>
        </div>
        
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-lg border p-4">
          <div className="flex-1 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg max-w-xs">
                  Hello! How are you?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg max-w-xs">
                  I'm doing well! How can I help you today?
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
