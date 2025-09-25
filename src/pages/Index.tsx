import { AuthForm } from "@/components/auth/AuthForm";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      {/* Test content to ensure visibility */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Brand */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white">
              <span style={{ color: '#00ff00' }}>Ghost Writer</span>
              <span style={{ color: '#ffffff' }}>.AI</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transform your raw ideas into polished lyrics. Record your thoughts, 
              choose your style, and watch AI craft your vision into verses.
            </p>
          </div>

          {/* Simple test form instead of AuthForm temporarily */}
          <div className="max-w-md mx-auto">
            <div className="w-full p-8 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-white">
                    Create Account
                  </h2>
                  <p className="text-gray-400">
                    Transform your ideas into lyrics with AI
                  </p>
                </div>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
                  />
                  <button className="w-full p-3 bg-green-500 text-black font-semibold rounded hover:bg-green-400">
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-16 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              Join thousands of artists already creating with Ghost Writer.AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
