import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SectionWithTranslation_VI } from '@/components/story/SectionWithTranslation'
import ReadingToolbar from '@/components/ReadingToolbar'

// This function generates the static paths
export async function generateStaticParams() {
    const people = await prisma.people.findMany({
        select: { nameCode: true, isActive: true }
    })

    return people.map((person) => ({
        nameCode: person.nameCode,
        isActive: person.isActive
    }))
}

// This function fetches the data for each static page
async function getPerson(nameCode: string, isActive: boolean) {
    const person = await prisma.people.findUnique({
        where: { nameCode,  isActive},
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
    const person = await getPerson(params.nameCode, true)

    return (
        <div className="story-container">
            <div className='story-details'>
                <div className="breadcrumbs text-sm p-4">
                    <ul>
                        <li><a href='/vi/danh-nhan'>Danh Nhân</a></li>
                        <li>{person.name}</li>
                    </ul>
                    </div>
                    <div className='reading-toolbar'>
                    <ReadingToolbar></ReadingToolbar>
                </div>
                <article className='people-article'>
                    <section className='mb-6'>
                        <h1 className="text-center font-serif">{person.name}</h1>
                        <address className='text-center'>{person.title.vi} ({person.lifeTime})</address>
                    </section>
                    <section className="min-h-40">
                        <div className='min-w-32 flex flex-col p-2 pl-0 items-center float-left'>
                            <img src={person.thumbnailUrl} alt={person.name} className="mb-2 rounded-lg shadow-lg w-28" />
                        </div>
                        <div className=''>
                            <SectionWithTranslation_VI title='' items={person.introduction}></SectionWithTranslation_VI>
                        </div>
                    </section>
                    <hr />
                    <SectionWithTranslation_VI title='' items={person.mainStory}></SectionWithTranslation_VI>
                    <hr />
                    <SectionWithTranslation_VI title='Sự thật thú vị' items={person.facts} type='list'></SectionWithTranslation_VI>
                    <SectionWithTranslation_VI title='Những câu nói bất hủ' items={person.quotes} type='list'></SectionWithTranslation_VI>
                    <div className='border border-solid rounded-2xl px-4'>
                    <SectionWithTranslation_VI title='' items={person.conclusion}></SectionWithTranslation_VI>
                    </div>
                </article>
            </div>
        </div>
    )
}
