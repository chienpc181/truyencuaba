import { getStoryById, getAllStoryIds, getStoriesByAuthor } from '@/lib/api';
import StoryDetails_EN from '@/components/story/StoryDetails_EN';
import { Metadata, ResolvingMetadata } from 'next';
import { Language } from '@/app/definitions';
import { getDictionary } from '@/app/dictionaries/dictionaries';
import { notFound } from 'next/navigation';


export async function generateStaticParams({ params }: { params: { nameCode: string, category: string, lang: Language } }) {
const categoryName = mappingCategoryName(params.category);
const data = await getStoriesByAuthor(categoryName);
const stories = data.stories;
  return stories.map((story: { _id: string }) => ({ id: story._id }));
}

export async function generateMetadata(
  { params }: { params: { nameCode: string, category: string, lang: Language } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const story = await getStoryById(params.nameCode);
 
  return {
    title: story.title.en + ' - truyencuaba',
    description: story.introduction[0] ? story.introduction[0].en : 'A wonderful fairy tale'
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

const mappingCategoryName = (routeName: string) => {
    switch(routeName){
        case 'grimm':
            return "Brothers Grimm"
        case 'andersen':
            return "Hans Christian Andersen"
        case 'aesop':
            return "Aesop"
        default:
            return "Not found"
    }
}

export default async function Page({ params }: { params: { nameCode: string, category: string, lang: Language } }) {
  let story = await getStoryById(params.nameCode);
  const categoryName = mappingCategoryName(params.category);
  if (story.author !== categoryName){
    notFound();
  }

  return (
    <StoryDetails_EN story={story} />
  );
}


