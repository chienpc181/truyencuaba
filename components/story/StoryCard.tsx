
import Image from 'next/image';

interface StoryCardProps {
  story: {
    _id: string;
    title: {
      en: string;
      vi: string;
    };
    thumbnailUrl: string,
    
  },
  onClick: () => void;
}

function StoryCard_EN({ story, onClick}: StoryCardProps) {
  return (
      <div className="border rounded shadow-md story-card" onClick={onClick}>
          <div >
              <Image
                  src={story.thumbnailUrl}
                  alt={story.title.en}
                  width={600}
                  height={600}
              />
          </div>
          <div>
              <h3 className="text-center text-lg font-semibold">{story.title.en}</h3>
          </div>
      </div>
  );
}

function StoryCard_VI({ story, onClick}: StoryCardProps) {
    return (
        <div className="border rounded shadow-md story-card" onClick={onClick}>
            <div >
                <Image
                    src={story.thumbnailUrl}
                    alt={story.title.vi}
                    width={600}
                    height={600}
                />
            </div>
            <div>
                <h3 className="text-center text-lg font-semibold">{story.title.vi}</h3>
            </div>
        </div>
    );
  }

export {StoryCard_EN, StoryCard_VI}