import { getAllAuthors, getStoriesByAuthor } from '@/lib/api';
import { StoryList_EN } from '@/components/story/StoryList';
import { Metadata, ResolvingMetadata } from 'next';
// import AuthorIntroduce_EN from '@/components/author/AuthorIntroduce_EN';
import { Language } from '@/app/definitions';
import { getDictionary } from '@/app/dictionaries/dictionaries';

export async function generateStaticParams() {
    // const authors = await getAllAuthors();
    // return authors;
    return ['grimm', 'andersen', 'aesop'];
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

export async function generateMetadata(
    { params }: { params: { category: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // const decodedAuthor = decodeURIComponent(params.category);
    const categoryName = mappingCategoryName(params.category);
    return {
        title: `Stories by ${categoryName} - truyencuaba`,
        description: `Explore the amazing stories by ${categoryName}.`
    };
}

export default async function FairyStoriesByCategory({ params }: { params: { category: string, lang: Language } }) {
    
    const categoryName = mappingCategoryName(params.category);
    const data = await getStoriesByAuthor(categoryName);
    const stories = data.stories;


    return (
        <div className='page-container'>
            <CategoryHeader category={params.category} lang={params.lang}/>
            <div >
                <h2 className='font-bold text-lg'>Collection</h2>
                <StoryList_EN initialStories={stories} /> 
            </div>
        </div>
    );
}

async function CategoryHeader({category, lang}: {category: string, lang: Language}) {
    const dictionary = await getDictionary(lang);
    const getCategoryTitle = () => {
        switch(category){
            case 'grimm':
                return dictionary.fairyStory.category.grim.title
            case 'andersen':
                return dictionary.fairyStory.category.andersen.title
            case 'aesop':
                return dictionary.fairyStory.category.aesop.title
            default:
                return ""
        }
    }

    const getCategoryDescription = () => {
        switch(category){
            case 'grimm':
                return dictionary.fairyStory.category.grim.description
            case 'andersen':
                return dictionary.fairyStory.category.andersen.description
            case 'aesop':
                return dictionary.fairyStory.category.aesop.description
            default:
                return ""
        }
    }

    return (
        <hgroup className='page-header'>
            <h1 >{getCategoryTitle()}</h1>
            <p>{getCategoryDescription()}</p>
        </hgroup>
    )
}
