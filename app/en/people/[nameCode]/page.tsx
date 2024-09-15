import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SectionWithTranslation_EN } from '@/components/story/SectionWithTranslation'

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
                    <section className="min-h-40">
                        <div className='min-w-32 flex flex-col p-2 pl-0 items-center float-left'>
                            <img src={person.thumbnailUrl} alt={person.name} className="mb-2 rounded-lg shadow-lg w-28" />
                        </div>
                        <div className=''>
                            <SectionWithTranslation_EN title='' items={person.introduction}></SectionWithTranslation_EN>
                        </div>
                    </section>
                    <SectionWithTranslation_EN title='Early Life' items={person.earlyLife}></SectionWithTranslation_EN>
                    <SectionWithTranslation_EN title='Career Path' items={person.careerPath}></SectionWithTranslation_EN>
                    <SectionWithTranslation_EN title='Challenges' items={person.challenges}></SectionWithTranslation_EN>
                    <SectionWithTranslation_EN title='Legacies' items={person.legacies}></SectionWithTranslation_EN>
                    <SectionWithTranslation_EN title='Interesting Facts' items={person.facts} type='list'></SectionWithTranslation_EN>
                    <SectionWithTranslation_EN title='Quotes' items={person.quotes} type='list'></SectionWithTranslation_EN>
                    <SectionWithTranslation_EN title='Personal Life' items={person.personalLife}></SectionWithTranslation_EN>
                    <SectionWithTranslation_EN title='Conclusion' items={person.conclusion}></SectionWithTranslation_EN>

                </article>

            </div>

        </div>
    )
}
