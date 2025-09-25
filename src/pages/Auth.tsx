import { Logo } from "@/components/ui/logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created successfully!",
        description: "You can now sign in with your credentials.",
      });
      
      // Since email confirmation is disabled, redirect to signin
      navigate("/signin");
      
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipForNow = () => {
    navigate("/home"); // Will be created later
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background artistic elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Back Button */}
          <div className="flex justify-start">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>

          {/* Logo/Brand */}
          <div className="space-y-6">
            <Logo className="flex justify-center" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">Your story matters. Transform your raw ideas into polished lyrics. Record your thoughts, choose your style, and watch AI craft your vision into verses.</p>
          </div>

          {/* Auth Form */}
          <div className="flex justify-center max-w-md mx-auto">
            <div className="relative w-full">
              {/* Artistic accent behind form */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-30"></div>
              
              <div className="relative w-full p-8 bg-card border border-border rounded-xl backdrop-blur-sm">
                <form onSubmit={handleCreateAccount} className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">
                      Create Account
                    </h2>
                    <p className="text-muted-foreground">Transform your story into lyrics with AI</p>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      required
                    />
                    <input 
                      type="password" 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      required
                    />
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full p-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                    <button 
                      type="button"
                      onClick={handleSkipForNow}
                      className="w-full p-2 text-muted-foreground hover:text-foreground transition-colors text-sm underline underline-offset-4 hover:no-underline"
                    >
                      Skip for now
                    </button>
                  </div>
                </form>
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
    </div>
  );
};

export default Auth;