import { AppLogo } from "@/components/app-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletButton } from "@/components/wallet-button";
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
      
      <div 
        className={cn(
          "relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden",
          show ? "opacity-100" : "opacity-0",
          "transition-opacity duration-1000"
        )}
      >
        {/* Minecraft animated background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.6)' }}
        >
          <source 
            src="https://cdn.gpteng.co/mc-walking.mp4" 
            type="video/mp4"
          />
        </video>
        
        {/* Pixelated overlay pattern */}
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAFpJREFUOE9jZKAQMFKon2HwGcCERvNjsXAGMAIJXOAREA9cBTQAm8QjJANwycPBEDSAEV2ACRqTjFhskJgDugFM0CROaM7Hlv2JNoARl2EMWCTQFTBCxYc9AADRHAw1VpHtFAAAAABJRU5ErkJggg==')] opacity-20" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center max-w-md w-full">
          {/* Title in Minecraft style */}
          <h1 className={cn(
            "font-minecraft text-6xl md:text-7xl mb-8 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]",
            show ? "translate-y-0" : "translate-y-10",
            "transition-transform duration-700"
          )}>
            Mine<span className="text-minenft-purple">NFT</span>
          </h1>
          
          <div className={cn(
            "w-full p-8 rounded-xl glassmorphism backdrop-blur-xl bg-black/20 border border-white/10",
            show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            "transition-all duration-700 delay-300"
          )}>
            <p className="text-center text-white mb-8 font-minecraft">
              Connect your wallet to start your Web3 adventure
            </p>
            
            <WalletButton 
              variant="default" 
              className="w-full h-12 text-lg font-minecraft border-2 border-minenft-purple/50 hover:scale-105 transition-transform shadow-lg"
              onClick={simulateWalletConnect}
            />
          </div>
        </div>
        
        {/* Minecraft-style ground blocks at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#3D2D1D] z-10"></div>
        <div className="absolute bottom-8 left-0 right-0 h-4 bg-[#8B6E4C] z-10"></div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
