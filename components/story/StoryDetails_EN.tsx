'use client';
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import OverlayPanel from '@/components/OverlayPanel';
import { MdTranslate } from "react-icons/md";
import ReadingToolbar from '../ReadingToolbar';

export default function StoryDetails_EN({ story }: { story: any }) {
  const [overlayPosition, setOverlayPosition] = useState<{ top: number; left: number } | null>(null);
  const [overlayContent, setOverlayContent] = useState<string | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setButtonRef = useCallback((index: number) => (el: HTMLButtonElement | null) => {
    buttonRefs.current[index] = el;
  }, []);

  const showOverlayPanel = (index: number) => {
    const buttonElement = buttonRefs.current[index];
    if (buttonElement) {
      const paragraph = buttonElement.parentElement;
      if (paragraph) {
        const rect = paragraph.getBoundingClientRect();
        setOverlayPosition({
          top: rect.bottom + window.scrollY + 8, // 1rem spacing
          left: rect.left + window.scrollX,
        });
        setOverlayContent(story.paragraphs[index].vi); // Set the content based on the clicked button
      }
      
    }
  };

  const hideOverlayPanel = () => {
    setOverlayPosition(null);
    setOverlayContent(null);
  };

  return (
    <div className='story-container'>
      <div className="story-details">
        <div className="breadcrumbs text-sm p-4">
          <ul>
            <li><a href='/en/fairy-tales'>Fairy Tales</a></li>
            <li>{story.title.en}</li>
          </ul>
        </div>
        <div className='reading-toolbar'>
          <ReadingToolbar></ReadingToolbar>
        </div>
        
        <article className='story-article'>
          <section>
            <h1 className='text-center font-serif'>{story.title.en}</h1>
            <address className='text-right font-mono'>{story.author}</address>
            <div className='thumbnail'>
              <Image
                src={story.thumbnailUrl}
                alt={story.title.en}
                width={600}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </section>
          <section className='mt-8'>
            {story.paragraphs.map((para: any, index: number) => (
              <div key={index}>
                <p>
                  {para.en}
                  <button
                      ref={setButtonRef(index)}
                      className="btn btn-translate"
                      onClick={() => showOverlayPanel(index)}
                    >
                      <MdTranslate />
                    </button>
                </p>
              </div>
            ))}
          </section>
        </article>
      </div>
      {overlayPosition && overlayContent && (
        <OverlayPanel position={overlayPosition} onClose={hideOverlayPanel}>
          <p>{overlayContent}</p>
        </OverlayPanel>
      )}
    </div>
  );
}