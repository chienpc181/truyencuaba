


// import React, { useState, useEffect } from "react";
import { FaBook, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getStories, getStoriesByAuthor, getHeroStoryByAuthor } from "@/lib/api"


export async function FairyStoryHeroSection({author}: {author: string}) {
  
  const response = await getHeroStoryByAuthor(author);
  const storyData = response.stories[0];
  const heroStory = {
    id: storyData.id,
    title: storyData.title.en,
    imageUrl: storyData.thumbnailUrl,
    introduction: storyData.introduction[0].en
  };

  return (
    <>
    {heroStory && <FairyStoryHero imageUrl={heroStory.imageUrl} title={heroStory.title} introduction={heroStory.introduction}></FairyStoryHero>}
    </>
    
  );
};

const FairyStoryHero = ({imageUrl, title, introduction}: {imageUrl: string, title: string, introduction: string}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src={imageUrl}
              alt={title}
              className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              aria-label={imageUrl}
              style={{aspectRatio: '3/4', objectFit: 'cover', maxHeight: '560px'}}
            />
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">{title}</h1>
            <p className="text-xl text-gray-700 mb-8">
              {introduction}
            </p>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 px-8 rounded-full text-xl 
              shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              aria-label="Read the story"
            >
              <FaBook className="inline-block mr-2" /> Read Story
            </button>
          </div>
        </div>
  )
}




