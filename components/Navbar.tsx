'use client';
import React, { useEffect, useState, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguageContext } from '@/app/context/LanguageProvider';
import { GiFairyWand } from "react-icons/gi";
import { MdEmojiPeople } from "react-icons/md";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdKeyboardOptionKey } from "react-icons/md";

const Navbar = () => {
    const pathname = usePathname();
    const { language } = useLanguageContext();
    const [isLoading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            closeSidebar(); // Close the sidebar when clicking outside
        }
    };

    // Close sidebar when clicking outside of it
    useEffect(() => {
        if (sidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen]);

    useEffect(() => {
        setLoading(false);
    }, [language]);

    // Close sidebar after clicking a link
    useEffect(() => {
        closeSidebar(); // Close sidebar after navigation
    }, [pathname]);

    return (
        <div className='navbar-custom'>
            <nav className="z-50 w-full bg-white border-b border-gray-200" style={{ height: '80px' }}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={toggleSidebar}
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm sm:hidden"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <HiMenuAlt1 className="h-6 w-6" />
                            </button>
                            <div className="hover: cursor-pointer">
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
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                {!isLoading && (
                                    <div>
                                        <div className="about-us">
                                            <Link href="/about-us" passHref legacyBehavior>
                                                About us
                                            </Link>
                                        </div>
                                        <LanguageSwitcher />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                ref={sidebarRef}
                className={`fixed left-0 z-40 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-white border-r border-gray-200`}
                aria-label="Sidebar"
                style={{ width: '20rem' }}
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <ul>
                        <SidebarItem
                            hrefEN="/en/fairy-tales"
                            hrefVI="/vi/truyen-co-tich"
                            labelEN="Fairy Tales"
                            labelVI="Truyện Cổ Tích"
                            icon={<GiFairyWand />}
                        />
                        <SidebarItem
                            hrefEN="/en/fairy-tales/author/Brothers Grimm"
                            hrefVI="/vi/truyen-co-tich/tac-gia/Brothers Grimm"
                            labelEN="Stories of Brothers Grimm"
                            labelVI="Anh em nhà Grimm"
                            icon={<MdKeyboardOptionKey />}
                            isSubCategory={true}
                        />
                        <SidebarItem
                            hrefEN="/en/fairy-tales/author/Hans Christian Andersen"
                            hrefVI="/vi/truyen-co-tich/tac-gia/Hans Christian Andersen"
                            labelEN="Stories of Andersen"
                            labelVI="Truyện cổ tích Andersen"
                            icon={<MdKeyboardOptionKey />}
                            isSubCategory={true}
                        />
                        <SidebarItem
                            hrefEN="/en/fairy-tales/author/Aesop"
                            hrefVI="/vi/truyen-co-tich/tac-gia/Aesop"
                            labelEN="Fables of Aesop"
                            labelVI="Truyện ngụ ngôn Aesop"
                            icon={<MdKeyboardOptionKey />}
                            isSubCategory={true}
                        />
                        <SidebarItem
                            hrefEN="/en/fairy-tales/author/FolkTales"
                            hrefVI="/vi/truyen-co-tich/tac-gia/FolkTales"
                            labelEN="Vietnamese folk tales"
                            labelVI="Truyện dân gian"
                            icon={<MdKeyboardOptionKey />}
                            isSubCategory={true}
                        />
                        <SidebarItem
                            hrefEN="/en/fairy-tales/author/LegendTales"
                            hrefVI="/vi/truyen-co-tich/tac-gia/LegendTales"
                            labelEN="Vietnamese legend tales"
                            labelVI="Truyền thuyết, sự tích"
                            icon={<MdKeyboardOptionKey />}
                            isSubCategory={true}
                        />
                        <SidebarItem
                            hrefEN="/people"
                            hrefVI="/people"
                            labelEN="Who is who"
                            labelVI="Danh nhân nổi tiếng"
                            icon={<MdEmojiPeople />}
                        />
                    </ul>
                </div>
            </aside>
        </div>
    );
};

interface SidebarItemProps {
    hrefEN: string;
    labelEN: string;
    hrefVI: string;
    labelVI: string;
    icon: JSX.Element;
    isSubCategory?: boolean;
}

function SidebarItem({ hrefEN, labelEN, hrefVI, labelVI, icon, isSubCategory }: SidebarItemProps) {
    const pathname = usePathname();
    const decodedPathname = decodeURIComponent(pathname);
    const isActive = decodedPathname === hrefEN || decodedPathname === hrefVI;

    const { language } = useLanguageContext();

    return (
        <li className={`flex items-center p-2 ${isActive ? 'active-link-sidebar' : ''}`} style={isSubCategory?{marginLeft: '1.5rem'}:{}}>
            {icon}
            <span className="ml-2">
                {language === 'en' ? (
                    <Link href={hrefEN}>{labelEN}</Link>
                ) : (
                    <Link href={hrefVI}>{labelVI}</Link>
                )}
            </span>
        </li>
    );
}


export default Navbar;
