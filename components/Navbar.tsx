'use client'
import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [language, setLanguage] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const savedLanguage = window.localStorage.getItem('language') || 'vi';
        setLanguage(savedLanguage);
    }, []);
    return (
        // <div className="drawer" style={{borderBottom: '1px solid #e5e7eb'}}>
        //     <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        //     <div className="drawer-content flex flex-col">
        //         <div className="navbar bg-base-100 w-full">
        //             <div className="flex-none lg:hidden">
        //                 <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
        //                     <svg
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         fill="none"
        //                         viewBox="0 0 24 24"
        //                         className="inline-block h-6 w-6 stroke-current">
        //                         <path
        //                             strokeLinecap="round"
        //                             strokeLinejoin="round"
        //                             strokeWidth="2"
        //                             d="M4 6h16M4 12h16M4 18h16"></path>
        //                     </svg>
        //                 </label>
        //             </div>
        //             <div className="flex-1">
        //                 <a href='/fairy-tales'>
        //                     <Image
        //                         src="/truyencuaba_logo.png"
        //                         alt="logo"
        //                         width={180}
        //                         height={60}
        //                     />
        //                 </a>
        //             </div>
        //             <ul className='menu menu-horizontal'>
        //                 <li>
        //                     <a href="/fairy-tales">Fairy Tales</a>
        //                 </li>
        //                 <li>
        //                     <a href="/people">Famous People</a>
        //                 </li>
        //             </ul>
        //             <div className="">
        //             {(language === 'vi' || language === 'en') && <LanguageSwitcher language={language}></LanguageSwitcher>}
        //             </div>
        //         </div>
        //     </div>
        //     <div className="drawer-side">
        //         <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        //         <ul className="menu bg-base-200 min-h-full w-80 p-4">
        //             <li><a>Sidebar Item 1</a></li>
        //             <li><a>Sidebar Item 2</a></li>
        //         </ul>
        //     </div>
        // </div>

        <div className="navbar bg-base-100" style={{borderBottom: '1px solid #e5e7eb'}}>
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
                        <li><a href="/people" className={(pathname === '/people' || pathname.includes('/people')) ? 'active-link' : ''}>
                        {language === 'en' ? 'Famous People' : 'Danh Nhân'}
                        </a></li>
                        <li><a href="/fairy-tales" className={(pathname === '/fairy-tales' || pathname.includes('/fairy-tales')) ? 'active-link' : ''}>
                        {language === 'en' ? 'Fairy Tales' : 'Truyện Cổ Tích'}
                        </a></li>
                    </ul>
                </div>
                <a href='/fairy-tales'>
                    <Image
                        src="/truyencuaba_logo.png"
                        alt="logo"
                        width={180}
                        height={60}
                    />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className='flex'>
                    <li><a href="/people" className={(pathname === '/people' || pathname.includes('/people')) ? 'active-link' : ''}>
                        {language === 'en' ? 'Famous People' : 'Danh Nhân'}
                    </a></li>
                    <li><a href="/fairy-tales" className={(pathname === '/fairy-tales' || pathname.includes('/fairy-tales')) ? 'active-link' : ''}>
                        {language === 'en' ? 'Fairy Tales' : 'Truyện Cổ Tích'}
                    </a></li>
                </ul>
            </div>
            <div className="navbar-end">
                {(language === 'vi' || language === 'en') && <LanguageSwitcher language={language}></LanguageSwitcher>}
            </div>
        </div>
    )
}

export default Navbar