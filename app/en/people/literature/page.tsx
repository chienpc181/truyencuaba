import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { people } from '@prisma/client'

type LiteraturePerson = {
  id: string
  name: string
  title: string
  thumbnailUrl: string
  nameCode: string
  lifeTime: string
  introduction: Translation[]
}

type Translation = {
  en: string
  vi: string
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


// export default async function LiteraturePeoplePage() {
//   const people = await getLiteraturePeople()

//   return (
//     <div className="page-container">
//       <h1 className="text-center font-serif">Literature Figures</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {people.map((person) => (
//           <PersonCard key={person.id} person={person} />
//         ))}
//       </div>
//     </div>
//   )
// }

// function PersonCard({ person }: { person: LiteraturePerson }) {
//   return (
//     <Link href={`/en/people/${person.nameCode}`}>
//       <div className="flex flex-col items-center border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
//         <img
//           src={person.thumbnailUrl}
//           alt={person.name}
//           className="w-52 object-cover mb-2 rounded"
//         />
//         <h2 className="text-lg font-semibold mb-2">{person.name}</h2>
//         <div className='flex justify-between'>
//           <span className="text-gray-600">{person.title}</span>
//           {/* <span className=" text-gray-500">{person.lifeTime}</span> */}
//         </div>

//       </div>
//     </Link>
//   )
// }



export default async function LiteraturePeoplePage() {
  const people = await getLiteraturePeople()

  return (
    <div className="page-container">
      <h1 className="text-center font-serif">Literature Figures</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {people.map((person) => (
        <PersonItem key={person.id} person={person} />
      ))}
      </div>
      
    </div>
  )
}

function PersonItem({ person }: { person: LiteraturePerson }) {
  return (
    <Link href={`/en/people/${person.nameCode}`}>
        <div className="person-card  border rounded-lg shadow-lg p-4 pt-2 hover:shadow-xl transition-shadow duration-300 h-60">
          <h3 className="font-semibold mb-2 m-0 ">{person.name}</h3>
          <hr />
          <div className='flex flex-row pt-4'>
          <div className='min-w-24'>
            <img
              src={person.thumbnailUrl}
              alt={person.name}
              className="w-24 object-cover mb-2 rounded"
            />
            <div className="text-gray-500 text-sm text-center">{person.lifeTime}</div>
            {/* <div className="text-gray-500 text-sm">{person.title}</div> */}
          </div>
          <div className='ml-4'>
            
            {person.introduction.map((item, index) => (
              <div className='introduction' key={index}>
                <span className="mb-2">{item.en}</span>
              </div>
            ))}
          </div>
          </div>
          
        </div>
      </Link>
  )
}