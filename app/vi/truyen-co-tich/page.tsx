import { Metadata } from 'next';
import Carousel from '@/components/Carousel';
import CategoryHeader from '@/components/CategoryHeader';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

export const metadata: Metadata = {
    title: "Truyện cổ tích - truyencuaba",
    description: "Truyện cổ tích Việt nam và thế giới",
};

const page = 1;
const limit = 5;
const sort = 'desc';

async function getStoriesByAuthor(author: string) {
    const response = await fetch(`${process.env.BASE_URL}/api/stories/author?author=${author}&limit=${limit}`,
        { cache: 'no-store' }
    )
    if (!response.ok) {
        throw new Error('Failed to fetch story data')
    }
    return response.json()
}

export default async function Page() {
    const storiesByBrothersGrimm = await getStoriesByAuthor('Brothers Grimm');
    const storiesByAndersen = await getStoriesByAuthor('Hans Christian Andersen');
    const fableAesops = await getStoriesByAuthor('Aesop');
    const folkTales = await getStoriesByAuthor('FolkTales');
    const legendTales = await getStoriesByAuthor('LegendTales');

    return (
        <div className='page-container' >
            <h1 className='font-bold font-serif mt-0 text-xl'>Truyện cổ tích</h1>
            <Suspense fallback={<Loading />}>
                <div className='mt-4'>
                    <CategoryHeader header={{ label: 'Anh em nhà Grimm', url: `/vi/truyen-co-tich/tac-gia/Brothers Grimm` }}></CategoryHeader>
                    <Carousel stories={storiesByBrothersGrimm.stories}></Carousel>
                </div>
                <div className='mt-4'>
                    <CategoryHeader header={{ label: 'Truyện cổ tích Andersen', url: `/vi/truyen-co-tich/tac-gia/Hans Christian Andersen` }}></CategoryHeader>
                    <Carousel stories={storiesByAndersen.stories}></Carousel>
                </div>
                <div className='mt-4'>
                    <CategoryHeader header={{ label: 'Truyện ngụ ngôn Aesop', url: `/vi/fairy-tales/author/Aesop` }}></CategoryHeader>
                    <Carousel stories={fableAesops.stories}></Carousel>
                </div>
                <div className='mt-4'>
                    <CategoryHeader header={{ label: 'Truyện dân gian', url: `/vi/fairy-tales/author/FolkTales` }}></CategoryHeader>
                    <Carousel stories={folkTales.stories}></Carousel>
                </div>
                <div className='mt-4'>
                    <CategoryHeader header={{ label: 'Truyền thuyết, sự tích', url: `/vi/fairy-tales/author/LegendTales` }}></CategoryHeader>
                    <Carousel stories={legendTales.stories}></Carousel>
                </div>
            </Suspense>
        </div>
    )
}

