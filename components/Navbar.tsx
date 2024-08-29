'use client';
import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguageContext } from '@/app/context/LanguageProvider';

const Navbar = () => {
    const pathname = usePathname();
    const language = useLanguageContext();
    return (
        <div className="navbar bg-base-100" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
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
                            <Link href="/fairy-tales" passHref legacyBehavior>
                                <a className={(pathname === '/fairy-tales' || pathname.includes('/fairy-tales')) ? 'active-link' : ''}>
                                    {language === 'en' ? 'Fairy Tales' : 'Truyện Cổ Tích'}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about-us" passHref legacyBehavior>
                                <a className={(pathname === '/about-us' || pathname.includes('/about-us')) ? 'active-link' : ''}>
                                    {language === 'en' ? 'About Us' : 'Chúng Tôi'}
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link href="/stories/en/fairy-tales" passHref legacyBehavior>
                    <a>
                        <Image
                            src="/truyencuaba_logo.png"
                            alt="logo"
                            width={180}
                            height={60}
                            priority={true}
                            style={{height: 'unset', maxWidth: 'unset'}}
                        />
                    </a>
                </Link>
            </div>
            <div className="navbar-center hidden md:flex">
                {language && <ul className='flex'>
                    <li>
                        <Link href="/people" passHref legacyBehavior>
                            <a className={(pathname === '/people' || pathname.includes('/people')) ? 'active-link' : ''}>
                                {language === 'en' ? 'Famous People' : 'Danh Nhân'}
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/fairy-tales" passHref legacyBehavior>
                            <a className={(pathname === '/fairy-tales' || pathname.includes('/fairy-tales')) ? 'active-link' : ''}>
                                {language === 'en' ? 'Fairy Tales' : 'Truyện Cổ Tích'}
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about-us" passHref legacyBehavior>
                            <a className={(pathname === '/about-us' || pathname.includes('/about-us')) ? 'active-link' : ''}>
                                {language === 'en' ? 'About Us' : 'Chúng Tôi'}
                            </a>
                        </Link>
                    </li>
                </ul>}
            </div>
            <div className="navbar-end">
                {language && <LanguageSwitcher language={language}></LanguageSwitcher>}
            </div>
        </div>
    );
};

export default Navbar;
