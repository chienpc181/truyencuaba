import FairyTalesList_EN from '@/components/FairyTalesList_EN';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Carousel from '@/components/Carousel';
import CategoryHeader from '@/components/CategoryHeader';

export const metadata: Metadata = {
  title: "All Fairy Tales - truyencuaba",
  description: "Wonderful fairy tales",
};

const page = 1;
const limit = 4;
const sort = 'desc';

async function getStoriesByAuthor(author: string) {
  const response = await fetch(`${process.env.BASE_URL}/api/stories/author?author=${author}&limit=${limit}`,
    {cache: 'no-store'}
  )
  if (!response.ok) {
    throw new Error('Failed to fetch story data')
  }
  return response.json()
}

export default async function Page() {
  // const response = await fetch(`${process.env.BASE_URL}/api/stories?page=${page}&limit=${limit}&sort=${sort}`, {
  //   cache: 'force-cache',
  //   //   cache: 'no-store', 
  // });


  // if (!response.ok) {
  //   throw new Error('Failed to fetch stories');
  // }

  // const data = await response.json();
  // const initialStories = data.stories;


  const storiesByBrothersGrimm = await getStoriesByAuthor('Brothers Grimm');
  const storiesByAndersen = await getStoriesByAuthor('Hans Christian Andersen');

  return (
    <div className='page-container' >
      <h1 className='font-bold font-serif mt-0 text-xl'>Fairy Tales</h1>
      <div>
        <CategoryHeader header={{label: 'Brothers Grimm', url: `/stories/en/fairy-tales/author/Brothers Grimm`}}></CategoryHeader>
        <Carousel stories={storiesByBrothersGrimm.stories}></Carousel>
      </div>
      <div>
        <CategoryHeader header={{label: 'Hans Christian Andersen', url: `/stories/en/fairy-tales/author/Hans Christian Andersen`}}></CategoryHeader>
        <Carousel stories={storiesByAndersen.stories}></Carousel>
      </div>
      
    </div>

  )
}

