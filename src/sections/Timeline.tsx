import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { INITIAL_TIMELINE } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Info, Sparkles, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { chatWithAI } from '../services/geminiService';

const Timeline: React.FC = () => {
  const { language } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getAIExplanation = async (stepTitle: string, id: string) => {
    if (aiExplanations[id] || loadingId) return;
    
    setLoadingId(id);
    try {
      const response = await chatWithAI([
        { role: 'user', content: `Explain the "${stepTitle}" phase of an Indian election journey in simple terms for a first-time voter.` }
      ]);
      setAiExplanations(prev => ({ ...prev, [id]: response || "Explanation unavailable." }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight italic">Electoral Lifecycle</h2>
          <p className="text-slate-500 text-sm font-medium">An authoritative guide to the procedural phases of Indian democratic elections.</p>
        </div>
        <div className="text-[10px] font-black text-teal-600 bg-teal-50 px-4 py-2 rounded-xl uppercase tracking-widest border border-teal-100 shadow-sm whitespace-nowrap">
          Phase {expandedId || '0'} of {INITIAL_TIMELINE.length}
        </div>
      </div>

      <div className="space-y-6">
        {/* Horizontal Progress Overview */}
        <div className="glass p-8 rounded-[2rem] flex items-center gap-2 mb-10 overflow-x-auto custom-scrollbar no-scrollbar bg-slate-950 border-0 shadow-2xl">
          {INITIAL_TIMELINE.map((step, i) => (
            <React.Fragment key={step.id}>
              <div 
                onClick={() => setExpandedId(step.id)}
                className="flex flex-col items-center gap-3 min-w-[90px] cursor-pointer group"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all border-2",
                  expandedId === step.id 
                    ? "bg-teal-500 border-teal-400 text-white shadow-lg shadow-teal-500/20 scale-110" 
                    : i < INITIAL_TIMELINE.findIndex(s => s.id === expandedId)
                      ? "bg-slate-800 border-slate-700 text-teal-400"
                      : "bg-slate-900 border-slate-800 text-slate-600 group-hover:border-slate-700"
                )}>
                  {i + 1}
                </div>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest text-center transition-colors px-2",
                  expandedId === step.id ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300"
                )}>
                  {step.title.split(' ')[0]}
                </span>
              </div>
              {i < INITIAL_TIMELINE.length - 1 && (
                <div className={cn(
                  "h-0.5 w-12 rounded-full transition-colors shrink-0",
                  i < INITIAL_TIMELINE.findIndex(s => s.id === expandedId) ? "bg-teal-500/50" : "bg-slate-800"
                )}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Detailed Accordion */}
        <div className="space-y-4">
          {INITIAL_TIMELINE.map((step, i) => (
            <motion.div 
              key={step.id}
              className={cn(
                "glass rounded-[2rem] transition-all duration-300 overflow-hidden bg-white border border-slate-100",
                expandedId === step.id ? "ring-4 ring-teal-500/5 shadow-2xl scale-[1.01]" : "hover:bg-slate-50/50"
              )}
            >
              <div 
                className="p-8 cursor-pointer"
                onClick={() => setExpandedId(expandedId === step.id ? null : step.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="text-3xl font-black text-teal-600 tabular-nums leading-none italic opacity-30 group-hover:opacity-100 transition-opacity">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className={cn(
                      "text-lg font-black uppercase tracking-tight transition-colors",
                      expandedId === step.id ? "text-teal-600" : "text-slate-800"
                    )}>
                      {step.title}
                    </h3>
                  </div>
                  <div className={cn(
                    "p-2 rounded-xl transition-all",
                    expandedId === step.id ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-400"
                  )}>
                    <ChevronDown className={cn("w-5 h-5 transition-transform duration-500", expandedId === step.id && "rotate-180")} />
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === step.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="pt-6 space-y-6">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-sm text-slate-600 leading-relaxed">
                          {step.description}
                        </div>

                        {!aiExplanations[step.id] ? (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              getAIExplanation(step.title, step.id);
                            }}
                            disabled={loadingId === step.id}
                            className={cn(
                              "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest shadow-md hover:bg-slate-800 transition-all disabled:opacity-50",
                              loadingId === step.id && "animate-pulse"
                            )}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {loadingId === step.id ? "Analyzing..." : "AI Insight"}
                          </button>
                        ) : (
                          <div className="p-6 bg-teal-50/50 rounded-xl border border-teal-100 relative group/ai">
                            <div className="flex items-center justify-between mb-3 text-[9px] uppercase tracking-widest font-bold text-teal-600">
                              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Expert Response</span>
                            </div>
                            <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">
                              {aiExplanations[step.id]}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
