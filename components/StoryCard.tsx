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
    description: {
      en: string;
      vi: string;
    }[];
    thumbnailUrl: string,
    author: string
  };
  language: string;
}

export default function StoryCard({ story, language }: StoryCardProps) {
  const [showDescription, setShowDescription] = useState(false);

  const description =
    language === 'en'
      ? story.description[0]?.en || ''
      : story.description[0]?.vi || '';

  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="border p-4 rounded shadow-md story-card">
      <div className='thumbnail'>
        {showDescription ? (
          
          <p className='description'>{description}</p>
        ) : (
          <Image
            src={story.thumbnailUrl}
            alt={story.title.vi}
            width={600}
            height={600}
          />
        )}
      </div>

      <div className='pt-4'>
        <div>
          <h2 className="text-lg font-bold">
            {language === 'en' ? story.title.en : story.title.vi}
          </h2>
          {/* <address style={{textAlign: 'right'}}>{story.author}</address> */}
        </div>
        
        <div className='flex'>
          
          
          <Link href={`/fairy-tales/${language}/${story._id}`} className="text-blue-500 hover:underline">
            {language === 'en' ? 'Read more' : 'Đọc truyện'}
          </Link>
          <span className='mx-2'>|</span>
          <span className='text-blue-500 cursor-pointer' onClick={handleShowDescription}>
            {showDescription ? (language === 'en' ? 'Hide' : 'Ẩn') : (language === 'en' ? 'Preview' : 'Giới thiệu')}
          </span>
        </div>
      </div>
    </div>
  );
}
