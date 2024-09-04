import { Metadata } from 'next';
import Carousel from '@/components/Carousel';
import CategoryHeader from '@/components/CategoryHeader';
import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: "Fairy Tales - truyencuaba",
  description: "Wonderful fairy tales",
};

// const Carousel = dynamic(() => import('@/components/Carousel'), { loading: () => <Loading /> });

const page = 1;
const limit = 5;

async function fetchStoriesByAuthor(author: string) {
  const response = await fetch(`${process.env.BASE_URL}/api/stories/author?author=${author}&limit=${limit}`,
    // { cache: 'no-store' }
  )
  if (!response.ok) {
    throw new Error('Failed to fetch story data')
  }
  return response.json()
}

export default async function Page() {
  const [storiesByBrothersGrimm, storiesByAndersen, fableAesops, folkTales, legendTales] = await Promise.all([
    fetchStoriesByAuthor('Brothers Grimm'),
    fetchStoriesByAuthor('Hans Christian Andersen'),
    fetchStoriesByAuthor('Aesop'),
    fetchStoriesByAuthor('FolkTales'),
    fetchStoriesByAuthor('LegendTales'),
  ]);

  return (
    <div className='page-container' >
      <h1 className='font-bold font-serif mt-0 text-xl'>Fairy Tales</h1>
      <div>
        <CategoryHeader label='Stories of Brothers Grimm' url='/en/fairy-tales/author/Brothers Grimm'></CategoryHeader>
        <Carousel stories={storiesByBrothersGrimm.stories}></Carousel>
      </div>
      <div className='mt-4'>
        <CategoryHeader label='Stories of Andersen' url='/en/fairy-tales/author/Hans Christian Andersen'></CategoryHeader>
        <Carousel stories={storiesByAndersen.stories}></Carousel>
      </div>
      <div className='mt-4'>
        <CategoryHeader label='Fables of Aesop' url='/en/fairy-tales/author/Aesop'></CategoryHeader>
        <Carousel stories={fableAesops.stories}></Carousel>
      </div>
      <div className='mt-4'>
        <CategoryHeader label='Vietnamese folk tales' url='/en/fairy-tales/author/FolkTales'></CategoryHeader>
        <Carousel stories={folkTales.stories}></Carousel>
      </div>
      <div className='mt-4'>
        <CategoryHeader label='Vietnamese legend tales' url='/en/fairy-tales/author/LegendTales'></CategoryHeader>
        <Carousel stories={legendTales.stories}></Carousel>
      </div>
    </div>
  )
}

