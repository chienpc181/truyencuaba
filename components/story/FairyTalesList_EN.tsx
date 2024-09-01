import StoryCard_EN from "./StoryCard_EN"

interface Story {
  _id: string
  title: { en: string, vi: string }
  description: {
    en: string;
    vi: string;
  }[];
  thumbnailUrl: string,
  author: string
}

interface FairyTalesListProps {
  initialStories: Story[]
}

export default function FairyTalesList_EN({ initialStories }: FairyTalesListProps) {

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {initialStories.map((story: any) => (
          <StoryCard_EN key={story._id} story={story}/>
        ))}
      </div>
    </div>
  )
}
