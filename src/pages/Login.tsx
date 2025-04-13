
import { AppLogo } from "@/components/app-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletButton } from "@/components/wallet-button";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);

  const simulateWalletConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      });
      navigate("/");
    }, 2000);
  };

  // Animation states
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className={cn(
        "flex-1 flex flex-col items-center justify-center p-4 gap-8",
        "bg-gradient-to-br from-minenft-purple/20 via-minenft-indigo/20 to-minenft-purple/20",
        "dark:from-minenft-purple/10 dark:via-minenft-indigo/10 dark:to-minenft-purple/10",
        show ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000"
      )}>
        <div className={cn(
          "flex flex-col items-center gap-6 max-w-md w-full p-8 rounded-xl glassmorphism",
          "shadow-lg border border-white/20 dark:border-white/10",
          show ? "translate-y-0" : "translate-y-4",
          "transition-transform duration-700"
        )}>
          <AppLogo size="xl" variant="gradient" />
          
          <p className="text-center text-muted-foreground max-w-xs">
            Connect your wallet to collaborate with artists and create unique NFTs
          </p>
          
          <div className="flex flex-col gap-4 w-full mt-4">
            <WalletButton 
              variant="gradient" 
              className="w-full" 
              onClick={simulateWalletConnect}
            />
            
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs text-muted-foreground">
                <span className="bg-background dark:bg-background px-2">
                  or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => navigate("/")}>
                Guest Mode
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Demo Account
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
