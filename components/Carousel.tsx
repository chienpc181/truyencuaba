'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import StoryCard_EN from '@/components/story/StoryCard_EN';
import StoryCard_VI from './story/StoryCard_VI';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useLanguageContext } from '@/app/context/LanguageProvider';
import React, { useEffect, useState } from 'react';

interface CarouselProps {
  stories: {
    _id: string;
    title: {
      en: string;
      vi: string;
    };
    description: {
      en: string;
      vi: string;
    }[];
    thumbnailUrl: string;
    author: string;
  }[];
}

export default function Carousel({ stories }: CarouselProps) {
  const [language, setLanguage] = useState('vi'); // Default to 'vi'
    const savedLang = useLanguageContext();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (savedLang) {
            setLanguage(savedLang);
        }
        setLoading(false);
    }, [savedLang]);

  if (isLoading) {
    return (
      <span className="loading loading-ring loading-xs"></span>
    )
  }
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={1} // Show 1 card on mobile
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2, // Show 2 cards on tablet
        },
        1024: {
          slidesPerView: 3, // Show 3 cards on large screen
        },
      }}
      navigation
      pagination={{ clickable: true }}
    >
      {stories.map((story) => (
        <SwiperSlide key={story._id}>
          {language === 'en' && <StoryCard_EN story={story} />}
          {language === 'vi' && <StoryCard_VI story={story} />}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
