import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SectionWithTranslation_VI } from '@/components/story/SectionWithTranslation'
import ReadingToolbar from '@/components/ReadingToolbar'
import Link from 'next/link'
import { getDisplayNameByPeopleCategory, getRouteByPeopleCategory } from '@/app/mappingCategory'

// This function generates the static paths
export async function generateStaticParams() {
    const peopleStories = await prisma.peoplestories.findMany({
        where: { 
            isActive: true, 
            // isPublished: true,
            status: "ReadyForPublish",
        },
        select: {
          nameCode: true,
          isActive: true,
          isPublished: true,
          status: true
        },
      });

    return peopleStories.map((ps) => ({
        nameCode: ps.nameCode
    }))
}

// This function fetches the data for each static page
async function getPeopleStory(nameCode: string) {
    const peopleStory = await prisma.peoplestories.findUnique({
        where: { 
            nameCode,  
            isActive: true, 
            // isPublished: true,
            status: "ReadyForPublish"
        },
        include: {
            introduction: true,
            mainStory: true,
            facts: true,
            quotes: true,
            conclusion: true
        }
    })

    if (!peopleStory) {
        notFound()
    }

    return peopleStory
}

// This is the actual page component
export default async function PeopleStoryPage({ params }: { params: { nameCode: string } }) {
    const peopleStory = await getPeopleStory(params.nameCode)

    return (
        <div className="story-container">
            <div className='story-details'>
                <div className="breadcrumbs text-sm p-4">
                    <ul>
                        <li><Link href='/vi/danh-nhan'>Danh Nhân</Link></li>
                        <li><Link href={getRouteByPeopleCategory(peopleStory.category, 'vi')}>{getDisplayNameByPeopleCategory(peopleStory.category, 'vi')}</Link></li>
                        {/* <li>{peopleStory.name}</li> */}
                    </ul>
                    </div>
                    <div className='reading-toolbar'>
                    <ReadingToolbar></ReadingToolbar>
                </div>
                <article className='people-article'>
                    <section className='mb-6'>
                        <h1 className="text-center font-serif">{peopleStory.name}</h1>
                        <address className='text-center'>{peopleStory.title.vi} ({peopleStory.lifeTime})</address>
                    </section>
                    <section className="min-h-40">
                        <div className='min-w-32 flex flex-col p-2 pl-0 items-center float-left'>
                            <img src={peopleStory.thumbnailUrl} alt={peopleStory.name} className="mb-2 rounded-lg shadow-lg w-28" />
                        </div>
                        <div className=''>
                            <SectionWithTranslation_VI title='' items={peopleStory.introduction}></SectionWithTranslation_VI>
                        </div>
                    </section>
                    <hr />
                    <SectionWithTranslation_VI title='' items={peopleStory.mainStory}></SectionWithTranslation_VI>
                    <hr />
                    <SectionWithTranslation_VI title='Sự thật thú vị' items={peopleStory.facts} type='list'></SectionWithTranslation_VI>
                    <SectionWithTranslation_VI title='Những câu nói bất hủ' items={peopleStory.quotes} type='list'></SectionWithTranslation_VI>
                    <div className='border border-solid rounded-2xl px-4'>
                    <SectionWithTranslation_VI title='' items={peopleStory.conclusion}></SectionWithTranslation_VI>
                    </div>
                </article>
            </div>
        </div>
    )
}
