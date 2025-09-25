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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">Your story matters. Transform your raw ideas into polished lyrics. Record your thoughts, choose your style, and watch AI craft your vision into verses.</p>
          </div>
        </div>

        {/* Artist logos scattered randomly across the screen */}
        <div className="relative min-h-[200px] py-0">
          {/* J.COLE logo - top left */}
          <div className="absolute left-12 top-8 opacity-25 transform rotate-[-5deg]">
            <div className="text-2xl font-bold text-foreground tracking-wide">
              J
              <span className="relative">
                C
                <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-foreground rounded-full"></div>
                <div className="absolute -top-2 -right-3 w-2 h-4 border-l-2 border-foreground transform rotate-12"></div>
                <div className="absolute -top-2 right-1 w-2 h-4 border-l-2 border-foreground transform -rotate-12"></div>
              </span>
              OLE
            </div>
          </div>

          {/* CASH MONEY RECORDS - center right */}
          <div className="absolute right-16 top-12 opacity-30 transform rotate-3">
            <div className="border-8 border-foreground p-4 bg-foreground text-background">
              <div className="text-xs font-black tracking-tight">CASH MONEY</div>
              <div className="text-3xl font-black my-1">$</div>
              <div className="text-xs font-black tracking-tight">RECORDS</div>
            </div>
          </div>

          {/* LIL WAYNE - left center */}
          <div className="absolute left-20 top-32 opacity-20 transform rotate-[-6deg]">
            <div className="text-3xl font-black text-foreground tracking-[0.1em]">
              LIL<span className="text-primary">W</span>AYNE
            </div>
          </div>

          {/* DR. DRE - bottom right */}
          <div className="absolute right-20 bottom-20 opacity-22 transform rotate-7">
            <div className="text-2xl font-thin text-foreground tracking-[0.3em]">
              DR
              <span className="relative mx-2">
                <span className="text-primary">⚘</span>
              </span>
              DRE
            </div>
          </div>

         

          {/* Keep the green circular elements from screenshots 6-7 */}
          <div className="absolute top-4 right-8 w-32 h-32 opacity-[0.06]">
            <div className="w-full h-full border-4 border-primary/40 rounded-full"></div>
            <div className="absolute inset-4 bg-gradient-radial from-primary/20 to-transparent rounded-full"></div>
          </div>

        </div>

        {/* Auth buttons positioned in bottom area */}
        <div className="max-w-4xl mx-auto text-center space-y-12 pb-16">
          <div className="flex justify-center max-w-md mx-auto">
            <div className="space-y-4 w-full">
              <Link to="/signin">
                <button className="w-full p-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] py-[12px]">
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
    </div>;
};
export default Index;