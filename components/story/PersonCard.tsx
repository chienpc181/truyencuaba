import Link from 'next/link'

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

function PersonCard_EN({ person }: { person: LiteraturePerson }) {
    return (
        <Link href={`/en/people/${person.nameCode}`}>
            <div className="person-card  border rounded-lg shadow-lg p-4 pt-2 hover:shadow-xl transition-shadow duration-300 h-60">
                <div className="font-semibold mb-2 m-0 text-lg ">{person.name}</div>
                <hr />
                <div className='flex flex-row pt-4'>
                    <div className='min-w-24 pt-2'>
                        <img
                            src={person.thumbnailUrl}
                            alt={person.name}
                            className="w-24 object-cover mb-2 rounded"
                        />
                        <div className="text-gray-500 text-sm text-center">{person.lifeTime}</div>
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

function PersonCard_VI({ person }: { person: LiteraturePerson }) {
    return (
        <Link href={`/vi/danh-nhan/${person.nameCode}`}>
            <div className="person-card  border rounded-lg shadow-lg p-4 pt-2 hover:shadow-xl transition-shadow duration-300 h-60">
                <div className="font-semibold mb-2 m-0 text-lg ">{person.name}</div>
                <hr />
                <div className='flex flex-row pt-4'>
                    <div className='min-w-24 pt-2'>
                        <img
                            src={person.thumbnailUrl}
                            alt={person.name}
                            className="w-24 object-cover mb-2 rounded"
                        />
                        <div className="text-gray-500 text-sm text-center">{person.lifeTime}</div>
                    </div>
                    <div className='ml-4'>
                        {person.introduction.map((item, index) => (
                            <div className='introduction' key={index}>
                                <span className="mb-2">{item.vi}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export { PersonCard_EN, PersonCard_VI }