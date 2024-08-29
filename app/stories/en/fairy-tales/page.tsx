import FairyTalesList_EN from './FairyTalesList_EN';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Carousel from '@/components/Carousel';

export const metadata: Metadata = {
  title: "All Fairy Tales - truyencuaba",
  description: "Wonderful fairy tales",
};

const page = 1;
const limit = 6;
const sort = 'desc';

export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/stories?page=${page}&limit=${limit}&sort=${sort}`, {
    cache: 'force-cache',
    //   cache: 'no-store', 
  });


  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }

  // const language = useLanguageContext();

  const data = await response.json();
  const initialStories = data.stories;
  return (
    <div className='page-container' >
      <h1 className='font-bold font-serif mt-0 text-xl'>Fairy Tales</h1>
      {/* <FairyTalesList_EN initialStories={initialStories} /> */}
      <div>
        <h2 className='font-bold mt-6'>Brother Grimms</h2>
      <Carousel stories={initialStories}></Carousel>
      </div>
      <div>
        <h2 className='font-bold mt-6'>Hans Christian Andersen</h2>
      <Carousel stories={initialStories.slice(1)}></Carousel>
      </div>
      <div>
        <h2 className='font-bold mt-6'>Vietnamese folks</h2>
      <Carousel stories={initialStories.slice(3)}></Carousel>
      </div>
      
    </div>

  )
}

