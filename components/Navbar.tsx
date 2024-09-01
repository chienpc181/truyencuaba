'use client';
import React, { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguageContext } from '@/app/context/LanguageProvider';

const Navbar = () => {
    const pathname = usePathname();
    // const [language, setLanguage] = useState('vi'); // Default to 'vi'
    const {language} = useLanguageContext();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // if (savedLang) {
        //     setLanguage(savedLang);
        // }
        setLoading(false);
    }, [language]);

    return (
        <div className="navbar" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content bg-base-100 z-[1] shadow">
                        <li>
                            <Link href="/people" passHref legacyBehavior>
                                <a className={(pathname === '/people' || pathname.includes('/people')) ? 'active-link' : ''}>
                                    {language === 'en' ? 'Famous People' : 'Danh Nhân'}
                                </a>
                            </Link>
                        </li>
                        <li>
                            {language === 'en' && <Link href="/en/fairy-tales"
                                className={pathname.includes('/fairy-tales') ? 'active-link' : ''}>
                                Fairy Tales
                            </Link>}
                            {language === 'vi' && <Link href="/vi/truyen-co-tich"
                                className={pathname.includes('/truyen-co-tich') ? 'active-link' : ''}>
                                Truyện Cổ Tích
                            </Link>}
                        </li>
                    </ul>
                </div>
                <Link href={`/about-us`} passHref legacyBehavior>
                    <Image
                        src="/truyencuaba_logo.png"
                        alt="logo"
                        width={180}
                        height={60}
                        priority={true}
                        style={{ height: 'unset', maxWidth: 'unset' }}
                    />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                {!isLoading && <ul className='flex'>
                    <li>
                        <Link href="/people" passHref legacyBehavior>
                            <a className={(pathname === '/people' || pathname.includes('/people')) ? 'active-link' : ''}>
                                {language === 'en' ? 'Famous People' : 'Danh Nhân'}
                            </a>
                        </Link>
                    </li>
                    <li>
                        {language === 'en' && <Link href="/en/fairy-tales"
                            className={pathname.includes('/fairy-tales') ? 'active-link' : ''}>
                            Fairy Tales
                        </Link>}
                        {language === 'vi' && <Link href="/vi/truyen-co-tich"
                            className={pathname.includes('/truyen-co-tich') ? 'active-link' : ''}>
                            Truyện Cổ Tích
                        </Link>}
                    </li>
                </ul>}
            </div>
            <div className="navbar-end">
                {!isLoading && <div >
                    <div className='about-us'>
                        <Link href="/about-us" passHref legacyBehavior>
                            About us
                        </Link>
                    </div>
                    <LanguageSwitcher></LanguageSwitcher>
                </div>}
            </div>
        </div>
    );
};

export default Navbar;
