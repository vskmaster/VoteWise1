import React from 'react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { ArrowRight, CheckCircle2, Circle, AlertCircle, Sparkles, BookOpen, Search, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const HomeSection: React.FC = () => {
  const { language, checklist, toggleChecklistItem, setActiveSection } = useAppContext();
  const t = TRANSLATIONS[language];

  const completedCount = checklist.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Top Section */}
      <motion.section variants={item} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 glass rounded-[3rem] p-10 lg:p-14 flex flex-col justify-between min-h-[400px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white border-0 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-[2000ms]"></div>
          <div className="absolute inset-0 bg-slate-950/20 mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 text-teal-400 text-[10px] font-black border border-white/10 uppercase tracking-[0.3em] mb-8 shadow-2xl backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>National Election Framework 2026</span>
            </motion.div>
            <h2 className="text-6xl font-black tracking-tighter mb-6 leading-[1.05] text-white italic uppercase">
              {t.headline}
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-lg font-bold italic">
              {t.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-5 relative z-10 mt-auto">
            <button 
              onClick={() => setActiveSection('services')}
              className="bg-teal-500 hover:bg-teal-400 text-white text-[10px] font-black uppercase tracking-[0.3em] px-10 py-5 rounded-2xl transition-all shadow-3xl shadow-teal-500/30 active:scale-95 flex items-center gap-3 group"
            >
              {t.verifyStatus}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => setActiveSection('education')}
              className="bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] px-10 py-5 rounded-2xl border border-white/10 backdrop-blur-xl transition-all active:scale-95"
            >
              {t.startLearning}
            </button>
          </div>
        </div>

        <div className="md:col-span-4 glass rounded-[3rem] p-10 flex flex-col items-center justify-center text-center shadow-xl border border-slate-100 relative overflow-hidden bg-white group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">{t.readiness}</h3>
          
          <div className="relative inline-block mb-10">
            <svg width="200" height="200" className="-rotate-90">
              <circle cx="100" cy="100" r="85" fill="none" stroke="#F8FAFC" strokeWidth="16" />
              <motion.circle 
                cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="16" 
                strokeDasharray="534" 
                initial={{ strokeDashoffset: 534 }}
                animate={{ strokeDashoffset: 534 - (534 * progressPercent) / 100 }}
                transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 }}
                strokeLinecap="round" 
                className="text-teal-500 drop-shadow-[0_0_12px_rgba(20,184,166,0.4)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900 leading-none tabular-nums italic">{progressPercent}%</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Certified</span>
            </div>
          </div>
          
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] mb-3">
            {completedCount} / {checklist.length} REQUIREMENT{checklist.length > 1 ? 'S' : ''} MET
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progressPercent}%` }}
               transition={{ duration: 2, delay: 0.5 }}
               className="h-full bg-teal-500" 
             />
          </div>
        </div>
      </motion.section>

      {/* Middle Section */}
      <motion.section variants={item} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 glass rounded-[3rem] p-10 flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-100 transition-all border border-slate-100 bg-white group min-h-[320px]">
          <div className="flex justify-between items-start mb-10">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
              <Search className="w-7 h-7" />
            </div>
            <span className="text-[9px] text-teal-600 font-black uppercase tracking-[0.3em] bg-teal-50 px-4 py-2 rounded-xl border border-teal-100 shadow-sm">Registry Sync</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight italic">{t.epicVerification}</h3>
            <p className="text-xs text-slate-500 mb-8 leading-relaxed font-bold italic">{t.epiccDesc}</p>
            <button 
              onClick={() => setActiveSection('services')}
              className="w-full bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 group"
            >
              {t.checkReg} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="md:col-span-5 glass rounded-[3rem] p-10 hover:shadow-2xl hover:shadow-slate-100 transition-all border border-slate-100 bg-white min-h-[320px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em]">{t.directActions}</h3>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-slate-100"></div>)}
            </div>
          </div>
          <div className="space-y-4">
            {checklist.map((item) => (
              <motion.button 
                key={item.id}
                whileHover={{ x: 6 }}
                onClick={() => toggleChecklistItem(item.id)}
                className="w-full flex items-center justify-between p-5 rounded-2xl border border-slate-50 hover:border-teal-500/20 hover:bg-teal-50/10 transition-all group text-left shadow-sm"
              >
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                    item.completed ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20" : "bg-white border-2 border-slate-100 group-hover:border-teal-400"
                  )}>
                    {item.completed ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-50 group-hover:bg-teal-100 transition-colors" />}
                  </div>
                  <span className={cn("text-xs font-black transition-all uppercase tracking-widest", item.completed ? "text-slate-300 line-through" : "text-slate-700")}>
                    {item.label}
                  </span>
                </div>
                {!item.completed && <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0" />}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 glass rounded-[3rem] p-10 bg-slate-950 text-white border-0 flex flex-col items-center justify-center text-center group hover:bg-slate-900 transition-all relative overflow-hidden shadow-2xl min-h-[320px]">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center text-teal-400 shadow-3xl mb-8 group-hover:scale-110 transition-all duration-500 shadow-inner">
            <MapPin className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight italic">{t.boothFinder}</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-10 px-4 font-bold italic lowercase">
            {t.boothDesc}
          </p>
          <button 
            onClick={() => setActiveSection('booth-finder')}
            className="flex items-center gap-3 text-[10px] font-black text-teal-400 hover:text-teal-300 transition-all uppercase tracking-[0.3em] py-2 group/btn"
          >
            Locate Station <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-3 transition-transform" />
          </button>
        </div>
      </motion.section>

      {/* Info Banner */}
      <motion.section variants={item} className="glass rounded-[2rem] p-8 border-l-[10px] border-amber-500 bg-white shadow-xl shadow-slate-100">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner shrink-0 border border-amber-100 animate-pulse">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] block mb-2">{t.importantUpdate}</span>
            <p className="text-sm text-slate-800 font-bold leading-relaxed max-w-4xl lowercase italic">
              Ensure your mobile number is strictly linked to your Aadhaar for seamless e-EPIC downloads. Contact the nearest regional facilitating center for specialized authentication support.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomeSection;
