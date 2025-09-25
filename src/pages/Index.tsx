import { Logo } from "@/components/ui/logo";
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Abstract artistic background elements inspired by uploaded images */}
      <div className="absolute inset-0">
        {/* Abstract figure silhouette - inspired by first image */}
        <div className="absolute top-12 left-16 w-64 h-80 opacity-[0.08]">
          <div className="w-full h-full bg-gradient-to-br from-foreground/30 to-transparent transform rotate-12 rounded-[40px] blur-sm"></div>
          <div className="absolute top-8 left-4 w-16 h-16 bg-foreground/40 rounded-full blur-md"></div>
        </div>
        
        {/* Circular light effect - inspired by third image */}
        <div className="absolute top-20 right-20 w-96 h-96 opacity-[0.06]">
          <div className="w-full h-full border-4 border-primary/30 rounded-full blur-xl"></div>
          <div className="absolute inset-8 bg-gradient-radial from-primary/20 to-transparent rounded-full"></div>
        </div>
        
        {/* Dark minimalist shape - inspired by second image */}
        <div className="absolute bottom-32 left-12 w-48 h-32 bg-foreground/10 transform -rotate-6 rounded-2xl blur-lg opacity-60"></div>
        
        {/* Organic flowing shapes - inspired by fourth image */}
        <div className="absolute top-1/3 left-1/3 w-72 h-48 opacity-[0.05]">
          <div className="w-full h-full bg-gradient-to-tr from-accent/40 to-primary/30 transform rotate-45 rounded-[60px] blur-2xl"></div>
        </div>
        
        {/* Original blur elements with reduced opacity */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl opacity-[0.03]"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent rounded-full blur-3xl opacity-[0.03]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 min-h-screen flex flex-col">
        {/* Logo and description positioned lower */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center space-y-6 mt-8">
            <Logo className="flex justify-center" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">Your story matters. 
Transform your raw ideas to polished lyrics. </p>
          </div>
        </div>


        {/* Auth buttons positioned in bottom area */}
        <div className="max-w-4xl mx-auto text-center space-y-12 pb-16">
          <div className="flex justify-center max-w-md mx-auto -mt-4">
            <div className="space-y-4 w-full">
              <Link to="/signin">
                <button className="w-full p-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] py-[12px] my-[20px]">
                  Sign In
                </button>
              </Link>
              <p className="text-sm text-muted-foreground my-0">
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
    </div>;
};
export default Index;