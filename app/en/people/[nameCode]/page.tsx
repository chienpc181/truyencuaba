import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SectionWithTranslation_EN } from '@/components/story/SectionWithTranslation'
import ReadingToolbar from '@/components/ReadingToolbar'
import Link from 'next/link'
import { getDisplayNameByPeopleCategory, getRouteByPeopleCategory } from '@/app/mappingCategory'

// This function generates the static paths
export async function generateStaticParams() {
    const people = await prisma.people.findMany({
        where: { isActive: true, isPublished: true},
        select: {
          nameCode: true,
          isActive: true,
          isPublished: true,
        },
    })

    return people.map((person) => ({
        nameCode: person.nameCode
    }))
}

// This function fetches the data for each static page
async function getPerson(nameCode: string) {
    const person = await prisma.people.findUnique({
        where: { nameCode, isActive: true, isPublished: true },
        include: {
            introduction: true,
            mainStory: true,
            facts: true,
            quotes: true,
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
                <div className="breadcrumbs text-sm p-4">
                    <ul>
                        <li><Link href='/en/people'>Who is who</Link></li>
                        <li><Link href={getRouteByPeopleCategory(person.category, 'en')}>{getDisplayNameByPeopleCategory(person.category, 'en')}</Link></li>
                        {/* <li>{person.name}</li> */}
                    </ul>
                </div>
                <div className='reading-toolbar'>
                    <ReadingToolbar></ReadingToolbar>
                </div>
                <article className='people-article'>
                    <section className='mb-6'>
                        <h1 className="text-center font-serif">{person.name}</h1>
                        <address className='text-center text-sm'>{person.title.en} ({person.lifeTime})</address>
                    </section>
                    <section className="min-h-40">
                        <div className='min-w-32 flex flex-col p-2 pl-0 items-center float-left'>
                            <img src={person.thumbnailUrl} alt={person.name} className="mb-2 rounded-lg shadow-lg w-28" />
                        </div>
                        <div className=''>
                            <SectionWithTranslation_EN title='' items={person.introduction}></SectionWithTranslation_EN>
                        </div>
                    </section>
                    <hr />
                    <SectionWithTranslation_EN title='' items={person.mainStory}></SectionWithTranslation_EN>
                    <hr />
                    <SectionWithTranslation_EN title='Interesting Facts' items={person.facts} type='list'></SectionWithTranslation_EN>
                    <SectionWithTranslation_EN title='Quotes' items={person.quotes} type='list'></SectionWithTranslation_EN>
                    <div className='border border-solid rounded-2xl px-4'>
                        <SectionWithTranslation_EN title='' items={person.conclusion}></SectionWithTranslation_EN>
                    </div>
                </article>
            </div>
        </div>
    )
}
