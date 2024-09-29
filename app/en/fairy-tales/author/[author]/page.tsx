import { getAllAuthors, getStoriesByAuthor } from '@/lib/api';
import { StoryList_EN } from '@/components/story/StoryList';
import { Metadata, ResolvingMetadata } from 'next';
import AuthorIntroduce_EN from '@/components/author/AuthorIntroduce_EN';

// Define revalidation time (e.g., every day)
// export const revalidate = 60; // 24 hours

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
            <AuthorIntroduce_EN author={decodedAuthor}></AuthorIntroduce_EN>
            <div >
                <h2 className='font-bold text-lg'>Collection</h2>
                <StoryList_EN initialStories={stories} /> 
            </div>
            
        </div>
    );
}
