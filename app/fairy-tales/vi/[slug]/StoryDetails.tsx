'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useLanguageContext } from '@/app/context/LanguageProvider';

export default function StoryDetails({ story }: { story: any }) {
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const language = useLanguageContext();

  const handleMouseEnter = (index: number) => {
    setPopupIndex(index);
  };

  const handleMouseLeave = () => {
    setPopupIndex(null);
  };

  useEffect(() => {
    if (language && language === 'en') {
      redirect(`/fairy-tales/en/${story._id}`);
    }
  }, [language, story._id]);

  return (
    <div className='story-container'>
      <div className="story-details">
        <div className="breadcrumbs text-sm p-2">
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/fairy-tales'>Fairy Tales</a></li>
            <li>{story.title.vi}</li>
          </ul>
        </div>
        <div className='reading-toolbar'>
          <button>switch</button>
        </div>
        <div>
          <Image
            src={story.thumbnailUrl}
            alt={story.title.vi}
            width={600}
            height={600}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <article className='p-4'>
          <section>
            <h1 className='text-center font-serif'>{story.title.vi}</h1>
            <address className='text-right font-mono'>{story.author}</address>
          </section>

          <section className=''>
            {story.paragraphs.map((para: any, index: number) => (
              <div key={index} className="relative">
                <p>
                  {para.vi}
                  <sup>
                    <a
                      href="#"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className="relative group text-blue-600 pl-1"
                    >
                      [vie]
                      {popupIndex === index && (
                        <span
                          className="absolute left-0 z-10 hidden group-hover:block w-auto min-w-96 p-2 mt-2 text-sm text-white rounded shadow-lg"
                          style={{ background: '#2b3440' }}
                        >
                          {para.en}
                        </span>
                      )}
                    </a>
                  </sup>
                </p>
              </div>
            ))}
          </section>
        </article>
      </div>
    </div>
  );
}
