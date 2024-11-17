import React from 'react';

interface YoutubeEmbeddedProps {
  videoUrl: string; // YouTube video URL
  altText?: string; // Alternative text for the illustration image
}

const YoutubeEmbedded: React.FC<YoutubeEmbeddedProps> = ({ videoUrl, altText = 'Illustration image' }) => {
  // Extract YouTube video ID from the provided URL
  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <div className="video-container">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbedded;

// Example usage:
// <YoutubeEmbedded videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" illustrationImage="path/to/image.jpg" />
