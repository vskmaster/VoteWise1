import React, { useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { Home, Settings, BookOpen, Clock, Bot, MapPin, FileText, User, LogOut, Edit2, Upload, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Sidebar: React.FC = () => {
  const { language, activeSection, setActiveSection, user, setUser } = useAppContext();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(user?.name || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'home', label: t.home, icon: <Home className="w-4 h-4" /> },
    { id: 'services', label: t.services, icon: <Settings className="w-4 h-4" /> },
    { id: 'education', label: t.education, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'timeline', label: t.timeline, icon: <Clock className="w-4 h-4" /> },
    { id: 'ai-assistant', label: t.aiAssistant, icon: <Bot className="w-4 h-4" /> },
    { id: 'booth-finder', label: t.boothFinder, icon: <MapPin className="w-4 h-4" /> },
    { id: 'paste-analyze', label: t.pasteAnalyze, icon: <FileText className="w-4 h-4" /> },
    { id: 'profile', label: t.profile, icon: <User className="w-4 h-4" /> },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (user) {
          setUser({ ...user, photo: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-64 bg-slate-950 flex flex-col pt-8 h-full text-slate-50 shrink-0 border-r border-slate-800">
      <div className="px-6 mb-10">
        <div 
          className="flex flex-col items-center gap-4 cursor-pointer group" 
          onClick={() => setActiveSection('home')}
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center font-bold text-slate-900 shadow-2xl group-hover:scale-105 transition-all duration-500 overflow-hidden ring-4 ring-slate-800 p-0">
            <img 
              src="/src/assets/images/regenerated_image_1777787601228.png" 
              alt="Seal of Authority" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tighter text-white leading-none uppercase italic">VoteWise</span>
            <span className="text-[10px] text-teal-500 mt-2 uppercase tracking-[0.4em] font-black">{t.tagline || 'Electoral Authority'}</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar px-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer group mb-1",
              activeSection === item.id && "bg-slate-800 text-white shadow-sm"
            )}
          >
            <div className={cn(
              "mr-4 p-1.5 rounded-md transition-colors",
              activeSection === item.id ? "bg-teal-500 text-white shadow-lg shadow-teal-500/10" : "bg-slate-900 group-hover:bg-slate-700"
            )}>
              {React.cloneElement(item.icon as any, { className: "w-3.5 h-3.5" })}
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase">{item.label}</span>
            {activeSection === item.id && (
              <motion.div layoutId="activePill" className="ml-auto w-1.5 h-1.5 bg-teal-500 rounded-full" />
            )}
          </motion.div>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800 bg-slate-950">
        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
              <div 
                className="relative group/avatar cursor-pointer"
                onClick={() => setActiveSection('profile')}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sm font-bold border border-slate-700 shadow-xl overflow-hidden ring-2 ring-slate-800/50">
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.split(' ').map(n => n[0]).join('')
                  )}
                </div>
              </div>

              <div className="overflow-hidden flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black truncate pr-2 uppercase tracking-tight">{user.name}</div>
                  <button onClick={() => setActiveSection('profile')} className="p-1 text-slate-500 hover:text-teal-400 transition-all hover:scale-110">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[9px] text-teal-400 font-black uppercase tracking-widest leading-none mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {t.verifiedVoter}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setUser(null)}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all"
            >
              <LogOut className="w-3 h-3" /> {t.guestMode}
            </button>
          </div>
        ) : (
          <button 
             onClick={() => setActiveSection('profile')}
             className="w-full py-4 flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl transition-all shadow-xl shadow-teal-500/10 active:scale-95 group font-black text-[10px] uppercase tracking-widest"
          >
            <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
