import { AuthForm } from "@/components/auth/AuthForm";
import { Logo } from "@/components/ui/logo";
import { Mic } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background artistic elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Logo/Brand */}
          <div className="space-y-6">
            <Logo className="flex justify-center" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">Your story matters. Transform your raw ideas into polished lyrics. Record your thoughts, choose your style, and watch AI craft your vision into verses.</p>
          </div>

          {/* Auth Form */}
          <div className="flex items-center justify-center gap-6 max-w-2xl mx-auto">
            {/* Skip Microphone Button */}
            <button className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-xl hover:bg-card/80 transition-all group min-w-[100px] mx-0 px-0 py-[10px]">
              {/* Custom Devil Mic Icon */}
              <div className="h-6 w-6 mb-2 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                  {/* Devil horns */}
                  <path d="M6 8C6 6 7 4 8 3C8.5 2.5 9 3 8.5 4C8 5 7.5 6 8 7C8.5 6.5 9 7 8.5 8L6 8Z" fill="currentColor" className="text-accent opacity-80"/>
                  <path d="M18 8C18 6 17 4 16 3C15.5 2.5 15 3 15.5 4C16 5 16.5 6 16 7C15.5 6.5 15 7 15.5 8L18 8Z" fill="currentColor" className="text-accent opacity-80"/>
                  
                  {/* Microphone body */}
                  <rect x="9" y="6" width="6" height="10" rx="3" fill="currentColor" className="text-primary"/>
                  <rect x="10" y="7" width="4" height="8" rx="2" fill="currentColor" className="text-primary opacity-60"/>
                  
                  {/* Microphone stand */}
                  <path d="M12 16V19M8 19H16M12 16C15.314 16 18 13.314 18 10V8M6 8V10C6 13.314 8.686 16 12 16Z" 
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                  
                  {/* Evil grin */}
                  <path d="M10.5 11C10.5 11 11.5 12 12.5 11" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" className="text-accent"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-muted-foreground">Skip</span>
            </button>
            
            {/* Create Account Form */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                {/* Artistic accent behind form */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-30"></div>
                
                <div className="relative w-full p-8 bg-card border border-border rounded-xl backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-3xl font-bold text-foreground">
                        Create Account
                      </h2>
                      <p className="text-muted-foreground">Transform your story into lyrics with AI</p>
                    </div>
                    <div className="space-y-4">
                      <input type="email" placeholder="Enter your email" className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                      <input type="password" placeholder="Enter your password" className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                      <button className="w-full p-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-16 border-t border-border">
            <p className="text-muted-foreground text-sm my-0 px-0 py-0">
              Join thousands of artists already creating with <span className="text-primary font-semibold">GhostPen.AI</span>
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;