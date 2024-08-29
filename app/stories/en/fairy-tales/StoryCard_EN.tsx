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
    description: {
      en: string;
      vi: string;
    }[];
    thumbnailUrl: string,
    author: string
  };
}

export default function StoryCard_EN({ story }: StoryCardProps) {
  const [showDescription, setShowDescription] = useState(false);

  const description = story.description[0]?.en || ''
  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="border p-4 rounded shadow-md story-card">
      <div className='thumbnail'>
        {!showDescription && <Image
            src={story.thumbnailUrl}
            alt={story.title.en}
            width={600}
            height={600}
          />}
          {showDescription && <p className='description'>{description}</p>}
      </div>
      <div className=''>
        <div>
          <h2 className="text-center">{story.title.en}</h2>
          
        </div>
        <div className='flex'>
          <Link href={`/stories/en/fairy-tales/${story._id}`} className="text-blue-500 hover:underline">Read story</Link>
          <span className='mx-2'>|</span>
          <span className='text-blue-500 cursor-pointer' onClick={handleShowDescription}>
            {showDescription ? 'Hide' : 'Preview'}
          </span>
        </div>
      </div>
    </div>
  );
}
