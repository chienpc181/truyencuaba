'use client'
import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [language, setLanguage] = useState('');
    const router = useRouter();
    useEffect(() => {
        const savedLanguage = window.localStorage.getItem('language') || 'vi';
        setLanguage(savedLanguage);
    }, []);
    return (
        <div className="drawer border-indigo-300" style={{borderBottom: '1px solid #a5b4fc'}}>
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-100 w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <a href='/fairy-tales'>
                            <Image
                                src="/truyencuaba_logo.png"
                                alt="logo"
                                width={180}
                                height={60}
                            />
                        </a>
                    </div>
                    {/* <div className="hidden flex-none lg:block">
                    {(language === 'vi' || language === 'en') && <LanguageSwitcher language={language}></LanguageSwitcher>}
                    </div> */}
                    <div className="">
                    {(language === 'vi' || language === 'en') && <LanguageSwitcher language={language}></LanguageSwitcher>}
                    </div>
                </div>
                {/* Page content here */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar