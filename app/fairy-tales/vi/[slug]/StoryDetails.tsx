'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import OverlayPanel from '@/components/OverlayPanel';
import { redirect } from 'next/navigation';
import { useLanguageContext } from '@/app/context/LanguageProvider';

export default function StoryDetails({ story }: { story: any }) {
  const [overlayPosition, setOverlayPosition] = useState<{ top: number; left: number } | null>(null);
  const [overlayContent, setOverlayContent] = useState<string | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const language = useLanguageContext();

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
        setOverlayContent(story.paragraphs[index].en); // Set the content based on the clicked button
      }
      
    }
  };

  const hideOverlayPanel = () => {
    setOverlayPosition(null);
    setOverlayContent(null);
  };

  useEffect(() => {
    if (language && language === 'en') {
      redirect(`/fairy-tales/en/${story._id}`);
    }
  }, [story._id, language]);

  return (
    <div className='story-container'>
      <div className="story-details">
        <div className="breadcrumbs text-sm p-4">
          <ul>
            {/* <li><a href='/'>Trang chủ</a></li> */}
            <li><a href='/fairy-tales'>Truyện Cổ Tích</a></li>
            <li>{story.title.vi}</li>
          </ul>
        </div>
        <div className='reading-toolbar'>
          <button>switch</button>
        </div>
        
        <article className='story-article'>
          <section>
            <h1 className='text-center font-serif'>{story.title.vi}</h1>
            <address className='text-right font-mono'>{story.author}</address>
            <div className='thumbnail'>
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
          </section>
          <section className='mt-8'>
            {story.paragraphs.map((para: any, index: number) => (
              <div key={index}>
                <p>
                  {para.vi}
                  <button
                      ref={setButtonRef(index)}
                      className="btn btn-translate"
                      onClick={() => showOverlayPanel(index)}
                    >
                      {/* <img src="/translation-icon.svg" alt="translate" /> */}
                      <Image
                          src="/translation-icon.svg"
                          alt="Translation Icon"
                          width={16}  // Adjust the width as needed
                          height={16} // Adjust the height as needed
                      />
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