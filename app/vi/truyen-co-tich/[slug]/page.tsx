import { getStoryById, getAllStoryIds } from '@/lib/api';
import StoryDetails_VI from '@/components/story/StoryDetails_VI';
import { Metadata, ResolvingMetadata } from 'next';

// Fetch the data on the server side for static generation
export async function generateStaticParams() {
  const storyIds = await getAllStoryIds();
  return storyIds;
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const story = await getStoryById(params.slug);
 
  return {
    title: story.title.vi + ' - truyencuaba',
    description: story.description[0] ? story.description[0].vi : 'Truyện cổ tích của ba'
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const story = await getStoryById(params.slug);

  return (
    <StoryDetails_VI story={story} />
  );
}


