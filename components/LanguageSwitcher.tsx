'use client';
import { useRouter } from 'next/navigation';
import { useLanguageContext } from '@/app/context/LanguageProvider';
import { useEffect } from 'react';

export default function LanguageSwitcher() {
    const router = useRouter();
    const { language, setLanguage } = useLanguageContext();

    const handleLanguageToggle = () => {
        const newLanguage = language === 'en' ? 'vi' : 'en';
        setLanguage(newLanguage); // This updates the context and local storage
    };

    useEffect(() => {
        redirectByLanguage(language, router)
    }, [language])

    const redirectByLanguage = (language: string, router: any) => {
        const pathName = window.location.pathname;
        if (language === 'vi') {
            if (pathName.includes('/en/fairy-tales/author')) {
                const newPath = pathName.replace('/en/fairy-tales/author', '/vi/truyen-co-tich/tac-gia');
                router.push(newPath);
            } else if (pathName === '/en/fairy-tales') {
                router.push('/vi/truyen-co-tich');
            }
            else if (pathName.includes('/en/fairy-tales/')) {
                const newPath = pathName.replace('/en/fairy-tales', '/vi/truyen-co-tich');
                router.push(newPath);
            }
        }
        if (language === 'en') {
            if (pathName.includes('/vi/truyen-co-tich/tac-gia')) {
                const newPath = pathName.replace('/vi/truyen-co-tich/tac-gia', '/en/fairy-tales/author');
                router.push(newPath);
            } else if (pathName === '/vi/truyen-co-tich') {
                router.push('/en/fairy-tales');
            } else if (pathName.includes('/vi/truyen-co-tich/')) {
                const newPath = pathName.replace('/vi/truyen-co-tich', '/en/fairy-tales');
                router.push(newPath);
            }
        }
    }

    const buttonHighlight = {
        color: '#fff',
        backgroundColor: 'darkgreen',
    };

    return (
        <div className='language-switcher'>
            <button onClick={handleLanguageToggle}>
                <div className="flex">
                    <span style={language === 'vi' ? buttonHighlight : {}}>VIE</span>
                    <span style={language === 'en' ? buttonHighlight : {}}>ENG</span>
                </div>
            </button>
        </div>
    );
}
