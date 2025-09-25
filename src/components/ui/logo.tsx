import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo = ({ className, size = "lg" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl", 
    lg: "text-6xl",
    xl: "text-8xl"
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Abstract feather/pen pattern */}
      <div className="absolute inset-0 -z-10">
        <svg 
          viewBox="0 0 400 100" 
          className="w-full h-full opacity-15"
          preserveAspectRatio="none"
        >
          {/* Main quill shaft */}
          <path
            d="M50,50 Q200,45 350,48"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary"
          />
          {/* Abstract feather lines */}
          <path
            d="M80,45 Q120,35 160,40 M80,55 Q120,65 160,60 M200,42 Q240,32 280,37 M200,58 Q240,68 280,63 M300,45 Q320,40 340,42 M300,55 Q320,60 340,58"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-accent opacity-60"
          />
          {/* Subtle feather texture */}
          <path
            d="M70,48 L90,46 M70,52 L90,54 M180,46 L200,44 M180,54 L200,56 M280,46 L300,44 M280,54 L300,56"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary opacity-40"
          />
        </svg>
      </div>
      
      {/* Logo text with seamless styling */}
      <h1 className={cn(
        "font-bold tracking-tight relative z-10",
        "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent",
        "drop-shadow-lg",
        sizeClasses[size]
      )}>
        <span className="font-black">Ghost</span>
        <span className="font-light italic">Pen</span>
        <span className="text-xs opacity-40 ml-1 -translate-y-2 inline-block">ai</span>
      </h1>
      
      {/* Minimal accent dot */}
      <div className="absolute -right-1 top-1/4 opacity-60">
        <div className="w-1 h-1 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};