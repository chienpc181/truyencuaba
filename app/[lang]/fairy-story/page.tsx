import { Metadata } from 'next';
import Carousel from '@/components/Carousel';
import CategoryHeader from '@/components/CategoryHeader';
import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import { getStoriesByAuthor } from '@/lib/api';
import { getDictionary } from '@/app/dictionaries/dictionaries';
import { Language } from '@/app/definitions';

export const metadata: Metadata = {
    title: "Fairy Tales - truyencuaba",
    description: "Wonderful fairy tales",
};


export default async function FairyStories({ params }: { params: { lang: Language } }) {
    const language = params.lang;
    const [storiesByBrothersGrimm, storiesByAndersen, fableAesops] = await Promise.all([
        getStoriesByAuthor('Brothers Grimm'),
        getStoriesByAuthor('Hans Christian Andersen'),
        getStoriesByAuthor('Aesop'),
    ]);

    const dictionary = await getDictionary(language);

    return (
        <div className='page-container' >
            <hgroup className='page-header'>
                <h1 >{dictionary.fairyStory.title}</h1>
                <p >{dictionary.fairyStory.description}</p>
            </hgroup>
            <div>
                <section>
                    <CategoryHeader label={dictionary.fairyStory.categoryHeader.grimm} url={`/${language}/fairy-story/grimm`}></CategoryHeader>
                    <Carousel stories={storiesByBrothersGrimm.stories}></Carousel>
                </section>
                <section className='mt-4'>
                    <CategoryHeader label={dictionary.fairyStory.categoryHeader.andersen} url={`/${language}/fairy-story/andersen`}></CategoryHeader>
                    <Carousel stories={storiesByAndersen.stories}></Carousel>
                </section>
                <section className='mt-4'>
                    <CategoryHeader label={dictionary.fairyStory.categoryHeader.aesop} url={`/${language}/fairy-story/aesop`}></CategoryHeader>
                    <Carousel stories={fableAesops.stories}></Carousel>
                </section>
            </div>

        </div>
    )
}

