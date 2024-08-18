'use client';

import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
    const [language, setLanguage] = useState('vi');

    useEffect(() => {
        const savedLanguage = window.localStorage.getItem('language') || 'vi';
        setLanguage(savedLanguage);
    }, []);

    const handleLanguageToggle = () => {
        const newLanguage = language === 'en' ? 'vi' : 'en';
        window.localStorage.setItem('language', newLanguage);
        setLanguage(newLanguage);
        window.location.reload();  // Force page reload to trigger useEffect
    };

    return (
        <div className='flex items-center'>
            <span className='font-bold'>VIE</span>
            <input 
                type="checkbox"  
                className="toggle toggle-info mx-2" 
                onChange={handleLanguageToggle} 
                checked={language === 'en'} 
            />
            <span className='font-bold'>ENG</span>
        </div>
    );
}
