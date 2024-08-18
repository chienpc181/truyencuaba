'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation'

export default function StoryDetails({ story }: { story: any }) {
  const [popupIndex, setPopupIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setPopupIndex(index);
  };

  const handleMouseLeave = () => {
    setPopupIndex(null);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage === 'vi') {
      redirect(`/fairy-tales/vi/${story._id}`);
    }
  }, []);

  return (
    <div className='story-container'>
      <div className="story-details">
        <div className='reading-toolbar'>
          <button>switch</button>
        </div>
        <div style={{ marginLeft: '-1rem', marginRight: '-1rem' }}>
          <Image
            src={story.thumbnailUrl}
            alt={story.title.en}
            layout="responsive"
            width={600}
            height={600}
          />
        </div>
        
        <h1 className='text-center'>{story.title.en}</h1>
        <address className='text-right'>{story.author}</address>
        {story.paragraphs.map((para: any, index: number) => (
          <div key={index} className="relative">
            <p>
              {para.en}
              <sup>
                {/* <a
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
                      {para.vi}
                    </span>
                  )}
                </a> */}
                <div className="tooltip tooltip-info tooltip-bottom" data-tip={para.vi}>
                  <span className='text-blue-600 pl-1'>[vie]</span>
                </div>
              </sup>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}