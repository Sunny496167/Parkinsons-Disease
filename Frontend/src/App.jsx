import React, { useState, useEffect } from 'react';
import { Brain, Menu } from 'lucide-react';

// Import components
import Sidebar from './components/Sidebar';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SymptomsPage from './pages/SymptomsPage';
import TreatmentPage from './pages/TreatmentPage';
import ResearchPage from './pages/ResearchPage';

// Main App Component
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('home');

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentRoute]);

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'symptoms':
        return <SymptomsPage />;
      case 'treatment':
        return <TreatmentPage />;
      case 'research':
        return <ResearchPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      <div className="flex flex-col min-h-screen">
        <header className="border-b border-gray-800 bg-black bg-opacity-80 backdrop-blur-sm sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white transition-colors md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-500" />
              <span className="text-lg font-bold">NeuroPredict AI</span>
            </div>

            <div className="w-6" />
          </div>
        </header>

        <main className="flex-1 px-6 py-12 md:ml-64">
          {renderPage()}
        </main>

        <footer className="border-t border-gray-800 px-6 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>NeuroPredict AI - Advanced Parkinson's Disease Prediction System</p>
            <p className="mt-2">For research and educational purposes. Always consult healthcare professionals.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;