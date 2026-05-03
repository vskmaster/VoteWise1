import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Sparkles, FileText, Send, Copy, FileSearch, CheckCircle2, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeElectionText } from '../services/geminiService';
import Markdown from 'react-markdown';

const PasteAnalyze: React.FC = () => {
  const { language } = useAppContext();
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim() || isAnalyzing) return;
    
    setIsAnalyzing(true);
    setAnalysis(null);
    
    try {
      const result = await analyzeElectionText(text);
      setAnalysis(result || "Analysis failed.");
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setAnalysis(null);
  };

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-bold text-primary mb-4">Paste & Analyze</h2>
        <p className="text-slate-600 text-lg">Paste complex election notices, rules, or instructions to get an instant AI-powered simplification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <section className="space-y-6">
          <div className="glass-card rounded-[2.5rem] p-8 border border-slate-100 relative shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-2xl">
                  <FileSearch className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary">Input Source</h3>
              </div>
              <button 
                onClick={handleClear}
                className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest"
              >
                Clear
              </button>
            </div>

            <div className="relative">
              <textarea 
                className="w-full h-80 bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8 outline-none focus:border-accent/30 focus:bg-white transition-all text-slate-700 leading-relaxed resize-none font-medium"
                placeholder="Paste the official notice, EPIC details, or any election text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {!text && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
                  <FileText className="w-12 h-12 mb-2 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-400">Ready for analysis</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <button 
                disabled={!text.trim() || isAnalyzing}
                onClick={handleAnalyze}
                className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                    <span>Processing with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 text-accent" />
                    <span>Simplify Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl text-white flex gap-4">
            <AlertCircle className="w-8 h-8 text-accent shrink-0" />
            <div>
              <h4 className="font-bold text-sm mb-1 uppercase tracking-wider text-white">How it works</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our Gemini AI model processes official jargon and generates a human-readable roadmap with specific action items.
              </p>
            </div>
          </div>
        </section>

        <section className="h-full">
          <AnimatePresence mode="wait">
            {analysis ? (
              <motion.div 
                key="analysis"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-[2.5rem] p-10 border border-secondary/20 h-full relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary/10 rounded-2xl">
                      <CheckCircle2 className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">AI Interpretation</h3>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                    <Copy className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="markdown-body prose prose-slate prose-sm max-w-none">
                  <Markdown>{analysis}</Markdown>
                </div>

                <div className="mt-12 pt-12 border-t border-slate-50 flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">Election Insight</span>
                    <span className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">Voter Action</span>
                    <span className="px-4 py-2 bg-secondary/10 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest border border-secondary/5">Verified Pattern</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-[2.5rem] p-10 border-2 border-dashed border-slate-100 h-full flex flex-col items-center justify-center text-center text-slate-400"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">Awaiting Content</h3>
                <p className="max-w-xs text-sm">Paste election text on the left to see the AI analysis results here.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default PasteAnalyze;
