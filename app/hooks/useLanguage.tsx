'use client';

import { useEffect, useState } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState<string>('vi'); 

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('language') || 'vi';
    setLanguage(savedLanguage);
  }, []);

  return language;
}
