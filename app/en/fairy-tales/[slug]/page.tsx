import { getStoryById, getAllStoryIds } from '@/lib/api';
import StoryDetails_EN from '@/components/story/StoryDetails_EN';
import { Metadata, ResolvingMetadata } from 'next';

// export const revalidate = 60; // 1 hours

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
    title: story.title.en + ' - truyencuaba',
    description: story.introduction[0] ? story.introduction[0].en : 'A wonderful fairy tale'
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const story = await getStoryById(params.slug);

  return (
    <StoryDetails_EN story={story} />
  );
}


