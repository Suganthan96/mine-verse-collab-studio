
import { 
  CreditCard, Home, Image, LogOut, MessageSquare, PlusSquare, 
  Settings, User, Users 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link, useLocation } from "react-router-dom";
import { WalletButton } from "@/components/wallet-button";

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
    <div className={cn("w-64 border-r h-screen flex flex-col p-4", className)}>
      <div className="flex items-center justify-between mb-8 px-2">
        <AppLogo size="md" />
      </div>
      
      <div className="space-y-6 flex-1">
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Dashboard
          </h3>
          <div className="space-y-1">
            <SidebarLink
              href="/"
              icon={<Home size={18} />}
              active={location.pathname === "/"}
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
              icon={<Users size={18} />}
              active={location.pathname === "/artists"}
            >
              Artists
            </SidebarLink>
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Create
          </h3>
          <div className="space-y-1">
            <SidebarLink 
              href="/create-nft" 
              icon={<PlusSquare size={18} />}
              active={location.pathname === "/create-nft"}
            >
              Post NFT
            </SidebarLink>
            <SidebarLink 
              href="/collections" 
              icon={<Image size={18} />}
              active={location.pathname === "/collections"}
            >
              Collections
            </SidebarLink>
            <SidebarLink 
              href="/messages" 
              icon={<MessageSquare size={18} />}
              active={location.pathname === "/messages"}
            >
              Messages
            </SidebarLink>
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Account
          </h3>
          <div className="space-y-1">
            <SidebarLink 
              href="/settings" 
              icon={<Settings size={18} />}
              active={location.pathname === "/settings"}
            >
              Settings
            </SidebarLink>
            <SidebarLink 
              href="/billing" 
              icon={<CreditCard size={18} />}
              active={location.pathname === "/billing"}
            >
              Billing
            </SidebarLink>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t space-y-4">
        <div className="flex justify-center">
          <WalletButton variant="outline" className="w-full" />
        </div>
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
