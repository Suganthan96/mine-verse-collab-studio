
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface AddressDisplayProps {
  address: string;
  truncate?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AddressDisplay({ 
  address, 
  truncate = true, 
  className,
  size = "md" 
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const displayAddress = truncate 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : address;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast({
      description: "Address copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const sizeClasses = {
    sm: "text-xs py-0.5 px-1.5",
    md: "text-sm py-1 px-2.5",
    lg: "text-base py-1.5 px-3", 
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-secondary hover:bg-secondary/80 transition-colors font-mono", 
        sizeClasses[size],
        className
      )}
    >
      <span className="text-secondary-foreground">{displayAddress}</span>
      <button 
        onClick={copyToClipboard} 
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Copy address to clipboard"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
