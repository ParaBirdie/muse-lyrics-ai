import { Logo } from "@/components/ui/logo";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
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

          {/* Simple Auth Buttons */}
          <div className="flex justify-center max-w-md mx-auto">
            <div className="space-y-4 w-full">
              <Link to="/auth">
                <button className="w-full p-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                  Sign In
                </button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/auth" className="text-primary hover:text-primary/80 underline underline-offset-4 hover:no-underline transition-colors">
                  Sign up here
                </Link>
              </p>
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
    </div>
  );
};
export default Index;