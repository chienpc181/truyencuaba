import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

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
                <article className='story-article'>
                    <section className='mb-6'>
                        <h1 className="text-center font-serif">{person.name}</h1>
                        <address className='text-center'>{person.title} </address>
                    </section>
                    <section className="flex justify-between">
                        <div className='pr-4'>
                            {person.introduction.map((item, index) => (
                                <div key={index}>
                                    <p className="mb-2">{item.en}</p>
                                </div>
                            ))}
                        </div>
                        <div className='min-w-52 flex flex-col items-center'>
                            <img src={person.thumbnailUrl} alt={person.name} className="mb-2 rounded-lg shadow-lg w-48" />
                            <address>{person.lifeTime}</address>
                        </div>
                    </section>
                    <section>
                        <h2 className='font-bold'>Early Life</h2>
                        {person.earlyLife.map((item, index) => (
                            <div key={index}>
                                <p className="mb-2">{item.en}</p>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h2 className='font-bold'>Career Path</h2>
                        {person.careerPath.map((item, index) => (
                            <div key={index}>
                                <p className="mb-2">{item.en}</p>
                            </div>
                        ))}
                    </section>
                </article>

            </div>

        </div>
    )
}