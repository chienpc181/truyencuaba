'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { StoryCard_EN, StoryCard_VI } from './story/StoryCard';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useLanguageContext } from '@/app/context/LanguageProvider';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';

interface CarouselProps {
  stories: Story[];
}

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

export default function Carousel({ stories }: CarouselProps) {
  const {language} = useLanguageContext();
  const [isLoading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const onSelectStoryCard = (story: Story) => {
    setSelectedStory(story);
  };

  useEffect(() => {
    setLoading(false);
  }, [language]);

  if (isLoading) {
    return (
      <Loading></Loading>
    )
  }
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1} // Show 1 card on mobile
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2, // Show 2 cards on tablet
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3, // Show 3 cards on large screen
          spaceBetween: 40,
        },
      }}
      navigation
      pagination={true}
    >
      {stories.map((story) => (
        <SwiperSlide key={story._id}>
          {language === 'en' && <StoryCard_EN story={story} onClick={() => onSelectStoryCard(story)}/>}
          {language === 'vi' && <StoryCard_VI story={story} onClick={() => onSelectStoryCard(story)}/>}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
