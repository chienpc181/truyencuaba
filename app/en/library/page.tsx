'use client'

import { useState, useEffect } from "react"
import { prisma } from '@/lib/prisma'
import { getStories, getStoriesByAuthor } from "@/lib/api"

const allCategories = [
    {
        name: "fairyTales",
        display: "Fairy Tales & Fables"
    },
    {
        name: "famousPeople",
        display: "Famous People"
    },
    {
        name: "historicalStories",
        display: "Historical Stories"
    },
    {
        name: "greatestLiteraries",
        display: "Greatest Literaries"
    },
]


async function getPeopleStories() {
    const people = await prisma.peoplestories.findMany({
        where: {
            isActive: true,
            // isPublished: true,
            status: "ReadyForPublish"
        },
        select: {
            id: true,
            name: true,
            title: true,
            thumbnailUrl: true
        },
        orderBy: {
            name: 'asc'
        }
    })

    return people
}




export default function LibraryPage() {
    const [selectedCategory, setSelectCategory] = useState('fairyTales');
    const [stories, setStories] = useState<{title: string, thumbnailUrl: string}[]>([]);

    const handleSelectCategory = async (category: string) => {
        setSelectCategory(category);
        
        if (category === "fairyTales") {
            const response = await getStoriesByAuthor("Aesop");
            // setStories([{title: "Snow White"}])
            setStories(response.stories.map((story: {id: string, title: {en: string, vi: string}, thumbnailUrl: string}) => {
                return {
                    title: story.title.en,
                    thumbnailUrl: story.thumbnailUrl
                }
            }))
        }
        else if (category === "famousPeople") {
            const response = await getPeopleStories();

            setStories(response.map((story) => {
                return {title: story.title.en, thumbnailUrl: story.thumbnailUrl}
            }))
        }
        else if (category === "greatestLiteraries") {
            setStories([{title: "Romeo and Juliet", thumbnailUrl: ""}])
        }
    }
    
    return (
        <div className='page-container'> 
            <h1 className="text-2xl text-center font-bold">Library</h1>
            <div>
                <span className="text-lg font-bold">Category</span>
                <div className="category-panel">
                    <div className="flex gap-3">
                        {allCategories.map((category, index) => (
                            <SelectCategoryItem key={index} title={category.display} onClick={() => handleSelectCategory(category.name)}/>
                        ))}
                        
                    </div>
                </div>
                {selectedCategory}
            </div>
            <div>
                <span className="text-lg font-bold">Result</span>
                {/* <div className="flex flex-col gap-2">
                    {stories.map((story, index) => (
                        <ResultItem key={index} title={story.title}/>
                    ))}
                </div> */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {stories.map((story, index) => (
                        <ResultItem key={index} title={story.title} thumbnailUrl={story.thumbnailUrl}/>
                    ))}
                </div>
            </div>
        </div>
    )
}


function SelectCategoryItem({title, onClick}: {title: string, onClick: () => void}) {

    return (
        <div className="flex items-center text-xl text-white font-semibold justify-between w-40 h-auto rounded-lg bg-blue-400
                        cursor-pointer" style={{aspectRatio: '297/210'}} onClick={onClick}>
            <div className="w-full text-center">{title}</div>
        </div>
    )
}

function ResultItem({title, thumbnailUrl}: {title: string, thumbnailUrl: string}) {

    return (
        <div className="rounded-lg border border-gray-300">
            {/* {title} */}
            <img src={thumbnailUrl} alt={title} style={{aspectRatio: '3/4', objectFit: 'cover', borderRadius: '8px'}}></img>
            {/* <img src={thumbnailUrl} alt={title} style={{aspectRatio: '210/297', objectFit: 'cover', borderRadius: '8px'}}></img> */}
        </div>
    )
}