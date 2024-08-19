import FairyTalesList from './FairyTalesList'
import { getStories } from '@/lib/api'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fairy Tales - truyencuaba",
  description: "Wonderful fairy tales",
};

export default async function Page() {
  // const data = await getStories();
  // const response = await fetch(`${process.env.BASE_URL}/api/stories`, {
  //   cache: 'no-store', 
  // });
  const response = await fetch('https://truyencuaba.vercel.app/api/stories', {
    cache: 'no-store', 
  });

  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }

  const data = await response.json();
  const initialStories = data.stories;
  return (
    <div className='page-container'>
      <div>testing...</div>
        <FairyTalesList initialStories={initialStories} />
      </div>

  )
}
