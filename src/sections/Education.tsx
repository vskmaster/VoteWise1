import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS, EDUCATION_MODULES } from '../constants';
import { Play, CheckCircle2, ArrowRight, HelpCircle, GraduationCap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Education: React.FC = () => {
  const { language, setActiveSection } = useAppContext();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const t = TRANSLATIONS[language];
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="max-w-2xl relative z-10">
          <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">Voter Education Hub</h2>
          <p className="text-slate-500 text-sm font-medium">Master the democratic process through interactive guides, visual modules, and AI-powered learning path.</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <button 
            onClick={() => setActiveSection('ai-assistant')}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-teal-400" />
            Ask VoteWise AI
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDUCATION_MODULES.map((module, i) => (
          <motion.div 
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass rounded-[2rem] overflow-hidden group flex flex-col h-full shadow-lg hover:shadow-2xl hover:shadow-slate-200 transition-all border-slate-50 bg-white"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={module.image} alt={module.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000" />
              <div className="absolute inset-0 bg-slate-950/40 opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setSelectedVideo(module.videoUrl)}
                  className="w-14 h-14 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-teal-500 hover:border-teal-400 transition-all group/play"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5 group-hover/play:scale-110 transition-transform" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] uppercase font-black text-white tracking-widest border border-white/20">
                  {module.duration}
                </span>
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <h3 className="text-lg font-black text-slate-800 mb-2 uppercase tracking-tight">{module.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">{module.desc}</p>
              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-teal-600 flex items-center gap-1.5 uppercase tracking-[0.15em]">
                  <CheckCircle2 className="w-4 h-4" /> Recommended
                </span>
                <button 
                  onClick={() => setSelectedVideo(module.videoUrl)}
                  className="p-2 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-[3.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col justify-between overflow-hidden relative border-0 shadow-2xl min-h-[400px]"
        >
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-5xl font-black mb-4 uppercase tracking-tighter italic leading-tight text-teal-400">{t.journeyTitle}</h3>
              <p className="text-white text-base mb-10 max-w-md leading-relaxed font-black uppercase tracking-tight italic">
                {t.journeyDesc}
              </p>
            </div>
            <button 
              onClick={() => setActiveSection('timeline')}
              className="px-10 py-6 bg-teal-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.35em] flex items-center gap-6 group hover:bg-teal-400 transition-all shadow-3xl shadow-teal-500/20 active:scale-95"
            >
              {t.startExplorer}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </button>
          </div>
          
          <div className="mt-12 flex gap-3 overflow-hidden -mx-2 pb-2">
            {[1, 2, 3, 4, 5, 6].map(step => (
              <div key={step} className="shrink-0 w-16 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                {step <= 3 && <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 1.5, delay: step * 0.3 }} className="absolute inset-0 bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.6)]"></motion.div>}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group hover:bg-slate-50/50 transition-all"
        >
          <div className="p-6 bg-slate-50 rounded-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <GraduationCap className="w-12 h-12 text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Electoral Quiz</h3>
          <p className="text-xs text-slate-500 max-w-xs mb-8 leading-relaxed font-medium">Test your electoral awareness and earn your exclusive Smart Voter digital badge.</p>
          <button className="px-8 py-3.5 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed border border-slate-200">
            {t.comingSoon}
          </button>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden relative shadow-2xl aspect-video"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe 
                src={`${selectedVideo}?autoplay=1`}
                title="Voter Education Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Education;
