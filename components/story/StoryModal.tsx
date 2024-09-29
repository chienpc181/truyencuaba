'use client'

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Story {
    _id: string
    title: { en: string, vi: string }
    introduction: {
        en: string;
        vi: string;
    }[];
    thumbnailUrl: string,
    author: string
}

interface storyProps {
    story: Story;
    onClose: () => void;
}


function StoryModal_EN({ story, onClose }: storyProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!story) return null;
    return (
        <div className="story-dialog fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white rounded shadow-lg relative w-full md:w-3/4 xl:w-1/2 mx-2">
                <button
                    className="absolute right-2 text-4xl  text-gray-600 hover:font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
                <span className="absolute top-0 pl-4 pt-2 text-white text-xl font-semibold">{story.title.en}</span>
                <div>
                    <img src={story.thumbnailUrl} alt={story.title.en} />
                </div>
                <div className="px-4" style={{ textIndent: '1rem' }}>
                    <p>{story.introduction[0]?.en}</p>
                </div>
                <div className="flex justify-center m-4">
                    <Link href={`/en/fairy-tales/${story._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Read story</Link>
                </div>
            </div>
        </div>
    )
}

function StoryModal_VI({ story, onClose }: storyProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!story) return null;
    return (
        <div className="story-dialog fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white rounded shadow-lg relative w-full md:w-3/4 xl:w-1/2 mx-2">
                <button
                    className="absolute right-2 text-4xl  text-gray-600 hover:font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
                <span className="absolute top-0 pl-4 pt-2 text-white text-xl font-semibold">{story.title.vi}</span>
                <div>
                    <img src={story.thumbnailUrl} alt={story.title.vi} />
                </div>
                <div className="px-4" style={{ textIndent: '1rem' }}>
                    <p>{story.introduction[0]?.vi}</p>
                </div>
                <div className="flex justify-center m-4">
                    <Link href={`/vi/truyen-co-tich/${story._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Đọc truyện</Link>
                </div>
            </div>
        </div>
    )
}

export { StoryModal_EN, StoryModal_VI }
