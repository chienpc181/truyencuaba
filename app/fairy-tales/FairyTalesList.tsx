'use client'

import { useState, useEffect } from 'react'
import StoryCard from '@/components/StoryCard'
import { getStories } from '@/lib/api'

interface Story {
  _id: string
  title: {en: string, vi: string}
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

let currentPage = 1;
const limit = 2;
const sort = 'desc';

export default function FairyTalesList({ initialStories }: FairyTalesListProps) {
  const [stories, setStories] = useState<Story[]>(initialStories)
  const [filters, setFilters] = useState({
    sortBy: 'popular',
    ageGroup: 'all',
    genre: 'all',
  })

  //   useEffect(() => {
  //     if (filters.sortBy !== 'popular' || filters.ageGroup !== 'all' || filters.genre !== 'all') {
  //       api.getStoriesByCategory('fairy-tale', filters)
  //         .then(data => setStories(data))
  //         .catch(error => console.error('Failed to fetch stories:', error))
  //     }
  //   }, [filters])


  const [language, setLanguage] = useState('vi');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleFilterChange = (filterType: string, value: string) => {
    // setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }))

    getStories()
      .then(data => setStories([data.stories[0], data.stories[1]]))
      .catch(error => console.error('Failed to fetch stories:', error))
  }

  const handleLoadmore = async () => {
    currentPage++;
    const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'https://truyencuaba.vercel.app';
    const response = await fetch(`${baseUrl}/api/stories?page=${currentPage}&limit=${limit}&sort=${sort}`, {
      // cache: 'force-cache', 
      cache: 'no-store', 
    });
    const data = await response.json();
    const newPage = data.stories;
    setStories(prevStories => [...prevStories, ...newPage]);
  }

  return (
    <div>
      <h1 className="font-bold font-serif mt-0">Fairy Tales</h1>

      <div className="flex space-x-2 my-4">
        <select
          value={filters.ageGroup}
          onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
          className="border p-2"
        >
          <option value="all">All Ages</option>
          <option value="kids">Kids</option>
          <option value="teens">Teens</option>
          <option value="adults">Adults</option>
        </select>

        <select
          value={filters.genre}
          onChange={(e) => handleFilterChange('genre', e.target.value)}
          className="border p-2"
        >
          <option value="all">All Genres</option>
          <option value="fantasy">Fantasy</option>
          <option value="adventure">Adventure</option>
          <option value="mystery">Mystery</option>
        </select>
      </div>
      <label className="input input-bordered flex items-center gap-2 mb-4" style={{height: '2.5rem'}}>
        <input type="text" className="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd" />
        </svg>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {stories.map((story: any) => (
          <StoryCard key={story._id} story={story} language={language} />
        ))}
      </div>
      <div className='flex justify-center my-4'>
        <button className='btn btn-outline' onClick={handleLoadmore}>Load more</button>
      </div>
      
    </div>
  )
}
