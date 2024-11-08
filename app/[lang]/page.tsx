import { Metadata, ResolvingMetadata } from 'next';
import { FairyStoryHeroSection } from "@/components/story/HeroSection";
import { Language } from '@/app/definitions';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return [
        { lang: Language.EN },
        { lang: Language.VI },
      ];
}

export async function generateMetadata(
    { params }: { params: { lang: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    
    return {
        title: ` - truyencuaba`,
        description: `Home page.`
    };
}

export default async function HomePage({ params }: { params: { lang: Language } }) {
    
    if (params.lang !== 'en' && params.lang !== 'vi'){
        notFound();
    }

    return (
        <div className='page-container'>
            <div >
                <h2 className='font-bold text-lg'>{params.lang}</h2>
                <FairyStoryHeroSection author="Brothers Grimm" lang={params.lang}/>
            </div>
            
        </div>
    );
}
