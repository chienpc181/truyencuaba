import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SectionWithTranslation_VI } from '@/components/story/SectionWithTranslation'

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
                            <SectionWithTranslation_VI title='' items={person.introduction}></SectionWithTranslation_VI>
                        </div>
                    </section>
                    <SectionWithTranslation_VI title='Thuở thơ ấu' items={person.earlyLife}></SectionWithTranslation_VI>
                    <SectionWithTranslation_VI title='Con đường sự nghiệp' items={person.careerPath}></SectionWithTranslation_VI>
                    <SectionWithTranslation_VI title='Những thử thách' items={person.challenges}></SectionWithTranslation_VI>
                    <SectionWithTranslation_VI title='Di sản để lại' items={person.legacies}></SectionWithTranslation_VI>
                    <SectionWithTranslation_VI title='Sự thật thú vị' items={person.facts} type='list'></SectionWithTranslation_VI>
                    <SectionWithTranslation_VI title='Những câu nói bất hủ' items={person.quotes} type='list'></SectionWithTranslation_VI>
                    <SectionWithTranslation_VI title='Đời sống cá nhân' items={person.personalLife}></SectionWithTranslation_VI>
                    <SectionWithTranslation_VI title='Tổng kết' items={person.conclusion}></SectionWithTranslation_VI>

                </article>

            </div>

        </div>
    )
}
