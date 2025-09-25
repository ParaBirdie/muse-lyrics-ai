import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@supabase/supabase-js";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [story, setStory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin");
        return;
      }
      setUser(session.user);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/signin");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Process the story input
    console.log("Story input:", story);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Abstract artistic background elements similar to landing page */}
      <div className="absolute inset-0">
        <div className="absolute top-12 left-16 w-64 h-80 opacity-[0.08]">
          <div className="w-full h-full bg-gradient-to-br from-foreground/30 to-transparent transform rotate-12 rounded-[40px] blur-sm"></div>
          <div className="absolute top-8 left-4 w-16 h-16 bg-foreground/40 rounded-full blur-md"></div>
        </div>
        
        <div className="absolute top-20 right-20 w-96 h-96 opacity-[0.06]">
          <div className="w-full h-full border-4 border-primary/30 rounded-full blur-xl"></div>
          <div className="absolute inset-8 bg-gradient-radial from-primary/20 to-transparent rounded-full"></div>
        </div>
        
        <div className="absolute bottom-32 left-12 w-48 h-32 bg-foreground/10 transform -rotate-6 rounded-2xl blur-lg opacity-60"></div>
        
        <div className="absolute top-1/3 left-1/3 w-72 h-48 opacity-[0.05]">
          <div className="w-full h-full bg-gradient-to-tr from-accent/40 to-primary/30 transform rotate-45 rounded-[60px] blur-2xl"></div>
        </div>
        
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl opacity-[0.03]"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent rounded-full blur-3xl opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center py-6">
          <Logo />
          <Button
            variant="secondary"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-foreground"
          >
            Sign Out
          </Button>
        </div>

        {/* Main content - centered like ChatGPT */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Tell Your Story
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your thoughts into powerful lyrics. What's on your mind?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Tell your story... / Type the theme..."
                  className="w-full py-6 px-6 text-lg bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl backdrop-blur-sm placeholder:text-muted-foreground/60"
                />
                {story && (
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90"
                  >
                    Generate
                  </Button>
                )}
              </div>
            </form>

            {!story && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
                <Button
                  variant="secondary"
                  className="p-6 h-auto flex-col space-y-2 bg-card/30 hover:bg-card/50 border-border/30"
                  onClick={() => setStory("A story about overcoming challenges")}
                >
                  <span className="font-semibold">Inspiration</span>
                  <span className="text-sm text-muted-foreground">Write about overcoming challenges</span>
                </Button>
                <Button
                  variant="secondary"
                  className="p-6 h-auto flex-col space-y-2 bg-card/30 hover:bg-card/50 border-border/30"
                  onClick={() => setStory("Love and relationships")}
                >
                  <span className="font-semibold">Love</span>
                  <span className="text-sm text-muted-foreground">Express feelings and relationships</span>
                </Button>
                <Button
                  variant="secondary"
                  className="p-6 h-auto flex-col space-y-2 bg-card/30 hover:bg-card/50 border-border/30"
                  onClick={() => setStory("Success and ambition")}
                >
                  <span className="font-semibold">Ambition</span>
                  <span className="text-sm text-muted-foreground">Share your dreams and goals</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;