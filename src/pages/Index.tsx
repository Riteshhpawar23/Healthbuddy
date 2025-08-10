import AppSidebar from "@/components/Sidebar";
import WorkingChatInterface from "@/components/WorkingChatInterface";
import MobileHeader from "@/components/MobileHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState('/indexv.mp4');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [themeColors, setThemeColors] = useState({
    text: 'text-white',
    cardBg: 'bg-card/40',
    buttonBg: 'bg-card/30',
    border: 'border-border'
  });

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      const { video, sound, colors } = event.detail;
      setCurrentVideo(video);
      setSoundEnabled(sound);
      setThemeColors(colors);
      
      // Update video element
      if (videoRef.current) {
        videoRef.current.src = video;
        videoRef.current.muted = !sound;
        videoRef.current.load();
        videoRef.current.play();
      }
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full relative" data-theme-colors={JSON.stringify(themeColors)}>
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={!soundEnabled}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20 z-0" />
        {/* Main Content */}
        <div className="relative z-10 flex w-full min-h-screen">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <MobileHeader />
            <WorkingChatInterface themeColors={themeColors} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;