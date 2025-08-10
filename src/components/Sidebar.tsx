import { 
  MessageCircle, 
  Stethoscope, 
  Palette, 
  Music, 
  Target, 
  BookOpen, 
  Edit3, 
  Hash, 
  Sparkles, 
  Users, 
  Settings
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { icon: MessageCircle, label: "Chat", href: "/", active: true },
  { icon: Stethoscope, label: "Doctor Consultation", href: "/consultation" },
  { icon: Palette, label: "Doodle", href: "/doodle" },
  { icon: Music, label: "Music", href: "/music" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: BookOpen, label: "Journaling", href: "/journal" },
  { icon: Edit3, label: "Write", href: "/write" },
  { icon: Hash, label: "Tags", href: "/tags" },
  { icon: Sparkles, label: "Magic", href: "/magic" },
  { icon: Users, label: "Team", href: "/team" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
  <Sidebar className="border-r border-border bg-transparent">
      {/* Header */}
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-wellness rounded-lg flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="font-semibold text-foreground truncate">Healthbuddy</h1>
              <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                AI Chat Beta
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Wellness Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton 
                      asChild
                      className={active 
                        ? "bg-primary text-primary-foreground shadow-soft" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }
                    >
                      <Link to={item.href} className="flex items-center gap-3">
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center gap-3 p-3 bg-therapeutic rounded-lg">
          <div className="w-8 h-8 bg-gradient-calm rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-calm-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-therapeutic-foreground truncate">
                Your wellness journey
              </p>
              <p className="text-xs text-therapeutic-foreground/70">
                Day 12 streak! 🌟
              </p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}