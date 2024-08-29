import FairyTalesList from './FairyTalesList'
import { Metadata } from 'next';
import { Suspense } from 'react';
import Header from './Header';

export const metadata: Metadata = {
  title: "Fairy Tales - truyencuaba",
  description: "Wonderful fairy tales",
};

const page = 1;
const limit = 4;
const sort = 'desc';

export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/stories?page=${page}&limit=${limit}&sort=${sort}`, {
    // cache: 'force-cache', 
    cache: 'no-store', 
  });


  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }

  // const language = useLanguageContext();

  const data = await response.json();
  const initialStories = data.stories;
  return (
    <div className='page-container' >
      <Header></Header>
      <Suspense fallback={<Loading/>}>
      <FairyTalesList initialStories={initialStories} />
      </Suspense>
        
      </div>

  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
