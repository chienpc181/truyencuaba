'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface StoryCardProps {
  story: {
    _id: string;
    title: {
      en: string;
      vi: string;
    };
    introduction: {
      en: string;
      vi: string;
    }[];
    thumbnailUrl: string,
    author: string
  };
}

export default function StoryCard_VI({ story }: StoryCardProps) {
  const [showDescription, setShowDescription] = useState(false);

  const introduction = story.introduction[0]?.vi || ''
  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="border p-4 rounded shadow-md story-card">
      <div className='thumbnail'>
        {!showDescription && <Image
            src={story.thumbnailUrl}
            alt={story.title.vi}
            width={600}
            height={600}
          />}
          {showDescription && <p className='introduction'>{introduction}</p>}
      </div>
      <div className=''>
        <div>
        <h3 className="text-center text-lg font-bold">{story.title.vi}</h3>
        </div>
        <div className='flex'>
          <Link href={`/vi/truyen-co-tich/${story._id}`} className="text-blue-500 hover:underline">Đọc truyện</Link>
          <span className='mx-2'>|</span>
          <span className='text-blue-500 cursor-pointer' onClick={handleShowDescription}>
            {showDescription ? 'Ẩn' : 'Giới thiệu'}
          </span>
        </div>
      </div>
    </div>
  );
}
