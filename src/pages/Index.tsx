
import { WalletButton } from "@/components/wallet-button";
import { AppLogo } from "@/components/app-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Layout } from "@/components/layout";
import { useState, useEffect } from "react";

const Index = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout hideSidebar>
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Minecraft-style background with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1619197079695-0ecae31d4fc3?q=80&w=1920&auto=format&fit=crop')`,
            filter: 'brightness(0.6)'
          }}
        />
        
        {/* Pixelated overlay pattern */}
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAFpJREFUOE9jZKAQMFKon2HwGcCERvNjsXAGMAIJXOAREA9cBTQAm8QjJANwycPBEDSAEV2ACRqTjFhskJgDugFM0CROaM7Hlv2JNoARl2EMWCTQFTBCxYc9AADRHAw1VpHtFAAAAABJRU5ErkJggg==')] opacity-20" />
        
        {/* Content */}
        <div className={`relative z-10 flex flex-col items-center max-w-lg text-center ${show ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="font-minecraft text-5xl md:text-7xl mb-8 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Mine<span className="text-minenft-purple">NFT</span>
          </h1>
          
          <p className="text-white mb-12 text-lg md:text-xl max-w-md mx-auto drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            Connect your wallet to start collaborating with artists and create unique pixel art NFTs
          </p>
          
          <div className="space-y-4">
            <WalletButton 
              className="min-w-[200px] h-12 text-lg border-2 border-white/20 shadow-lg hover:scale-105 transition-transform"
              variant="default"
            />
          </div>
        </div>
        
        {/* Pixelated bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#3D2D1D] z-10"></div>
        <div className="absolute bottom-8 left-0 right-0 h-4 bg-[#8B6E4C] z-10"></div>
      </div>
    </Layout>
  );
};

export default Index;
