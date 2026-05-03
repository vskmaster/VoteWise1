import React from 'react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { MapPin, Navigation, Info, Search, Phone, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const BoothFinder: React.FC = () => {
  const { language } = useAppContext();
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLive, setIsLive] = React.useState(true);

  const booths = [
    { name: 'Public Higher Secondary School', address: 'Block A, Anna Nagar, Chennai', status: 'Busy', waitTime: '45 mins', distance: '1.2 km' },
    { name: 'Government Arts College', address: 'Main Road, Nandanam, Chennai', status: 'Active', waitTime: '15 mins', distance: '2.8 km' },
    { name: 'Community Center Hall 4', address: 'West Mambalam, Chennai', status: 'Closed', waitTime: 'N/A', distance: '3.5 km' },
    { name: 'Loyola College Campus', address: 'Sterling Road, Nungambakkam', status: 'Active', waitTime: '10 mins', distance: '4.1 km' },
  ];

  const filteredBooths = booths.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight uppercase">{t.boothFinder}</h2>
        <p className="text-slate-500 font-medium text-sm leading-relaxed">{t.boothDesc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-[650px]">
        {/* Real Map (Iframe) */}
        <div className="lg:col-span-3 glass rounded-[3rem] overflow-hidden relative border-4 border-white shadow-2xl bg-slate-100 group">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.922485542289!2d80.22271815546875!3d13.068695000000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526693a113d077%3A0x6e2697b0a33a1e94!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin" 
            allowFullScreen
            title="Google Maps"
            className="filter group-hover:contrast-[1.05] transition-all duration-700 h-full w-full"
          ></iframe>
          
          <div className="absolute bottom-8 right-8 flex flex-col gap-3">
            <button 
              onClick={() => setIsLive(!isLive)}
              className={cn(
                "w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center border transition-all hover:scale-110 active:scale-95",
                isLive ? "bg-teal-500 text-white border-teal-400" : "bg-white text-slate-900 border-slate-100"
              )}
            >
              <Navigation className="w-6 h-6" />
            </button>
            <div className="bg-white/95 backdrop-blur-xl px-4 py-2 rounded-xl shadow-xl border border-white/50 flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", isLive ? "bg-teal-500 animate-pulse" : "bg-slate-300")}></div>
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{isLive ? 'Live Tracking On' : 'Offline Mode'}</span>
            </div>
          </div>
        </div>

        {/* Station List */}
        <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {filteredBooths.map((booth, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass p-6 rounded-[2.5rem] border border-slate-100 group hover:border-teal-500/30 hover:bg-teal-50/10 transition-all cursor-pointer bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                  booth.status === 'Active' ? "bg-teal-50 text-teal-600 border border-teal-100" : booth.status === 'Busy' ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-slate-50 text-slate-400 border border-slate-100"
                )}>
                  {booth.status}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{booth.distance} away</span>
              </div>
              <h4 className="text-lg font-black text-slate-800 mb-1 group-hover:text-teal-600 transition-colors uppercase tracking-tight leading-none">{booth.name}</h4>
              <p className="text-[11px] font-medium text-slate-400 mb-6">{booth.address}</p>
              
              <div className="flex items-center gap-4 pt-5 border-t border-slate-50">
                <div className="flex-grow">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.15em] mb-1">Queue Status</p>
                  <p className="text-sm font-black text-slate-800 leading-none">{booth.waitTime}</p>
                </div>
                <a 
                  href="tel:1950" 
                  className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booth.name + ' ' + booth.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-teal-500 text-white rounded-xl shadow-xl shadow-teal-500/20 hover:bg-teal-400 transition-all active:scale-95 group flex items-center justify-center"
                >
                  <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoothFinder;
