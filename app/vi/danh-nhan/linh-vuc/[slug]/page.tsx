import { prisma } from '@/lib/prisma'
import { PersonCard_VI } from '@/components/story/PersonCard'
import { getDisplayNameByPeopleSlug } from '@/app/mappingCategory'

function mappingFieldSlug(slug: string) {
    switch (slug) {
        case ('the-thao'):
            return 'Sports'
        case ('van-hoc-nghe-thuat'):
            return 'LiteratureAndArt'
        case ('khoa-hoc-cong-nghe'):
            return 'ScienceAndTechnology'
        case ('quan-su-chinh-tri'):
            return 'MilitaryAndPolitic'
        case ('giai-tri'):
            return 'Entertainment'
        default: ''
    }
}

export async function generateStaticParams() {
    return ['ScienceAndTechnology', 'LiteratureAndArt', 'MilitaryAndPolitic', 'Sports', 'Entertainment'];
}

async function getPeopleByField(fieldName: string) {
    const people = await prisma.people.findMany({
        where: {
            category: mappingFieldSlug(fieldName),
            isActive: true,
            isPublished: true
        },
        select: {
            id: true,
            name: true,
            title: true,
            thumbnailUrl: true,
            nameCode: true,
            lifeTime: true,
            introduction: true,
        },
        orderBy: {
            name: 'asc'
        }
    })

    return people
}

export default async function PeopleByFieldPage({ params }: { params: { slug: string } }) {
    const people = await getPeopleByField(params.slug)

    return (
        <div className="page-container">
            {/* <h1 className="text-center font-serif">{params.slug}</h1> */}
            <hgroup className='page-header'>
                <h1 >{getDisplayNameByPeopleSlug(params.slug, 'vi')}</h1>
            </hgroup>
            <div>
            <h2 className='font-bold text-lg'>Tuyển tập</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {people.map((person) => (
                    <PersonCard_VI key={person.id} person={person} />
                ))}
            </div>
            </div>
            
        </div>
    )
}
