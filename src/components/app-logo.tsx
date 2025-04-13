
import { cn } from "@/lib/utils";

interface AppLogoProps {
  variant?: "default" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function AppLogo({ variant = "default", size = "md", className }: AppLogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <div className={cn("font-bold flex items-center", sizeClasses[size], className)}>
      {variant === "gradient" ? (
        <span className="bg-gradient-to-r from-minenft-purple to-minenft-indigo bg-clip-text text-transparent">
          Mine<span className="font-extrabold">NFT</span>
        </span>
      ) : (
        <span>
          Mine<span className="font-extrabold text-primary">NFT</span>
        </span>
      )}
    </div>
  );
}
