import { getAllAuthors, getStoriesByAuthor } from '@/lib/api';
import FairyTalesList_VI from '@/components/story/FairyTalesList_VI';
import { Metadata, ResolvingMetadata } from 'next';

// Define revalidation time (e.g., every day)
// export const revalidate = 86400; // 24 hours

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
        title: `Tuyển tập ${decodedAuthor} - truyencuaba`,
        description: `Tuyển tập truyện ${decodedAuthor}.`
    };
}

export default async function Page({ params }: { params: { author: string } }) {
    const decodedAuthor = decodeURIComponent(params.author);
    const authorName = params.author;
    const data = await getStoriesByAuthor(authorName);
    const stories = data.stories;

    return (
        <div className='page-container'>
            <h1 className='font-bold font-serif mt-0 text-xl'>Tuyển tập {decodedAuthor}</h1>
            <FairyTalesList_VI initialStories={stories} /> 
        </div>
    );
}
