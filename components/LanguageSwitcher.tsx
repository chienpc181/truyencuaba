// 'use client';

export default function LanguageSwitcher({language}: any) {
    const handleLanguageToggle = () => {
        const newLanguage = language === 'en' ? 'vi' : 'en';
        window.localStorage.setItem('language', newLanguage);
        window.location.reload();  // Force page reload to trigger useEffect
    };

    const buttonHighlight = {
        color: '#fff',
        backgroundColor: 'green',
        fontWeight: 'bold'
    }

    return (
        <div className='language-switcher'>
            <div className="px-2 py-1 font-semibold" style={language === 'vi' ? buttonHighlight : {}}>
                <button title="Tiếng Việt" onClick={() => handleLanguageToggle()}>VIE</button>
            </div>

            <div className="px-2 py-1 font-semibold" style={language === 'en' ? buttonHighlight : {}}>
                <button title="English" onClick={() => handleLanguageToggle()}>ENG</button>
            </div>
            
        </div>
    );
}

