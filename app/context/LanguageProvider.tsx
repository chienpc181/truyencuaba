'use client';

import React, { createContext, useContext } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageContext = createContext<string>('vi');

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const language = useLanguage();
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
