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
            <button className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-xl hover:bg-card/80 transition-all group min-w-[100px]">
              <Mic className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
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