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
import { IoCloseCircleOutline } from "react-icons/io5";
import { PeopleCategory } from '@/app/mappingCategory';

const Navbar = () => {
    const pathname = usePathname();
    const decodedPathname = decodeURIComponent(pathname);
    const { language } = useLanguageContext();
    const [isLoading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const peopleCategory = new PeopleCategory();

    const toggleSidebar = () => {
        // setSidebarOpen(!sidebarOpen);
        if (!sidebarOpen) {
            setSidebarOpen(true);
        }
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    }

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
            <nav className="z-50 relative w-full bg-white border-b border-gray-200" >
                <div className="px-4 py-2 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={toggleSidebar}
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center text-sm lg:hidden"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <HiMenuAlt1 className="h-6 w-6" />
                            </button>
                            <div className="hover: cursor-pointer ml-4">
                                <Link href={`/`} passHref legacyBehavior>
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
                        <div className='hidden lg:block mx-6 overflow-auto'>
                            <div className='flex' style={{minWidth: '820px'}}>
                                <div className='px-4 border-r border-x-gray-200'>
                                    <span className={`flex justify-center font-semibold mb-2
                                        ${(decodedPathname === '/en/fairy-tales' || decodedPathname === '/vi/truyen-co-tich') ? 'active-link-navbar' : ''}`}>
                                        {language === 'en' ? (
                                            <Link href="/en/fairy-tales">Fairy Tales</Link>
                                        ) : (
                                            <Link href="/vi/truyen-co-tich">Truyện Cổ Tích</Link>
                                        )}
                                    </span>
                                    <ul className='flex'>
                                        <NavbarItem
                                            hrefEN="/en/fairy-tales/author/Brothers Grimm"
                                            hrefVI="/vi/truyen-co-tich/tac-gia/Brothers Grimm"
                                            labelEN="Brothers Grimm"
                                            labelVI="Nhà Grimm"
                                        />
                                        <NavbarItem
                                            hrefEN="/en/fairy-tales/author/Hans Christian Andersen"
                                            hrefVI="/vi/truyen-co-tich/tac-gia/Hans Christian Andersen"
                                            labelEN="Andersen"
                                            labelVI="Andersen"
                                        />
                                        <NavbarItem
                                            hrefEN="/en/fairy-tales/author/Aesop"
                                            hrefVI="/vi/truyen-co-tich/tac-gia/Aesop"
                                            labelEN="Fables of Aesop"
                                            labelVI="Ngụ Ngôn Aesop"
                                        />
                                        <NavbarItem
                                            hrefEN="/en/fairy-tales/author/FolkTales"
                                            hrefVI="/vi/truyen-co-tich/tac-gia/FolkTales"
                                            labelEN="Folk Tales"
                                            labelVI="Dân Gian"
                                        />
                                        <NavbarItem
                                            hrefEN="/en/fairy-tales/author/LegendTales"
                                            hrefVI="/vi/truyen-co-tich/tac-gia/LegendTales"
                                            labelEN="Legend Tales"
                                            labelVI="Sự Tích"
                                        />
                                    </ul>
                                </div>
                                <div className='px-4 border-x-gray-200'>
                                    <span className={`flex justify-center font-semibold mb-2
                                        ${(decodedPathname === '/en/people' || decodedPathname === '/vi/danh-nhan') ? 'active-link-navbar' : ''}`}>
                                        {language === 'en' ? (
                                            <Link href="/en/people">Who is who</Link>
                                        ) : (
                                            <Link href="/vi/danh-nhan">Danh Nhân</Link>
                                        )}
                                    </span>
                                    <ul className='flex'>
                                        <NavbarItem
                                            hrefEN={peopleCategory.literatureAndArt.hrefEN}
                                            hrefVI={peopleCategory.literatureAndArt.hrefVI}
                                            labelEN={peopleCategory.literatureAndArt.displayNameEN}
                                            labelVI={peopleCategory.literatureAndArt.displayNameVI}
                                        />
                                        <NavbarItem
                                            hrefEN={peopleCategory.scienceAndTechnology.hrefEN}
                                            hrefVI={peopleCategory.scienceAndTechnology.hrefVI}
                                            labelEN={peopleCategory.scienceAndTechnology.displayNameEN}
                                            labelVI={peopleCategory.scienceAndTechnology.displayNameVI}
                                        />
                                        <NavbarItem
                                            hrefEN={peopleCategory.militaryAndPolitic.hrefEN}
                                            hrefVI={peopleCategory.militaryAndPolitic.hrefVI}
                                            labelEN={peopleCategory.militaryAndPolitic.displayNameEN}
                                            labelVI={peopleCategory.militaryAndPolitic.displayNameVI}
                                        />
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                {!isLoading && (
                                    <div className='flex flex-col'>
                                        {/* <div className="about-us">
                                            <Link href="/about-us" passHref legacyBehavior>
                                                about us
                                            </Link>
                                        </div> */}
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
                className={`fixed top-0 left-0 z-40 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-white border-r border-gray-200`}
                aria-label="Sidebar"
                style={{ width: '17rem', paddingTop: '76px' }}
            >
                <div className="h-full pl-4 pr-2 pt-2 overflow-y-auto">
                    <div className='flex justify-end' style={{color: 'brown'}} >
                        <IoCloseCircleOutline className='size-6' onClick={handleCloseSidebar}/>
                    </div>
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
                            hrefEN="/en/people"
                            hrefVI="/vi/danh-nhan"
                            labelEN="Who is who"
                            labelVI="Danh nhân nổi tiếng"
                            icon={<MdEmojiPeople />}
                        />
                        <SidebarItem
                            hrefEN={peopleCategory.literatureAndArt.hrefEN}
                            hrefVI={peopleCategory.literatureAndArt.hrefVI}
                            labelEN={peopleCategory.literatureAndArt.displayNameEN}
                            labelVI={peopleCategory.literatureAndArt.displayNameVI}
                            icon={<MdKeyboardOptionKey />}
                            isSubCategory={true}
                        />
                        <SidebarItem
                            hrefEN={peopleCategory.scienceAndTechnology.hrefEN}
                            hrefVI={peopleCategory.scienceAndTechnology.hrefVI}
                            labelEN={peopleCategory.scienceAndTechnology.displayNameEN}
                            labelVI={peopleCategory.scienceAndTechnology.displayNameVI}
                            icon={<MdKeyboardOptionKey />}
                            isSubCategory={true}
                        />
                        <SidebarItem
                            hrefEN={peopleCategory.militaryAndPolitic.hrefEN}
                            hrefVI={peopleCategory.militaryAndPolitic.hrefVI}
                            labelEN={peopleCategory.militaryAndPolitic.displayNameEN}
                            labelVI={peopleCategory.militaryAndPolitic.displayNameVI}
                            icon={<MdKeyboardOptionKey />}
                            isSubCategory={true}
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
        <li className={`flex items-center font-semibold pt-3 ${isActive ? 'active-link-sidebar' : ''}`} 
        style={isSubCategory?{marginLeft: '1rem', fontWeight:'400'}:{}}>
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



interface NavbarItemProps {
    hrefEN: string;
    labelEN: string;
    hrefVI: string;
    labelVI: string;
}

function NavbarItem({ hrefEN, labelEN, hrefVI, labelVI }: NavbarItemProps) {
    const pathname = usePathname();
    const decodedPathname = decodeURIComponent(pathname);
    const isActive = decodedPathname === hrefEN || decodedPathname === hrefVI;

    const { language } = useLanguageContext();

    return (
        <li className={`flex items-center ${isActive ? 'active-link-navbar' : ''}`} >
            <span className="px-2">
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
