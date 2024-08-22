import FairyTalesList from './FairyTalesList'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fairy Tales - truyencuaba",
  description: "Wonderful fairy tales",
};

export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/stories`, {
    cache: 'no-store', 
  });


  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }

  const data = await response.json();
  const initialStories = data.stories;
  return (
    <div className='page-container' >
        <FairyTalesList initialStories={initialStories} />
      </div>

  )
}
