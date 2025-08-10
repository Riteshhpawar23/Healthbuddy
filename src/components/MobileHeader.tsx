import { Settings } from "lucide-react";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface MobileHeaderProps {
  variant?: 'transparent' | 'solid';
  showThemes?: boolean;
}

export default function MobileHeader({ variant = 'transparent', showThemes = true }: MobileHeaderProps) {
  const [open, setOpen] = React.useState(false);
  
  const handleThemeChange = (theme: string) => {
    if (theme === 'Dark') {
      // Dispatch custom event to change video and colors
      window.dispatchEvent(new CustomEvent('themeChange', { 
        detail: { 
          theme: 'dark', 
          video: '/darkv.mp4', 
          sound: true,
          colors: {
            text: 'text-gray-200',
            cardBg: 'bg-gray-900/60',
            buttonBg: 'bg-gray-800/60',
            border: 'border-gray-700'
          }
        } 
      }));
    } else if (theme === 'Water') {
      // Water theme - use water video with sound and blue colors
      window.dispatchEvent(new CustomEvent('themeChange', { 
        detail: { 
          theme: 'water', 
          video: '/waterv.mp4', 
          sound: true,
          colors: {
            text: 'text-blue-100',
            cardBg: 'bg-blue-900/50',
            buttonBg: 'bg-blue-800/50',
            border: 'border-blue-600'
          }
        } 
      }));
    } else {
      // Light theme - use default video and light colors
      window.dispatchEvent(new CustomEvent('themeChange', { 
        detail: { 
          theme: 'light', 
          video: '/indexv.mp4', 
          sound: false,
          colors: {
            text: 'text-white',
            cardBg: 'bg-card/40',
            buttonBg: 'bg-card/30',
            border: 'border-border'
          }
        } 
      }));
    }
    setOpen(false);
  };

  return (
    <header className={`${variant === 'solid' ? 'bg-card/90 backdrop-blur-md border-b border-border' : 'bg-transparent'} px-4 py-3 flex items-center justify-between sticky top-0 z-30`}>
      <SidebarTrigger className={`h-10 w-10 ${variant === 'solid' ? 'text-foreground hover:bg-accent' : 'text-white'}`} />
      
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-wellness rounded-md flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">H</span>
        </div>
        <span className={`font-semibold ${variant === 'solid' ? 'text-foreground' : 'text-white'}`}>Healthbuddy</span>
      </div>
      
      {showThemes && (
        <div className="relative">
          <button
            className={`px-3 py-1 ${variant === 'solid' ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-card/20'} transition`}
            onClick={() => setOpen((v) => !v)}
          >
            Themes
          </button>
          {open && (
            <div className={`absolute right-0 top-full mt-2 w-32 ${variant === 'solid' ? 'bg-card/90 backdrop-blur-md border border-border rounded-md shadow-lg' : 'bg-transparent'} z-50`}>
              <ul className="py-2">
                <li>
                  <button 
                    className={`w-full text-right px-4 py-2 ${variant === 'solid' ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/10'} transition-colors`}
                    onClick={() => handleThemeChange('Light')}
                  >
                    Light
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-right px-4 py-2 ${variant === 'solid' ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/10'} transition-colors`}
                    onClick={() => handleThemeChange('Dark')}
                  >
                    Dark
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-right px-4 py-2 ${variant === 'solid' ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/10'} transition-colors`}
                    onClick={() => handleThemeChange('Water')}
                  >
                    Water
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}