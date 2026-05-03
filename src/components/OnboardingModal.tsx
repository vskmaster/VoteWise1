import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { User, MapPin, Fingerprint, Info, CheckCircle, ChevronRight, ArrowLeft, ShieldCheck, Search, ChevronDown } from 'lucide-react';
import { TN_CITIES } from '../constants';
import { cn } from '../lib/utils';

const OnboardingModal: React.FC = () => {
  const { setUser, setIsOnboarded } = useAppContext();
  const [step, setStep] = useState(1);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    aadhaarNumber: '',
    phoneNumber: '',
    epicNumber: ''
  });

  const handleFinish = () => {
    setUser({
      name: formData.name,
      location: formData.location,
      aadhaarNumber: formData.aadhaarNumber,
      phoneNumber: formData.phoneNumber,
      epicNumber: formData.epicNumber,
      photo: '/src/assets/images/regenerated_image_1777787601228.png'
    });
    setIsOnboarded(true);
  };

  const steps = [
    { title: 'Personal Profile', icon: <User className="w-6 h-6" /> },
    { title: 'Identity Check', icon: <Fingerprint className="w-6 h-6" /> },
    { title: 'Voting Context', icon: <Info className="w-6 h-6" /> }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col"
      >
        <div className="bg-primary p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold font-display">Welcome to VoteWise</h2>
            <p className="mt-2 text-slate-300">Let's set up your voter assistant profile.</p>
          </div>
          
          <div className="mt-8 flex items-center gap-4 relative z-10">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step > i + 1 ? 'bg-secondary text-white' : step === i + 1 ? 'bg-white text-primary scale-110' : 'bg-white/20 text-white/40'}`}>
                    {step > i + 1 ? <CheckCircle className="w-6 h-6" /> : s.icon}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-grow h-[2px] bg-white/20 mb-2">
                    <motion.div 
                      className="h-full bg-secondary"
                      initial={{ width: '0%' }}
                      animate={{ width: step > i + 1 ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="p-8 flex-grow min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Location (Tamil Nadu City)</label>
                  <div className="relative">
                    <button 
                      onClick={() => setIsLocationOpen(!isLocationOpen)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-left focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all flex items-center justify-between group"
                    >
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
                      <span className={formData.location ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                        {formData.location || 'Select your city'}
                      </span>
                      <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", isLocationOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {isLocationOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden"
                        >
                          <div className="p-2 border-b border-slate-50 bg-slate-50/50">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                autoFocus
                                type="text"
                                placeholder="Search city..."
                                className="w-full pl-9 pr-4 py-2 bg-white rounded-lg text-sm border-none focus:ring-1 focus:ring-teal-500/20 outline-none"
                                value={locationSearch}
                                onChange={(e) => setLocationSearch(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                            {TN_CITIES.filter(city => city.toLowerCase().includes(locationSearch.toLowerCase())).map((city) => (
                              <button
                                key={city}
                                onClick={() => {
                                  setFormData({ ...formData, location: city });
                                  setIsLocationOpen(false);
                                  setLocationSearch('');
                                }}
                                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors flex items-center justify-between group/item"
                              >
                                {city}
                                {formData.location === city && <CheckCircle className="w-4 h-4 text-teal-500" />}
                              </button>
                            ))}
                            {TN_CITIES.filter(city => city.toLowerCase().includes(locationSearch.toLowerCase())).length === 0 && (
                              <div className="p-4 text-center text-slate-400 text-xs italic">
                                No cities found matching "{locationSearch}"
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl flex gap-4">
                  <div className="bg-teal-100 p-3 rounded-full h-fit">
                    <ShieldCheck className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Security Assurance</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Your identification data is required to synchronize with the National Voter Registry.</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Aadhaar Number (12 Digits)</label>
                  <div className="relative">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      maxLength={12}
                      placeholder="XXXX XXXX XXXX"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-mono font-bold"
                      value={formData.aadhaarNumber}
                      onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value.replace(/\D/g, '') })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">EPIC Number (Optional)</label>
                  <div className="relative">
                    <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g. ABC1000001"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-mono font-bold uppercase"
                      value={formData.epicNumber}
                      onChange={(e) => setFormData({ ...formData, epicNumber: e.target.value.toUpperCase() })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Phone Number (10 Digits)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      maxLength={10}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })}
                    />
                  </div>
                </div>
                <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                  <h4 className="text-xl font-black uppercase italic tracking-tighter mb-2 text-[#f3f3f3]">Consent & Privacy</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                    By proceeding, you agree to allow VoteWise to process your data for electoral information services. Your data remains on this device.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 pt-0 flex justify-between">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${step === 1 ? 'opacity-0 invisible' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          
          <button
            disabled={
              (step === 1 && (!formData.name || !formData.location)) ||
              (step === 2 && formData.aadhaarNumber.length < 12) ||
              (step === 3 && (formData.phoneNumber.length < 10))
            }
            onClick={() => step < 3 ? setStep(s => s + 1) : handleFinish()}
            className="flex items-center gap-2 px-10 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl hover:bg-primary/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {step === 3 ? 'Complete Setup' : 'Continue'}
            {step < 3 && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingModal;
