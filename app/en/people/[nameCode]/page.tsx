import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import OverlayPanel from '@/components/OverlayPanel';
import { MdTranslate } from "react-icons/md";
import ItemWithTranslation from './ItemWithTranslation';

// This function generates the static paths
export async function generateStaticParams() {
    const people = await prisma.people.findMany({
        select: { nameCode: true }
    })

    return people.map((person) => ({
        nameCode: person.nameCode,
    }))
}

// This function fetches the data for each static page
async function getPerson(nameCode: string) {
    const person = await prisma.people.findUnique({
        where: { nameCode },
        include: {
            introduction: true,
            earlyLife: true,
            careerPath: true,
            challenges: true,
            legacies: true,
            facts: true,
            quotes: true,
            personalLife: true,
            conclusion: true
        }
    })

    if (!person) {
        notFound()
    }

    return person
}

// This is the actual page component
export default async function PersonPage({ params }: { params: { nameCode: string } }) {
    const person = await getPerson(params.nameCode)

    return (
        <div className="story-container">
            <div className='story-details'>
                <article className='people-article'>
                    <section className='mb-6'>
                        <h1 className="text-center font-serif">{person.name}</h1>
                        <address className='text-center text-sm'>{person.title} ({person.lifeTime})</address>
                    </section>
                    <section className="min-h-36">
                        <div className='min-w-32 flex flex-col p-2 pl-0 items-center float-left'>
                            <img src={person.thumbnailUrl} alt={person.name} className="mb-2 rounded-lg shadow-lg w-28" />
                        </div>
                        <div className=''>
                            {/* {person.introduction.map((item, index) => (
                                <div key={index}>
                                    <p className="mb-2">{item.en}</p>
                                </div>
                            ))} */}
                            <SectionParagraph title='' items={person.introduction}></SectionParagraph>
                        </div>
                    </section>
                    <SectionParagraph title='Early Life' items={person.earlyLife}></SectionParagraph>
                    <SectionParagraph title='Career Path' items={person.careerPath}></SectionParagraph>
                    <SectionParagraph title='Challenges' items={person.challenges}></SectionParagraph>
                    <SectionParagraph title='Legacies' items={person.legacies}></SectionParagraph>
                    <SectionList title='Interesting Facts' items={person.facts}></SectionList>
                    <SectionList title='Quotes' items={person.quotes}></SectionList>
                    <SectionParagraph title='Personal Life' items={person.personalLife}></SectionParagraph>
                    <SectionParagraph title='Conclusion' items={person.conclusion}></SectionParagraph>
                    
                </article>

            </div>

        </div>
    )
}

function SectionParagraph({ title, items }: { title: string, items: {en: string, vi: string}[]}) {
    return (
        <section>
        <h2>{title}</h2>
        {items.map((item, index) => (
            <ItemWithTranslation item={item} key={index}></ItemWithTranslation>
        ))}
    </section>
    )
  }

  function SectionList({ title, items }: { title: string, items: {en: string, vi: string}[]}) {
    return (
        <section>
        <h2>{title}</h2>
        <ul>
        {items.map((item, index) => (
            <li key={index}>
<ItemWithTranslation item={item} ></ItemWithTranslation>
            </li>
            
        ))}
        </ul>
        
    </section>
    )
  }