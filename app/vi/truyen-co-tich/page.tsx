import { Metadata } from 'next';
import Carousel from '@/components/Carousel';
import CategoryHeader from '@/components/CategoryHeader';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: "Truyện cổ tích - truyencuaba",
    description: "Truyện cổ tích Việt nam và thế giới",
};

const page = 1;
const limit = 4;
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

    return (
        <div className='page-container' >
            <h1 className='font-bold font-serif mt-0 text-xl'>Truyện cổ tích</h1>
            <Suspense fallback={<span className="loading loading-ring loading-xs"></span>}>
                <div>
                    <CategoryHeader header={{ label: 'Brothers Grimm', url: `/en/fairy-tales/author/Brothers Grimm` }}></CategoryHeader>
                    <Carousel stories={storiesByBrothersGrimm.stories}></Carousel>
                </div>
                <div>
                    <CategoryHeader header={{ label: 'Hans Christian Andersen', url: `/en/fairy-tales/author/Hans Christian Andersen` }}></CategoryHeader>
                    <Carousel stories={storiesByAndersen.stories}></Carousel>
                </div>
            </Suspense>
        </div>
    )
}

