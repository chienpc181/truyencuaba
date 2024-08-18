import { getStoryById, getAllStoryIds } from '@/lib/api';
import StoryDetails from './StoryDetails';

// Fetch the data on the server side for static generation
export async function generateStaticParams() {
  const storyIds = await getAllStoryIds();
  return storyIds;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const story = await getStoryById(params.slug);

  return (
    <StoryDetails story={story} />
  );
}


