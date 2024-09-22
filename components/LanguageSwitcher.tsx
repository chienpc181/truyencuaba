'use client';
import { useRouter } from 'next/navigation';
import { useLanguageContext } from '@/app/context/LanguageProvider';
import { useEffect } from 'react';
import { PeopleCategory } from '@/app/mappingCategory';

export default function LanguageSwitcher() {
    const router = useRouter();
    const { language, setLanguage } = useLanguageContext();
    const peopleCategory = new PeopleCategory();

    const handleLanguageToggle = () => {
        const newLanguage = language === 'en' ? 'vi' : 'en';
        setLanguage(newLanguage); // This updates the context and local storage
    };

    useEffect(() => {
        redirectByLanguage(language)
    }, [language])

    const redirectByLanguage = (language: string) => {
        const pathName = window.location.pathname;
        if (language === 'vi') {
            if (pathName.includes('/en/fairy-tales/author')) {
                const newPath = pathName.replace('/en/fairy-tales/author', '/vi/truyen-co-tich/tac-gia');
                router.push(newPath);
            } 
            else if (pathName === '/en/fairy-tales') {
                router.push('/vi/truyen-co-tich');
            }
            else if (pathName.includes('/en/fairy-tales/')) {
                const newPath = pathName.replace('/en/fairy-tales', '/vi/truyen-co-tich');
                router.push(newPath);
            }

            if (pathName.includes('/en/people')) {
                let newPath = findAndReplace(pathName, 'en', 'vi');
                newPath = findAndReplace(newPath, 'people', 'danh-nhan');
                newPath = findAndReplace(newPath, 'field', 'linh-vuc');
                newPath = findAndReplace(newPath, peopleCategory.literatureAndArt.slugEN, peopleCategory.literatureAndArt.slugVI);
                newPath = findAndReplace(newPath, peopleCategory.scienceAndTechnology.slugEN, peopleCategory.scienceAndTechnology.slugVI);
                newPath = findAndReplace(newPath, peopleCategory.militaryAndPolitic.slugEN, peopleCategory.militaryAndPolitic.slugVI);
                newPath = findAndReplace(newPath, peopleCategory.sports.slugEN, peopleCategory.sports.slugVI);
                newPath = findAndReplace(newPath, peopleCategory.entertainment.slugEN, peopleCategory.entertainment.slugVI);

                router.push(newPath);
            }
        }
        if (language === 'en') {
            if (pathName.includes('/vi/truyen-co-tich/tac-gia')) {
                const newPath = pathName.replace('/vi/truyen-co-tich/tac-gia', '/en/fairy-tales/author');
                router.push(newPath);
            } 
            else if (pathName === '/vi/truyen-co-tich') {
                router.push('/en/fairy-tales');
            } 
            else if (pathName.includes('/vi/truyen-co-tich/')) {
                const newPath = pathName.replace('/vi/truyen-co-tich', '/en/fairy-tales');
                router.push(newPath);
            }

            if (pathName.includes('/vi/danh-nhan/')) {
                let newPath = findAndReplace(pathName, 'vi', 'en');
                newPath = findAndReplace(newPath, 'danh-nhan', 'people');
                newPath = findAndReplace(newPath, 'linh-vuc', 'field');
                newPath = findAndReplace(newPath, peopleCategory.literatureAndArt.slugVI, peopleCategory.literatureAndArt.slugEN);
                newPath = findAndReplace(newPath, peopleCategory.scienceAndTechnology.slugVI, peopleCategory.scienceAndTechnology.slugEN);
                newPath = findAndReplace(newPath, peopleCategory.militaryAndPolitic.slugVI, peopleCategory.militaryAndPolitic.slugEN);
                newPath = findAndReplace(newPath, peopleCategory.sports.slugVI, peopleCategory.sports.slugEN);
                newPath = findAndReplace(newPath, peopleCategory.entertainment.slugVI, peopleCategory.entertainment.slugEN);

                router.push(newPath);
            }
        }
    }

    function findAndReplace(pathName: string, find: string, replace: string) {
        find = '/' + find ;
        replace = '/' + replace ;
        if (pathName.includes(find)) {
            return pathName.replace(find, replace)
        } else {
            return pathName
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
                    <span style={language === 'vi' ? buttonHighlight : {}}>VI</span>
                    <span style={language === 'en' ? buttonHighlight : {}}>EN</span>
                </div>
            </button>
        </div>
    );
}
