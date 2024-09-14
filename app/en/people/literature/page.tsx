import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { people } from '@prisma/client'

type LiteraturePerson = {
  id: string
  name: string
  title: string
  thumbnailUrl: string
  nameCode: string
}

// This function fetches all people in the Literature field
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
      nameCode: true 
    },
    orderBy: {
      name: 'asc'
    }
  })

  return people
}

// This is the actual page component
export default async function LiteraturePeoplePage() {
  const people = await getLiteraturePeople()
  
  return (
    <div className="page-container">
      <h1 className="text-center font-serif">Literature Figures</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  )
}

// This function is used for static generation
export async function generateStaticParams() {
  // This page doesn't have dynamic params, but we still need this function
  // for Next.js to recognize it as a static page
  return [{}]
}


function PersonCard({ person }: { person: LiteraturePerson }) {
  return (
    <Link href={`/en/people/${person.nameCode}`}>
      <div className="flex flex-col items-center border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
        <img
          src={person.thumbnailUrl}
          alt={person.name}
          className="w-52 object-cover mb-2 rounded"
        />
        <h2 className="text-lg font-semibold mb-2">{person.name}</h2>
        <div className='flex justify-between'>
          <span className="text-gray-600">{person.title}</span>
          {/* <span className=" text-gray-500">{person.lifeTime}</span> */}
        </div>

      </div>
    </Link>
  )
}