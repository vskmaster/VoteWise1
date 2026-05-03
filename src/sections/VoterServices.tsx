import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { Search, FileText, MapPin, UserCheck, Inbox, ArrowRight, CheckCircle, XCircle, ExternalLink, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const VoterServices: React.FC = () => {
  const { language, setActiveSection } = useAppContext();
  const [epicNumber, setEpicNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const t = TRANSLATIONS[language];
  const common = TRANSLATIONS.en; // Fallback for specific names if needed

  const handleVerify = () => {
    if (!epicNumber) return;
    setIsVerifying(true);
    setVerificationResult(null);

    // Mock verification delay
    setTimeout(() => {
      setIsVerifying(false);
      // Normalized EPIC check
      const normalizedInput = epicNumber.trim().toUpperCase();
      if (normalizedInput === 'ABC1000001') {
        setVerificationResult({
          status: 'success',
          name: 'Santhakumar S.',
          booth: 'Public Higher Secondary School, Room 4',
          constituency: 'Chennai Central',
          ward: '124'
        });
      } else {
        setVerificationResult({
          status: 'error',
          message: 'EPIC details not found in the current electoral roll. Please check the ID or contact your BLO.'
        });
      }
    }, 1500);
  };

  const serviceCards = [
    { title: 'Register to Vote', desc: 'Apply for a new voter id card (Form 6)', icon: <FileText className="w-5 h-5" />, link: 'https://voters.eci.gov.in/', id: 'reg' },
    { title: 'Correction of Entries', desc: 'Change name, age or address (Form 8)', icon: <UserCheck className="w-5 h-5" />, link: 'https://voters.eci.gov.in/', id: 'correct' },
    { title: t.boothFinder, desc: t.boothDesc, icon: <MapPin className="w-5 h-5" />, link: null, id: 'booth-finder' },
    { title: 'Officer Details', desc: 'Find contact of your BLO and ERO', icon: <Inbox className="w-5 h-5" />, link: 'https://electorallogin.eci.gov.in/', id: 'officer' },
  ];

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">{t.services}</h2>
        <p className="text-slate-500 text-sm font-medium">Direct access to official voter services, identity verification, and local station information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Verification Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-12 glass rounded-[2.5rem] p-10 lg:p-12 bg-slate-950 text-white border-0 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                  <Search className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight italic">{t.epicVerification}</h3>
                  <div className="text-[10px] font-black text-teal-400 uppercase tracking-widest mt-0.5">National Voter Portal Direct</div>
                </div>
              </div>
              
              <p className="text-slate-400 text-sm mb-10 max-w-sm font-medium leading-relaxed">
                {t.epiccDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-teal-800 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition-all"></div>
                  <input 
                    type="text" 
                    placeholder="e.g. ABC1000001"
                    className="relative w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4.5 outline-none focus:border-teal-500 transition-all text-xl font-mono uppercase tracking-[0.3em] placeholder:text-slate-600 text-white shadow-inner"
                    value={epicNumber}
                    onChange={(e) => setEpicNumber(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  />
                  {isVerifying && (
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleVerify}
                  disabled={!epicNumber || isVerifying}
                  className="px-10 py-4.5 bg-teal-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-400 transition-all disabled:opacity-50 active:scale-95 shadow-2xl shadow-teal-500/30 flex items-center justify-center gap-3 group"
                >
                  {isVerifying ? 'Verifying...' : t.verifyStatus}
                  {!isVerifying && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Try Example:</span>
                <button 
                  onClick={() => setEpicNumber('ABC1000001')}
                  className="text-[10px] font-mono font-bold text-teal-400 hover:text-teal-300 underline underline-offset-4 tracking-[0.2em]"
                >
                  ABC1000001
                </button>
              </div>
              
              <div className="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-slate-500 rounded-full animate-ping"></div>
                Real-time connection with ECI servers established
              </div>
            </div>

            <AnimatePresence mode="wait">
              {verificationResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  className={cn(
                    "w-full lg:w-[450px] p-8 rounded-[2rem] border-4 backdrop-blur-xl shadow-2xl relative overflow-hidden",
                    verificationResult.status === 'success' ? "bg-white border-teal-500/20 text-slate-800" : "bg-red-600 border-red-400 text-white"
                  )}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 opacity-20">
                    {verificationResult.status === 'success' ? <CheckCircle className="w-full h-full text-teal-600" /> : <XCircle className="w-full h-full text-white" />}
                  </div>

                  {verificationResult.status === 'success' ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-500/20">
                          <UserCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-black uppercase tracking-widest text-[10px]">Record Authenticated</h4>
                          <p className="text-xl font-black uppercase tracking-tight text-slate-900">{verificationResult.name}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <p className="text-slate-400 text-[9px] uppercase font-black tracking-widest mb-1">Constituency</p>
                          <p className="text-xs font-black text-slate-800">{verificationResult.constituency}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <p className="text-slate-400 text-[9px] uppercase font-black tracking-widest mb-1">Ward</p>
                          <p className="text-xs font-black text-slate-800">{verificationResult.ward}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100/50">
                        <p className="text-teal-600/60 text-[9px] uppercase font-black tracking-widest mb-1">Assigned Booth</p>
                        <p className="text-xs text-teal-900 font-black leading-relaxed">{verificationResult.booth}</p>
                      </div>

                      <button 
                        onClick={() => setActiveSection('booth-finder')}
                        className="w-full py-4 bg-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                      >
                        Navigate to Booth <Navigation className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-xl shadow-black/20">
                          <XCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-black uppercase tracking-widest text-[10px] opacity-80">Verification Failed</h4>
                          <p className="text-xl font-black text-white italic uppercase tracking-tighter">Invalid Identifier</p>
                        </div>
                      </div>
                      <p className="text-white text-xs font-bold leading-relaxed">{verificationResult.message}</p>
                      <a 
                        href="https://voters.eci.gov.in/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full py-4 bg-white/20 text-white border border-white/30 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/40 transition-all flex items-center justify-center gap-2"
                      >
                        Register Online <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Support Services Grid */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {serviceCards.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => {
                if (service.id === 'booth-finder') setActiveSection('booth-finder');
                else if (service.link) window.open(service.link, '_blank');
              }}
              className="glass p-8 rounded-[2rem] group flex flex-col justify-between h-56 hover:border-teal-500/30 transition-all cursor-pointer bg-white shadow-sm hover:shadow-2xl hover:shadow-slate-100"
            >
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-teal-500/20">
                {service.icon}
              </div>
              <div className="mt-8">
                <h3 className="text-base font-black text-slate-800 flex items-center gap-2 group-hover:text-teal-600 transition-colors uppercase tracking-tight">
                  {service.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 font-bold lowercase italic">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoterServices;
