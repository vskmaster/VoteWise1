import React from 'react';
import { useAppContext } from '../context/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';
import OnboardingModal from './OnboardingModal';
import HomeSection from '../sections/HomeSection';
import VoterServices from '../sections/VoterServices';
import Education from '../sections/Education';
import Timeline from '../sections/Timeline';
import AIAssistant from '../sections/AIAssistant';
import BoothFinder from '../sections/BoothFinder';
import PasteAnalyze from '../sections/PasteAnalyze';
import Profile from '../sections/Profile';
import { motion, AnimatePresence } from 'motion/react';

const MainLayout: React.FC = () => {
  const { activeSection, isOnboarded } = useAppContext();

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <HomeSection />;
      case 'services': return <VoterServices />;
      case 'education': return <Education />;
      case 'timeline': return <Timeline />;
      case 'ai-assistant': return <AIAssistant />;
      case 'booth-finder': return <BoothFinder />;
      case 'paste-analyze': return <PasteAnalyze />;
      case 'profile': return <Profile />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-content">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <footer className="mt-auto py-8 text-center text-slate-400 text-[10px] uppercase tracking-widest font-semibold border-t border-slate-100">
            <p>© 2026 VoteWise Election Assistant • Verification & Education Portal</p>
          </footer>
        </div>
      </main>

      {!isOnboarded && <OnboardingModal />}
    </div>
  );
};

export default MainLayout;
