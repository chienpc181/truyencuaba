import { Metadata } from 'next';
import Carousel from '@/components/Carousel';
import CategoryHeader from '@/components/CategoryHeader';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

export const metadata: Metadata = {
  title: "Fairy Tales - truyencuaba",
  description: "Wonderful fairy tales",
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
      <h1 className='font-bold font-serif mt-0 text-xl'>Fairy Tales</h1>
      <Suspense fallback={<Loading />}>
        <div>
          <CategoryHeader header={{ label: 'Stories of Brothers Grimm', url: `/en/fairy-tales/author/Brothers Grimm` }}></CategoryHeader>
          <Carousel stories={storiesByBrothersGrimm.stories}></Carousel>
        </div>
        <div className='mt-4'>
          <CategoryHeader header={{ label: 'Stories of Andersen', url: `/en/fairy-tales/author/Hans Christian Andersen` }}></CategoryHeader>
          <Carousel stories={storiesByAndersen.stories}></Carousel>
        </div>
        <div className='mt-4'>
          <CategoryHeader header={{ label: 'Fables of Aesop', url: `/en/fairy-tales/author/Aesop` }}></CategoryHeader>
          <Carousel stories={fableAesops.stories}></Carousel>
        </div>
        <div className='mt-4'>
          <CategoryHeader header={{ label: 'Vietnamese folk tales', url: `/en/fairy-tales/author/FolkTales` }}></CategoryHeader>
          <Carousel stories={folkTales.stories}></Carousel>
        </div>
        <div className='mt-4'>
          <CategoryHeader header={{ label: 'Vietnamese legend tales', url: `/en/fairy-tales/author/LegendTales` }}></CategoryHeader>
          <Carousel stories={legendTales.stories}></Carousel>
        </div>
      </Suspense>
    </div>
  )
}

