'use client'
import { useLanguageContext } from "../context/LanguageProvider";

export default function Header () {
    const language = useLanguageContext();

    return (
        <h1 className="font-bold font-serif mt-0 text-xl">{language === 'en' ? 'Vietnamese fairy tales and around the world' : 'Truyện cổ tích Việt Nam và thế giới'}</h1> 
    )
}