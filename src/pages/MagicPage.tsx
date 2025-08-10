import React from "react";
import Magic from "../components/Magic";
import AppSidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

const MagicPage = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full relative">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-background via-background/95 to-muted z-0" />
        
        {/* Main Content */}
        <div className="relative z-10 flex w-full min-h-screen">
          {/* Sidebar */}
          <AppSidebar />
          
          {/* Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Mobile Header with solid background and no themes */}
            <MobileHeader variant="solid" showThemes={false} />
            
            {/* Magic Content */}
            <Magic />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MagicPage;
