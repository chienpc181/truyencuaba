'use client';
import React, { useEffect, useState, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguageContext } from '@/app/context/LanguageProvider';
import { GiFairyWand } from "react-icons/gi";
import { MdEmojiPeople, MdClose  } from "react-icons/md";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdKeyboardOptionKey } from "react-icons/md";
import { PeopleCategory } from '@/app/mappingCategory';

export default function Navbar()  {

    const { language } = useLanguageContext();
    const [isLoading, setLoading] = useState(true);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        setLoading(false);
    }, [language]);
    
    return (
        <div className={`navbar-custom ${isSidebarOpen ? 'h-screen' : ''}`}>
            <nav className="relative w-full bg-white border-b border-gray-200" >
                <div className="px-4 py-1 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 h-14">
                            <button
                                onClick={openSidebar}
                                aria-controls="logo-sidebar"
                                type="button"
                                className={`text-green-700 lg:hidden ${!isSidebarOpen ? 'block' : 'hidden'}`}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <HiMenuAlt1 className="size-8" />
                            </button>
                            <button
                                onClick={closeSidebar}
                                aria-controls="logo-sidebar"
                                type="button"
                                className={`text-red-700 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <MdClose  className="size-8" />
                            </button>
                            <Logo/>
                        </div>
                        <div className='hidden lg:block mx-6 overflow-auto' style={{minWidth: '820px'}}>
                            <QuickNavigation/>
                        </div>
                        <div className="flex items-center">
                            {!isLoading && (
                                    <LanguageSwitcher />
                                )}
                        </div>
                    </div>
                </div>
            </nav>
            <Sidebar isSidebarOpen={isSidebarOpen} onCloseSidebar={closeSidebar}/>
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
        <li className={`flex items-center font-semibold py-2 pl-4 ${isActive ? 'active-link-sidebar' : ''}`} 
        style={isSubCategory?{paddingLeft: '2rem', fontWeight:'400'}:{}}>
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

function Logo() {

    return (
        <div className="hover: cursor-pointer">
            <Link href={`/`} passHref legacyBehavior>
                <Image
                    // src="/truyencuaba_logo.png"
                    src="/truyencuaba-logo-1200x300.svg"
                    alt="logo"
                    width={1200}
                    height={300}
                    priority={true}
                    style={{ height: '48px', aspectRatio: '4', width: 'unset' }}
                />
            </Link>
        </div>
    )
}

interface SidebarProps {
    isSidebarOpen: boolean;
    onCloseSidebar: () => void;
}
function Sidebar({ isSidebarOpen, onCloseSidebar }: SidebarProps) {
    const pathname = usePathname();
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const peopleCategory = new PeopleCategory();
    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            onCloseSidebar();
        }
    };
    
    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);
    
    useEffect(() => {
        onCloseSidebar(); 
    }, [pathname]);
    return (
        <aside
            id="logo-sidebar"
            ref={sidebarRef}
            className={`${isSidebarOpen ? 'flex' : 'hidden'} transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } bg-white border-r border-gray-200 isolate flex-col h-full`}
            aria-label="Sidebar"
        >
            <div className="h-full overflow-y-auto ">
                <ul className='pt-4'>
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
    )
}

function QuickNavigation() {
    const { language } = useLanguageContext();
    const pathname = usePathname();
    const decodedPathname = decodeURIComponent(pathname);
    const peopleCategory = new PeopleCategory();
    return (
        <div className='flex'>
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
                    {/* <NavbarItem
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
                    /> */}
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
    )
}