import { Logo } from "@/components/ui/logo";
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl opacity-[0.02]"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent rounded-full blur-3xl opacity-[0.02]"></div>
      </div>
      
      {/* Header with logo */}
      <header className="relative z-10 p-6">
        <Logo size="md" />
      </header>
      
      {/* Main content - split layout */}
      <div className="container mx-auto px-6 relative z-10 min-h-[calc(100vh-200px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your story matters.
                <br />
                <span className="text-4xl lg:text-5xl font-normal">Transform your raw ideas into polished lyrics.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Record your thoughts, choose your style, and watch AI craft your vision into verses.
              </p>
            </div>

            {/* Auth buttons */}
            <div className="space-y-4 max-w-sm">
              <Link to="/signin">
                <button className="w-full p-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-lg">
                  Sign In
                </button>
              </Link>
              <p className="text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link to="/auth" className="text-primary hover:text-primary/80 underline underline-offset-4 hover:no-underline transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Microphone icon */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glowing microphone */}
              <div className="w-48 h-48 lg:w-64 lg:h-64 relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                
                {/* Microphone body */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-32 h-48 lg:w-40 lg:h-60 relative">
                    {/* Microphone capsule */}
                    <div className="w-full h-32 lg:h-40 bg-primary/80 rounded-full border-4 border-primary shadow-2xl shadow-primary/50 relative overflow-hidden">
                      {/* Inner glow */}
                      <div className="absolute inset-2 bg-gradient-to-br from-primary/60 to-primary/20 rounded-full"></div>
                      {/* Highlight */}
                      <div className="absolute top-4 left-4 w-6 h-6 bg-white/30 rounded-full blur-sm"></div>
                    </div>
                    
                    {/* Microphone stand */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-16 lg:h-20 bg-primary/60 rounded-b-lg"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-primary/40 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 pb-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            Join thousands of artists already creating with <span className="text-primary font-semibold">GhostPen.AI</span>
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;