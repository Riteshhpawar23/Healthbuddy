import React from "react";
import JournalInterface from "../components/JournalInterface";
import AppSidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { SidebarProvider } from "@/components/ui/sidebar";


// Animated floating particles
const ParticleBackground = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <span
        key={i}
        className="absolute rounded-full opacity-30 animate-float"
        style={{
          width: `${16 + Math.random() * 32}px`,
          height: `${16 + Math.random() * 32}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)`,
          filter: 'blur(2px)',
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
    {/* Gentle light rays */}
    <div className="absolute left-1/2 top-0 w-2/3 h-1/2 -translate-x-1/2 bg-gradient-to-b from-yellow-100 via-transparent to-transparent opacity-20 blur-2xl animate-rays" />
  </div>
);

const JournalPage = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full relative bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100">
        {/* Animated Background */}
        <ParticleBackground />
        {/* Main Content */}
        <div className="relative z-10 flex w-full min-h-screen">
          {/* Sidebar */}
          <AppSidebar />
          {/* Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Mobile Header with solid background and no themes */}
            <MobileHeader variant="solid" showThemes={false} />
            {/* Journal Content */}
            <div className="w-full max-w-3xl bg-white/80 rounded-2xl shadow-xl p-8 mt-8 mb-8 backdrop-blur-md border border-pink-100 mx-auto">
              <h1 className="text-3xl font-bold text-pink-500 mb-4 text-center">Your Journal</h1>
              <JournalInterface />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default JournalPage;
