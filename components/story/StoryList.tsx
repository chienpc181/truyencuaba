'use client'

import { StoryCard_EN, StoryCard_VI } from "./StoryCard"
import { useState } from 'react';
import { StoryModal_EN, StoryModal_VI } from "./StoryModal";

interface Story {
  _id: string
  title: { en: string, vi: string }
  introduction: {
    en: string;
    vi: string;
  }[];
  thumbnailUrl: string,
  author: string
}

interface FairyTalesListProps {
  initialStories: Story[]
}

function StoryList_EN({ initialStories }: FairyTalesListProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const onSelectStoryCard = (story: Story) => {
    setSelectedStory(story);
  };

  const closeModal = () => {
    setSelectedStory(null);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {initialStories.map((story: any) => (
          <StoryCard_EN key={story._id} story={story} onClick={() => onSelectStoryCard(story)} />
        ))}
      </div>
      {selectedStory && (
        <StoryModal_EN story={selectedStory} onClose={closeModal}></StoryModal_EN>
      )}
    </div>
  )
}

function StoryList_VI({ initialStories }: FairyTalesListProps) {
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  
    const onSelectStoryCard = (story: Story) => {
      setSelectedStory(story);
    };
  
    const closeModal = () => {
      setSelectedStory(null);
    };
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {initialStories.map((story: any) => (
            <StoryCard_VI key={story._id} story={story} onClick={() => onSelectStoryCard(story)} />
          ))}
        </div>
        {selectedStory && (
          <StoryModal_VI story={selectedStory} onClose={closeModal}/>
        )}
      </div>
    )
  }

export {StoryList_EN, StoryList_VI}
