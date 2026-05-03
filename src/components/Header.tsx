import React from 'react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { Bell, Languages, Search, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Header: React.FC = () => {
  const { language, setLanguage, activeSection } = useAppContext();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const t = TRANSLATIONS[language];

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'home': return t.home;
      case 'services': return t.services;
      case 'education': return t.education;
      case 'timeline': return t.timeline;
      case 'ai-assistant': return t.aiAssistant;
      case 'booth-finder': return t.boothFinder;
      case 'paste-analyze': return t.pasteAnalyze;
      case 'profile': return t.profile;
      default: return 'Management Console';
    }
  };

  return (
    <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex items-center justify-between px-10 shrink-0 z-30 sticky top-0 shadow-sm shadow-slate-50">
      <h1 className="text-sm font-black text-slate-800 uppercase tracking-[0.3em] italic">{getSectionTitle()}</h1>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['en', 'hi', 'ta'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                "px-2 md:px-3 py-1 rounded text-[9px] md:text-[10px] font-black transition-all uppercase tracking-widest",
                language === lang 
                  ? "bg-white text-teal-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'தமிழ்'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 pl-6 border-l border-slate-100 relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-slate-400 hover:text-primary transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-500 rounded-full border-2 border-white"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-800">{t.notifications}</h4>
                </div>
                <div className="p-6 text-center">
                  <p className="text-xs text-slate-400 font-medium italic">{t.noNotifications}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
