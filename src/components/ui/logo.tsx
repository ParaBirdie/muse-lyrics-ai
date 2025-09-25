import { cn } from "@/lib/utils";
interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}
export const Logo = ({
  className,
  size = "md"
}: LogoProps) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl"
  };
  return <div className={cn("relative inline-block", className)}>
      {/* Background artistic brush stroke */}
      <div className="absolute inset-0 -z-10">
        <svg viewBox="0 0 400 100" className="w-full h-full opacity-20" preserveAspectRatio="none">
          <path d="M20,50 Q100,20 200,45 T380,55 Q360,70 200,65 Q100,75 20,50 Z" fill="currentColor" className="text-primary" />
        </svg>
      </div>
      
      {/* Logo text with tech styling */}
      <h1 className={cn("font-bold tracking-tight relative z-10", "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", "drop-shadow-lg", sizeClasses[size])}>
        <span className="font-black">Ghost</span>
        <span className="font-light italic">Pen</span>
        
      </h1>
      
      {/* Tech accent lines */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-40">
        <div className="flex flex-col gap-1">
          <div className="w-8 h-0.5 bg-primary rounded-full"></div>
          <div className="w-6 h-0.5 bg-accent rounded-full ml-2"></div>
          <div className="w-4 h-0.5 bg-primary rounded-full ml-4"></div>
        </div>
      </div>
    </div>;
};