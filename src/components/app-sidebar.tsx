
import { 
  Home, Image, PlusSquare, User 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function SidebarLink({ href, icon, children, active }: SidebarLinkProps) {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 mb-1",
          active && "bg-accent text-accent-foreground"
        )}
      >
        {icon}
        <span>{children}</span>
      </Button>
    </Link>
  );
}

interface SidebarProps {
  className?: string;
}

export function AppSidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("w-64 border-r h-screen flex flex-col p-4 bg-sidebar backdrop-blur-sm border-white/10", className)}>
      <div className="flex items-center justify-between mb-8 px-2">
        <AppLogo size="md" />
      </div>
      
      <div className="space-y-6 flex-1">
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground font-minecraft">
            Navigation
          </h3>
          <div className="space-y-1">
            <SidebarLink
              href="/dashboard"
              icon={<Home size={18} />}
              active={["/", "/dashboard", "/home"].includes(location.pathname)}
            >
              Home
            </SidebarLink>
            <SidebarLink 
              href="/profile" 
              icon={<User size={18} />} 
              active={location.pathname === "/profile"}
            >
              Profile
            </SidebarLink>
            <SidebarLink 
              href="/artists" 
              icon={<Image size={18} />}
              active={location.pathname === "/artists"}
            >
              Artists
            </SidebarLink>
            <SidebarLink 
              href="/create-nft" 
              icon={<PlusSquare size={18} />}
              active={location.pathname === "/create-nft"}
            >
              Post NFT
            </SidebarLink>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
