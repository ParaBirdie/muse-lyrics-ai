import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Square } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [story, setStory] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [randomEmotions, setRandomEmotions] = useState<Array<{title: string, description: string, prompt: string}>>([]);
  const [isInitialVisit, setIsInitialVisit] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [verse2, setVerse2] = useState("");
  const [isGeneratingVerse2, setIsGeneratingVerse2] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Emotion categories pool
  const emotionCategories = [
    { title: "Inspiration", description: "Write about overcoming challenges", prompt: "A story about overcoming challenges and rising above adversity" },
    { title: "Love", description: "Express feelings and relationships", prompt: "Love and relationships, deep connections with someone special" },
    { title: "Ambition", description: "Share your dreams and goals", prompt: "Success and ambition, chasing dreams and achieving goals" },
    { title: "Nostalgia", description: "Reflect on cherished memories", prompt: "Nostalgic memories from childhood or better times" },
    { title: "Freedom", description: "Celebrate independence", prompt: "Breaking free from constraints and finding true independence" },
    { title: "Heartbreak", description: "Process pain and healing", prompt: "Heartbreak, loss, and the journey toward healing" },
    { title: "Adventure", description: "Embrace new experiences", prompt: "Adventure and exploring new places or experiences" },
    { title: "Hope", description: "Find light in darkness", prompt: "Hope and optimism during difficult times" },
    { title: "Rebellion", description: "Challenge the status quo", prompt: "Rebellion against society or fighting for what's right" },
    { title: "Family", description: "Honor your roots", prompt: "Family bonds, heritage, and the people who shaped you" },
    { title: "Dreams", description: "Chase your aspirations", prompt: "Following dreams and never giving up on aspirations" },
    { title: "Victory", description: "Celebrate achievements", prompt: "Victory and triumph after a long struggle" }
  ];

  // Generate 3 random emotions on component mount
  useEffect(() => {
    const shuffled = [...emotionCategories].sort(() => 0.5 - Math.random());
    setRandomEmotions(shuffled.slice(0, 3));
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!story.trim()) {
      toast({
        title: "Please enter a story",
        description: "Tell us what you'd like your lyrics to be about",
        variant: "destructive",
      });
      return;
    }

    if (story.trim().length < 5) {
      toast({
        title: "Story too short",
        description: "Please provide more details about your story or theme",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-lyrics', {
        body: { story: story.trim() }
      });

      if (error) throw error;

      if (data?.lyrics) {
        setLyrics(data.lyrics);
        toast({
          title: "Lyrics generated!",
          description: "Your personalized lyrics are ready",
          duration: 1500,
        });
      } else {
        throw new Error('No lyrics received');
      }
      
    } catch (error: any) {
      console.error('Error generating lyrics:', error);
      toast({
        title: "Failed to generate lyrics",
        description: error.message || "Please try again with a different theme",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    setLyrics("");
    setStory("");
    setVerse2(""); // Clear verse 2 as well
    setIsInitialVisit(false); // Disable animations when returning from lyrics page
  };

  const handleGenerateVerse2 = async () => {
    if (!story.trim()) {
      toast({
        title: "No story found",
        description: "Please generate the first verse and hook first",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingVerse2(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-lyrics', {
        body: { 
          story: story.trim(),
          generateVerse2: true // Flag to indicate we want verse 2
        }
      });

      if (error) throw error;

      if (data?.lyrics) {
        setVerse2(data.lyrics);
        toast({
          title: "Verse 2 generated!",
          description: "Your complete song is ready",
        });
      } else {
        throw new Error('No verse 2 received');
      }
      
    } catch (error: any) {
      console.error('Error generating verse 2:', error);
      toast({
        title: "Failed to generate verse 2",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingVerse2(false);
    }
  };

  // Audio recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setIsListening(false); // Hide "I'm listening..." when transcription starts
        setIsTranscribing(true); // Show "Transcribing..." 
        await transcribeAudio(audioBlob);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      setIsRecording(true);
      setIsListening(true);
      mediaRecorder.start();

    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('speech-to-text', {
          body: { audio: base64Audio }
        });

        if (error) throw error;

        if (data?.text) {
          setStory(data.text);
          setIsTranscribing(false); // Hide "Transcribing..."
          toast({
            title: "Speech Transcribed",
            description: "Your speech has been converted to text!",
          });
        } else {
          setIsTranscribing(false);
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setIsTranscribing(false); // Hide "Transcribing..." on error
      toast({
        title: "Transcription Error",
        description: "Failed to transcribe audio. Please try again.",
        variant: "destructive",
      });
    }
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

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex flex-col pb-16">
        {/* Header */}
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center gap-4">
            {lyrics && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegenerate}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Logo />
          </div>
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
          {!lyrics ? (
            <div className="space-y-8 text-center">
              <div className="space-y-4">
                <div className="typewriter-container inline-block">
                  <h1 className={`text-4xl md:text-6xl font-bold font-inter bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent ${isInitialVisit ? 'typewriter-text' : 'no-typewriter'} ${isInputFocused ? 'cursor-hidden' : ''}`}>
                    Tell Your Story
                  </h1>
                </div>
              </div>

              <div className={`${isInitialVisit ? 'opacity-0 animate-fade-in-up' : ''}`} style={isInitialVisit ? {animationDelay: '2.7s', animationFillMode: 'forwards'} : {}}>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Transform your thoughts into powerful lyrics. What's on your mind?
                </p>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                  <div className="relative">
                    {/* Show textarea only when recording, listening, or transcribing */}
                    {(isRecording || isListening || isTranscribing) ? (
                      <textarea
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        placeholder="Tell your story... / Type the theme..."
                        className="w-full py-8 px-8 pr-32 text-lg bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl backdrop-blur-sm placeholder:text-muted-foreground/60 resize-none custom-scrollbar"
                        rows={3}
                      />
                    ) : (
                      <textarea
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        placeholder="Tell your story... / Type the theme..."
                        className="w-full py-4 px-6 pr-32 text-base bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl backdrop-blur-sm placeholder:text-muted-foreground/60 resize-none custom-scrollbar"
                        rows={2}
                      />
                    )}
                    
                    {/* Microphone Button - only show when not recording/listening/transcribing and no text */}
                    {!isRecording && !isListening && !isTranscribing && !story && (
                      <Button
                        type="button"
                        onClick={startRecording}
                        className="absolute right-20 top-1/2 -translate-y-1/2 w-10 h-10 p-0 rounded-full bg-secondary hover:bg-secondary/80"
                      >
                        <Mic className="w-4 h-4" />
                      </Button>
                    )}

                    {/* Generate Button - only show when there's text and not in recording states */}
                    {story && !isRecording && !isListening && !isTranscribing && (
                      <Button
                        type="submit"
                        disabled={isGenerating}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 disabled:opacity-50"
                      >
                        {isGenerating ? "Generating..." : "Generate"}
                      </Button>
                    )}
                  </div>

                  {/* Listening indicator and I'm done button */}
                  {isListening && (
                    <div className="text-center mt-4 space-y-3">
                      <p className="text-green-400 font-medium animate-pulse">I'm listening...</p>
                      <Button
                        type="button"
                        onClick={stopRecording}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                      >
                        I'm done
                      </Button>
                    </div>
                  )}

                  {/* Transcribing indicator */}
                  {isTranscribing && (
                    <div className="text-center mt-4">
                      <p className="text-blue-400 font-medium animate-pulse">Transcribing...</p>
                    </div>
                  )}
                </form>

                {!story && !isGenerating && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
                    {randomEmotions.map((emotion, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        className="p-6 h-auto flex-col space-y-2 bg-card/30 hover:bg-card/50 border-border/30"
                        onClick={() => setStory(emotion.prompt)}
                      >
                        <span className="font-semibold">{emotion.title}</span>
                        <span className="text-sm text-muted-foreground">{emotion.description}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center animate-fade-in-up">
              <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Your Generated Lyrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-left space-y-4">
                    {(() => {
                      let lyricLineCount = 0;
                      const originalLyrics = lyrics.split('\n').filter(line => line.trim()).map((line, index) => {
                        if (line.startsWith('Verse:')) {
                          return (
                            <div key={index} className="font-bold text-xl text-green-400 mb-2">
                              {line}
                            </div>
                          );
                        } else if (line.startsWith('Hook:')) {
                          return (
                            <div key={index} className="font-bold text-xl text-green-400 mb-2 mt-6">
                              {line}
                            </div>
                          );
                        } else {
                          // This is an actual lyric line, increment counter
                          lyricLineCount++;
                          // Add separator every 4 actual lyric lines
                          const isBarSeparator = lyricLineCount > 1 && (lyricLineCount - 1) % 4 === 0;
                          
                          return (
                            <div key={index}>
                              {isBarSeparator && (
                                <div className="w-full h-px bg-border/20 my-4"></div>
                              )}
                              <p className="text-foreground leading-relaxed ml-4">
                                {line}
                              </p>
                            </div>
                          );
                        }
                      });

                      // If verse 2 exists, add it after the original lyrics
                      if (verse2) {
                        const hookFromOriginal = lyrics.split('\n').filter(line => line.trim() && line.startsWith('Hook:')).join('\n');
                        const hookLines = lyrics.split('\n').filter(line => line.trim() && !line.startsWith('Verse:') && !line.startsWith('Hook:'));
                        const hookContent = hookLines.slice(-4); // Get last 4 lines as hook content
                        
                        // Add Verse 2
                        originalLyrics.push(
                          <div key="verse2-title" className="font-bold text-xl text-green-400 mb-2 mt-8">
                            Verse 2:
                          </div>
                        );
                        
                        const verse2Lines = verse2.split('\n').filter(line => line.trim());
                        verse2Lines.forEach((line, index) => {
                          lyricLineCount++;
                          const isBarSeparator = lyricLineCount > 1 && (lyricLineCount - 1) % 4 === 0;
                          
                          originalLyrics.push(
                            <div key={`verse2-${index}`}>
                              {isBarSeparator && (
                                <div className="w-full h-px bg-border/20 my-4"></div>
                              )}
                              <p className="text-foreground leading-relaxed ml-4">
                                {line}
                              </p>
                            </div>
                          );
                        });

                        // Repeat Hook
                        originalLyrics.push(
                          <div key="hook-repeat" className="font-bold text-xl text-green-400 mb-2 mt-6">
                            Hook:
                          </div>
                        );
                        
                        hookContent.forEach((line, index) => {
                          lyricLineCount++;
                          const isBarSeparator = lyricLineCount > 1 && (lyricLineCount - 1) % 4 === 0;
                          
                          originalLyrics.push(
                            <div key={`hook-repeat-${index}`}>
                              {isBarSeparator && (
                                <div className="w-full h-px bg-border/20 my-4"></div>
                              )}
                              <p className="text-foreground leading-relaxed ml-4">
                                {line}
                              </p>
                            </div>
                          );
                        });
                      }

                      return originalLyrics;
                    })()}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex gap-8 justify-center mb-8">
                <Button
                  onClick={handleRegenerate}
                  variant="secondary"
                  className="bg-card/30 hover:bg-card/50 border-border/30"
                >
                  Create New Lyrics
                </Button>
                <Button
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  disabled={isGenerating}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isGenerating ? "Regenerating..." : "Regenerate"}
                </Button>
                {!verse2 && (
                  <Button
                    onClick={handleGenerateVerse2}
                    disabled={isGeneratingVerse2}
                    className="bg-accent hover:bg-accent/90"
                  >
                    {isGeneratingVerse2 ? "Generating..." : "Generate Verse 2"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;