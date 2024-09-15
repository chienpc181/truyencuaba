import { prisma } from '@/lib/prisma'
import {PersonCard_VI} from '@/components/story/PersonCard'

async function getLiteraturePeople() {
  const people = await prisma.people.findMany({
    where: {
      field: 'Literature'
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

export default async function LiteraturePeoplePage() {
  const people = await getLiteraturePeople()

  return (
    <div className="page-container">
      <h1 className="text-center font-serif">Những Nhà Văn Vĩ Đại</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {people.map((person) => (
        <PersonCard_VI key={person.id} person={person} />
      ))}
      </div>
    </div>
  )
}
