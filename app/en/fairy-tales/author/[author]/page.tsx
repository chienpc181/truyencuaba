import { getAllAuthors, getStoriesByAuthor } from '@/lib/api';
import FairyTalesList_EN from '@/components/story/FairyTalesList_EN';
import { Metadata, ResolvingMetadata } from 'next';

// Define revalidation time (e.g., every day)
export const revalidate = 60; // 24 hours

export async function generateStaticParams() {
    const authors = await getAllAuthors();
    return authors;
}

export async function generateMetadata(
    { params }: { params: { author: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const decodedAuthor = decodeURIComponent(params.author);
    return {
        title: `Stories by ${decodedAuthor} - truyencuaba`,
        description: `Explore the amazing stories by ${decodedAuthor}.`
    };
}

export default async function Page({ params }: { params: { author: string } }) {
    const decodedAuthor = decodeURIComponent(params.author);
    const authorName = params.author;
    const data = await getStoriesByAuthor(authorName);
    const stories = data.stories;

    return (
        <div className='page-container'>
            <h1 className='font-bold font-serif mt-0 text-xl'>Stories by {decodedAuthor}</h1>
            <FairyTalesList_EN initialStories={stories} /> 
        </div>
    );
}
