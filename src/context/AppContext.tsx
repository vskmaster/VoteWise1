import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, UserProfile, ChecklistItem } from '../types';
import { READINESS_CHECKLIST } from '../constants';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  isOnboarded: boolean;
  setIsOnboarded: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(READINESS_CHECKLIST);

  // Load from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('votewise_user');
    const savedOnboarded = localStorage.getItem('votewise_onboarded');
    const savedLanguage = localStorage.getItem('votewise_lang');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOnboarded) setIsOnboarded(savedOnboarded === 'true');
    if (savedLanguage) setLanguage(savedLanguage as Language);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem('votewise_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('votewise_onboarded', isOnboarded.toString());
  }, [isOnboarded]);

  useEffect(() => {
    localStorage.setItem('votewise_lang', language);
  }, [language]);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      user, setUser,
      checklist, toggleChecklistItem,
      isOnboarded, setIsOnboarded,
      activeSection, setActiveSection
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
