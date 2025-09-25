import { Logo } from "@/components/ui/logo";
import { Link } from "react-router-dom";
const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0">
        {/* Geometric line patterns - very subtle */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform -rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transform rotate-45"></div>
        </div>
      </div>
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">GhostPen</div>
          <div className="w-8 h-8 flex flex-col justify-center space-y-1.5">
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="min-h-screen flex">
        {/* Left side content */}
        <div className="flex-1 flex items-center px-16">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold leading-tight mb-8">
              Your story matters.<br />
              Transform your raw ideas<br />
              into polished lyrics.
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-16">
              Record your thoughts, choose your style, and<br />
              watch AI craft your vision into verses.
            </p>
          </div>
        </div>
        
        {/* Right side microphone */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Microphone glow effect */}
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-3xl scale-150"></div>
            
            {/* Microphone icon */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg 
                viewBox="0 0 100 100" 
                className="w-32 h-32 text-emerald-400"
                fill="currentColor"
              >
                {/* Microphone capsule */}
                <rect x="40" y="20" width="20" height="35" rx="10" ry="10" stroke="currentColor" strokeWidth="3" fill="none"/>
                
                {/* Microphone stand */}
                <line x1="50" y1="55" x2="50" y2="75" stroke="currentColor" strokeWidth="3"/>
                
                {/* Microphone base */}
                <line x1="35" y1="75" x2="65" y2="75" stroke="currentColor" strokeWidth="3"/>
                
                {/* Sound waves */}
                <path d="M25 35 Q20 40 25 45" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M75 35 Q80 40 75 45" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M20 30 Q12 40 20 50" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
                <path d="M80 30 Q88 40 80 50" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom section with auth buttons */}
      <div className="absolute bottom-0 left-0 right-0 pb-16">
        <div className="text-center space-y-8">
          {/* Sign In Button */}
          <div className="flex justify-center">
            <Link to="/signin" className="w-96">
              <button className="w-full py-4 px-8 bg-emerald-400 text-slate-900 font-semibold rounded-full text-lg hover:bg-emerald-300 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Sign In
              </button>
            </Link>
          </div>
          
          {/* Sign up link */}
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/auth" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 hover:no-underline transition-colors">
              Sign up here
            </Link>
          </p>
          
          {/* Footer */}
          <div className="pt-8">
            <p className="text-gray-500 text-sm">
              Join thousands of artists already creating with <span className="text-emerald-400 font-semibold">GhostPen.AI</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;