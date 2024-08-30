'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import StoryCard_EN from '@/components/StoryCard_EN';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

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
          <StoryCard_EN story={story} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
