import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Send, User, Sparkles, Trash2, Bot, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithAI } from '../services/geminiService';
import { ChatMessage } from '../types';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

const AIAssistant: React.FC = () => {
  const { language } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sampleQueries = [
    "What is the 'Silence Period'?",
    "How to find my polling booth?",
    "What IDs are valid for voting?",
    "How to download e-EPIC?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAI([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'model', content: response || "Something went wrong." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">VoteWise Intelligence</h2>
          <p className="text-slate-500 text-sm">Your secure, AI-powered election guide for non-partisan information.</p>
        </div>
        <button 
          onClick={() => setMessages([])}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 glass rounded-2xl p-6 overflow-hidden flex flex-col relative bg-white/50">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-8">
              <div className="relative">
                <div className="w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-500/20">
                  <Bot className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full border-4 border-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">Hello! I'm your Election Assistant.</h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  I can help you understand voting rules, find registration info, or explain electoral processes in India.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                {sampleQueries.map((query, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(query)}
                    className="p-3 bg-white rounded-xl border border-slate-100 hover:border-teal-500/30 hover:bg-teal-50/30 transition-all text-xs font-semibold text-slate-600 text-left shadow-sm"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center shadow-sm",
                  m.role === 'user' ? "bg-slate-900 text-white" : "bg-teal-500 text-white"
                )}>
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  m.role === 'user' 
                    ? "bg-slate-100 text-slate-800 rounded-tr-none" 
                    : "bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm"
                )}>
                  <div className="markdown-body prose prose-slate prose-sm max-w-none">
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <div className="flex gap-4 mr-auto max-w-[85%] animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-teal-500 shrink-0 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-white border border-slate-100 flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="relative flex items-center"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the voting process..."
              className="w-full bg-white border border-slate-100 rounded-xl px-5 py-3.5 pr-14 outline-none focus:border-teal-500 transition-all text-sm font-medium shadow-sm"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all disabled:opacity-30 disabled:hover:bg-slate-900 active:scale-95 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="mt-3 text-[10px] text-slate-400 text-center font-bold tracking-widest uppercase">
            AI responses are educational. Refer to ECI website for official guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
