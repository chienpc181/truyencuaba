'use client'
import { useState, useEffect } from "react";
import { getStories, getStoriesByAuthor } from "@/lib/api"
import Loading from "../Loading";

export function RelatedFairyStories({ author }: { author: string }) {
    const [isVisible, setIsVisible] = useState(false);

    const [stories, setStories] = useState<{
        id: string,
        title: string,
        imageUrl: string,
        introduction: string
    }[]>([]);



    useEffect(() => {
        let ignore = false;
        const fetchStories = async () => {
            const response = await getStoriesByAuthor(author);
            setIsVisible(true);
            const stories = response.stories.map((story: {
                _id: string,
                title: { en: string, vi: string },
                thumbnailUrl: string,
                introduction: { en: string, vi: string }[]
            }) => {
                return {
                    id: story._id,
                    title: story.title.en,
                    imageUrl: story.thumbnailUrl,
                    introduction: story.introduction[0].en
                }
            });
            if (!ignore) {
                setStories(stories);
            }


        }
        fetchStories();
        return () => {
            ignore = true;
        }
    }, []);

    if (!stories.length) {
        return (
            <Loading></Loading>
        )
    }
    return (
        <>
            
            <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>

                <ul className="flex w-full overflow-x-auto overflow-y-hidden gap-3 pt-6 snap-x scroll-pl-6">
                    {stories.map((story) => (
                        <li
                            key={story.id}
                            className="bg-white flex-none snap-start rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-4 transition-transform duration-300"
                        >
                            <FairyStoryItem imageUrl={story.imageUrl} title={story.title} introduction={story.introduction}></FairyStoryItem>
                        </li>
                    ))}
                </ul>

            </div>
        </>

    )
}

const FairyStoryItem = ({ imageUrl, title, introduction }: { imageUrl: string, title: string, introduction: string }) => {
    return (
        <img
            src={imageUrl}
            alt={title}
            className="object-cover"
            style={{ aspectRatio: '210/297', height: '300px' }}
        />
    )
}