import React from 'react';
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Portfolio from './components/Portfolio';
import { BookOpen, User } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Portfolio />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-4">
              து.ந.கோ கவிதைகள்
            </h1>
            <p className="text-2xl text-gray-600 mb-2">T.N.G Poetry Collection</p>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              Poet - Dreamer - Voice of Tamil | கவிஞர் - கனவுகாரர் - தமிழின் குரல்
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setShowLogin(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <User className="w-6 h-6 mr-3" />
                Enter Poetry Portfolio
              </button>
              <p className="text-sm text-gray-500">
                Login to read poems, leave reviews, and connect with other poetry lovers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Read Poetry</h3>
            <p className="text-gray-600">
              Explore beautiful Tamil poems with English translations, covering themes of love, nature, and social justice.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Share Reviews</h3>
            <p className="text-gray-600">
              Leave thoughtful reviews and ratings for poems, and read what other poetry enthusiasts think.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Give Feedback</h3>
            <p className="text-gray-600">
              Provide detailed feedback through our integrated Google Forms to help improve the poetry experience.
            </p>
          </div>
        </div>
      </div>

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </div>
  );
};
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;