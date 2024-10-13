'use client'

import React, { useState, useEffect } from "react";
import { FaBook, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getStories, getStoriesByAuthor } from "@/lib/api"

const FairyStoryHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stories, setStories] = useState<{
    id: string,
    title: string, 
    imageUrl: string,
    introduction: string
  }[]>([]);
  const [heroStory, setHeroStory] = useState<{
    id: string,
    title: string, 
    imageUrl: string,
    introduction: string
  }>()

  const fetchStories = async () => {
    const response = await getStoriesByAuthor("Aesop");
    const stories = response.stories.map((story: {
        id: string, 
        title: {en: string, vi: string}, 
        thumbnailUrl: string,
        introduction: {en: string, vi: string}[]
      }) => {
        return {
            id: story.id,
            title: story.title.en,
            imageUrl: story.thumbnailUrl,
            introduction: story.introduction[0].en
        }
    });
    setStories(stories)
    setHeroStory(stories[0]);
  }

  useEffect(() => {
    setIsVisible(true);
    fetchStories();
  }, []);

  return (
    <div className="bg-gradient-to-b from-purple-100 to-blue-200 min-h-screen p-4 ">
      <div className="max-w-6xl mx-auto">
        
        {heroStory && <FairyStoryHero imageUrl={heroStory.imageUrl} title={heroStory.title} introduction={heroStory.introduction}></FairyStoryHero>}
        <div
          className={`transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-purple-800 mb-8">Other Stories</h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <FairyStoryItem imageUrl={story.imageUrl} title={story.title} introduction={story.introduction}></FairyStoryItem>
              </div>
            ))}
          </div> */}
          {/* {stories && stories.length> 0 &&<CarouselFairyStory stories={stories}></CarouselFairyStory>} */}



          <div className="flex w-full overflow-x-auto overflow-y-hidden gap-3 p-4 snap-x scroll-pl-6">
          {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white flex-none snap-start rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <FairyStoryItem imageUrl={story.imageUrl} title={story.title} introduction={story.introduction}></FairyStoryItem>
                </div>
              ))}
          </div>
          
        </div>
      </div>
    </div>
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

const FairyStoryItem = ({imageUrl, title, introduction}: {imageUrl: string, title: string, introduction: string}) => {
  return (
    <>
      <img
        src={imageUrl}
        alt={title}
        className="object-cover"
        style={{aspectRatio: '210/297', height: '300px'}}
      />
      {/* <div className="p-6">
        <h3 className="text-xl font-bold text-purple-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{introduction}</p>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
        </div>
      </div> */}
    </>
  )
}

const CarouselFairyStoryItem = ({ title, isActive, imageUrl }: {title: string, isActive: boolean, imageUrl: string}) => (
  <div className={`flex flex-col md:flex-row items-center py-4 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 absolute top-0 left-0"}`}>
    <img src={imageUrl} alt={title} className="object-cover " style={{aspectRatio: '3/4', height: '400px'}}/>
    {/* <div className="text-center md:text-left">
      <h3 className="text-xl font-semibold">{title}</h3>
    </div> */}
  </div>
);

const CarouselFairyStory = ({stories}:{stories: {id: string, title: string, imageUrl: string}[]}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + stories.length) % stories.length
    );
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden flex gap-6">
        {stories.map((story, index) => (
          <CarouselFairyStoryItem
            key={story.id}
            title={story.title}
            imageUrl={story.imageUrl}
            isActive={index <= currentSlide + 4 && index > currentSlide - 1}
          />
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full 
          p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-2xl text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full 
          p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-2xl text-gray-800" />
        </button>
        </div>
        
        
      </div>
    </div>
  );
};

export {FairyStoryHeroSection};