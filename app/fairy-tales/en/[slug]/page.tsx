
// import { getStoryById, getAllStoryIds } from '@/lib/api'

// export async function generateStaticParams() {
//   const storyIds = await getAllStoryIds()

//   return storyIds;
// }

// export default async function Page({ params }: { params: { slug: string } }) {
//   const story = await getStoryById(params.slug)
//   const handleTranslate = () => {

//   }

//   return (
//     <div className="story-details">
//       <h1 className='text-center'>{story.title.en}</h1>
//       {story.paragraphs.map((para: any, index: number) => (
//         <div key={index}>
//           <p>{para.en} <span><button className='btn btn-xs' onClick={handleTranslate}> translate</button></span></p>
//           <span className='d-none' style={{display: 'none'}}>{para.vi}</span>
//         </div>
        
//       ))}
//     </div>
//   )
// }



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


