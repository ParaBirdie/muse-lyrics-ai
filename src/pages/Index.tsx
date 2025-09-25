import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="bg-[#0d1a1f] text-[#e0e0e0] antialiased min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="absolute text-5xl top-[25%] left-[5%] font-bold tracking-wider opacity-[0.05] text-white transform -rotate-[15deg]">JCOLE</span>
        <span className="absolute text-6xl top-[45%] left-[10%] font-bold tracking-wider opacity-[0.05] text-white transform -rotate-[5deg]">LILWAYNE</span>
        <span className="absolute text-4xl bottom-[20%] left-[15%] font-bold tracking-wider opacity-[0.05] text-white transform rotate-[10deg]">BEATS</span>
        <span className="absolute text-4xl bottom-[15%] right-[15%] font-bold tracking-wider opacity-[0.05] text-white transform -rotate-[8deg]">RHYME</span>
        
        {/* Left hanging cable */}
        <svg className="absolute top-0 left-[10%] w-20 h-48 opacity-10" viewBox="0 0 100 200">
          <path d="M50,0 Q20,50 50,100 T50,200" stroke="white" strokeWidth="3" fill="none" />
          <rect x="45" y="195" width="10" height="20" fill="white" />
        </svg>

        {/* Soundwave line */}
        <svg className="absolute bottom-[25%] left-0 w-1/4 h-12 opacity-5" viewBox="0 0 200 50">
           <path d="M0,25 Q25,0 50,25 T100,25 T150,25 T200,25" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 p-6 sm:p-8 flex justify-between items-center">
          <div className="flex flex-col items-start">
            <div 
              className="h-0.5 w-20 mb-2"
              style={{
                background: 'linear-gradient(90deg, transparent, #a6f0c6, transparent)',
                boxShadow: '0 0 15px #a6f0c6, 0 0 20px #a6f0c6'
              }}
            ></div>
            <h1 className="text-3xl font-bold tracking-wider">
              <span className="text-[#a6f0c6] font-bold">Ghost</span>
              <span className="text-[#a6f0c6] font-light">Pen</span>
            </h1>
          </div>
          <button aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center text-center w-full max-w-4xl px-4 mt-20 md:mt-0">
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            {/* Left Text Content */}
            <div className="md:w-1/2 text-center md:text-left z-10 mb-12 md:mb-0">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white mb-6">
                Your story matters. Transform your raw ideas into polished lyrics.
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
                Record your thoughts, choose your style, and watch AI craft your vision into verses.
              </p>
            </div>

            {/* Right Microphone Graphic */}
            <div className="md:w-1/2 flex justify-center items-center z-0 relative">
              <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
                {/* Glowing Microphone SVG */}
                <svg 
                  className="w-full h-full" 
                  viewBox="0 0 64 64" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    filter: 'drop-shadow(0px 0px 10px rgba(227, 255, 240, 0.8)) drop-shadow(0px 0px 20px rgba(166, 240, 198, 0.6))'
                  }}
                >
                  <g strokeWidth="2.5" stroke="#e3fff0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    {/* Main body */}
                    <rect x="20" y="8" width="24" height="36" rx="12"/>
                    {/* A single 'shine' line to add flair */}
                    <path d="M26,18 Q32,20 38,26" strokeWidth="2"/>
                    {/* Stand */}
                    <line x1="32" y1="44" x2="32" y2="56"/>
                    <line x1="24" y1="56" x2="40" y2="56"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 w-full max-w-sm flex flex-col items-center z-10">
            <Link to="/signin" className="w-full">
              <button 
                className="w-full bg-[#a6f0c6] text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5"
                style={{
                  boxShadow: '0 0 15px rgba(166, 240, 198, 0.4), 0 0 20px rgba(166, 240, 198, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(166, 240, 198, 0.6), 0 0 35px rgba(166, 240, 198, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(166, 240, 198, 0.4), 0 0 20px rgba(166, 240, 198, 0.3)';
                }}
              >
                Sign In
              </button>
            </Link>
            <p className="mt-6 text-gray-400">
              Don't have an account?{" "}
              <Link to="/auth" className="font-semibold text-[#a6f0c6] hover:text-white transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="absolute bottom-0 p-6 text-center w-full">
          <p className="text-sm text-gray-400">
            Join thousands of artists already creating with{" "}
            <span className="font-semibold text-white">GhostPen.AI</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;