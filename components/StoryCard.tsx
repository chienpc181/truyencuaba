import Link from 'next/link';

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
  };
  language: string;
}

export default function StoryCard({ story, language }: StoryCardProps) {
  const description =
    language === 'en'
      ? story.description[0]?.en || ''
      : story.description[0]?.vi || '';

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold">
        {language === 'en' ? story.title.en : story.title.vi}
      </h2>
      <p>{description}</p>
      <p className="text-blue-300">{story._id}</p>
      <Link href={`/fairy-tales/${language}/${story._id}`} className="text-blue-500 hover:underline">
        {language === 'en' ? 'Read more' : 'Đọc truyện'}
      </Link>
    </div>
  );
}
