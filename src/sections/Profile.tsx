import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { User, Mail, Phone, MapPin, Camera, Save, Contact, ShieldCheck, Search, ChevronDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { TN_CITIES } from '../constants';

const Profile: React.FC = () => {
  const { language, user, setUser } = useAppContext();
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  
  const [formData, setFormData] = useState({
    name: user?.name || 'Santhakumar S.',
    epicNumber: user?.epicNumber || 'ABC1000001',
    aadhaarNumber: user?.aadhaarNumber || 'XXXX-XXXX-1234',
    phoneNumber: user?.phoneNumber || '+91 98765 43210',
    location: user?.location || 'Chennai, Tamil Nadu',
    address: user?.address || '123, Anna Salai, Chennai - 600002',
    photo: user?.photo || '/src/assets/images/regenerated_image_1777787601228.png'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser({
        ...user,
        ...formData
      });
      setIsSaving(false);
      setMessage(t.profileUpdated);
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">{t.profile}</h2>
          <p className="text-slate-500 font-medium text-sm">{t.personalInfo}</p>
        </div>
        {message && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl border border-teal-100 text-xs font-bold uppercase tracking-widest"
          >
            {message}
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-xl relative">
              <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={handlePhotoClick}
                className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
              >
                <Camera className="w-8 h-8" />
              </button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handlePhotoChange}
            />
            <div className="absolute -bottom-2 -right-2 bg-teal-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <User className="w-3.5 h-3.5" />
                {t.nameLabel}
              </label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <Contact className="w-3.5 h-3.5" />
                {t.epicLabel}
              </label>
              <input 
                name="epicNumber"
                value={formData.epicNumber}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-mono font-bold text-slate-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all uppercase tracking-widest"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.aadhaarLabel}
              </label>
              <input 
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-mono font-bold text-slate-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all tracking-widest"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <Phone className="w-3.5 h-3.5" />
                {t.phoneLabel} (10 Digits)
              </label>
              <input 
                name="phoneNumber"
                maxLength={10}
                value={formData.phoneNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value.replace(/\D/g, '') }))}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-500" />
              {t.locationInfo}
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Location</label>
              <div className="relative">
                <button 
                  type="button"
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all flex items-center justify-between group"
                >
                  <span className={formData.location ? 'text-slate-800' : 'text-slate-400'}>
                    {formData.location || 'Select city'}
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
                            type="button"
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
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t.addressLabel}</label>
              <textarea 
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] bg-slate-900 text-white border-0 shadow-2xl flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter italic mb-4">Account Security</h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8">
                Your data is encrypted and stored locally in this browser. Update your information regularly to ensure seamless access to electoral services.
              </p>
            </div>
            <button 
              type="submit"
              disabled={isSaving}
              className="w-full py-5 bg-teal-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/30 disabled:opacity-50 active:scale-95 group"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
              )}
              {isSaving ? 'Processing...' : t.updateProfile}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
