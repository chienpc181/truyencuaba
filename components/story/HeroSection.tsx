


// import React, { useState, useEffect } from "react";
import { FaBook, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { getStories, getStoriesByAuthor, getHeroStoryByAuthor } from "@/lib/api"
import Link from "next/link";
import { Language } from '@/app/definitions';


export async function FairyStoryHeroSection({author, lang}: {author: string, lang: string}) {
  
  const response = await getHeroStoryByAuthor(author);
  const storyData = response.stories[0];
  const heroStory = {
    id: storyData.id,
    title: lang === 'en' ? storyData.title.en : storyData.title.vi,
    imageUrl: storyData.thumbnailUrl,
    introduction: lang === 'en' ? storyData.introduction[0].en : storyData.introduction[0].vi
  };

  return (
    <>
    {heroStory && <FairyStoryHero imageUrl={heroStory.imageUrl} title={heroStory.title} introduction={heroStory.introduction}></FairyStoryHero>}
    </>
    
  );
};

const FairyStoryHero = ({ imageUrl, title, introduction }: { imageUrl: string, title: string, introduction: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
          aria-label={imageUrl}
          style={{ aspectRatio: '210/297', objectFit: 'cover', maxHeight: '560px' }}
        />
      </div>
      <div className="md:w-1/2 md:p-4">
        {/* <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">{title}</h1> */}
        <p className="indent-4">
          {introduction}
        </p>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 px-8 rounded-full 
              shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          aria-label="Read the story"
        >
          <FaBook className="inline-block mr-2" /> Read Story
        </button>
      </div>
    </div>
  )
}




