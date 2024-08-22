'use client'
import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const Navbar = () => {
    const [language, setLanguage] = useState('');
     useEffect(() => {
        const savedLanguage = window.localStorage.getItem('language') || 'vi';
        setLanguage(savedLanguage);
    }, []);
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                {/* <a className="btn btn-ghost text-xl text-orange-600">truyen-cua-ba</a> */}
                {/* <img src=''></img> */}
                <Image
                    src="/truyencuaba_logo.png"
                    alt="logo"
                    width={180}
                    height={60}
                />
            </div>
            <div className="flex-none">
                {(language === 'vi' || language === 'en') && <LanguageSwitcher language={language}></LanguageSwitcher>}
                {/* <ul className="menu menu-horizontal px-1">
                    <li><a>Link</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li>
                </ul> */}
            </div>
        </div>
    )
}

export default Navbar