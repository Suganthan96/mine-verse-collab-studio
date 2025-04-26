import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface WalletButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "gradient";
}

export function WalletButton({ 
  className, 
  variant = "default",
  ...props 
}: WalletButtonProps) {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const isConnected = localStorage.getItem("walletConnected") === "true";
    if (isConnected) {
      const mockAddress = "0x" + Math.random().toString(16).substring(2, 14);
      setAddress(mockAddress);
      setConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    setConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).substring(2, 14);
      setAddress(mockAddress);
      setConnected(true);
      setConnecting(false);
      localStorage.setItem("walletConnected", "true");
    }, 1500);
  };

  const disconnectWallet = () => {
    localStorage.removeItem("walletConnected");
    setConnected(false);
    setAddress("");
    navigate("/login");
  };

  const truncateAddress = (addr: string) => {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  if (connected) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={cn("flex items-center gap-2", className)}
        onClick={disconnectWallet}
        {...props}
      >
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-slow" />
        <span className="font-medium">{truncateAddress(address)}</span>
      </Button>
    );
  }

  return (
    <Button
      variant={variant === "gradient" ? "default" : variant}
      className={cn(
        "min-w-[140px]",
        variant === "default" || variant === "gradient" ? "bg-gradient-to-r from-minenft-purple to-minenft-indigo text-white hover:opacity-90" : "",
        className
      )}
      onClick={connectWallet}
      disabled={connecting}
      {...props}
    >
      {connecting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="mr-2 h-4 w-4" />
      )}
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
